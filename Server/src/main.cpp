#include "DHT.h"
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Arduino_JSON.h>

#define DHTTYPE DHT11
#define DHTPIN 0
#define relay D2

#define WIFI_SSID "oyku"
#define WIFI_PASSWORD "oykuuuo2468"

#define API_KEY "AIzaSyDeK-o273ajGocTUnu7WZ_Y6JkAAzwE-zc"
#define FIREBASE_HOST "https://fir-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app"

DHT dht(DHTPIN, DHTTYPE);

FirebaseData db;
FirebaseJson json;

float sensorTemp;
float sensorHum;
int targetTemp;
float apiTemp;
boolean active;
boolean automatic;
boolean manual;

void setup()
{
  Serial.begin(9600);
  pinMode(relay, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  Serial.println("Bağlantı başarılı");
  dht.begin();
  Firebase.begin(FIREBASE_HOST, API_KEY);
  Firebase.reconnectWiFi(true);
}
void sensorData()
{
  sensorTemp = dht.readTemperature();
  sensorHum = dht.readHumidity();

  if (isnan(sensorTemp) || isnan(sensorHum))
  {
    return;
  }
  Firebase.setInt(db, "/tem", sensorTemp);
  Firebase.setInt(db, "/hum", sensorHum);
  
}
String httpGETRequest(const char *serverName)
{

  WiFiClient client;
  HTTPClient http;
  String payload;

  http.begin(client, serverName);
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0)
  {

    payload = http.getString();
  }
  else
  {
    Serial.println("Error code : ");
    Serial.print(httpResponseCode);
    payload = "Değer alınamadı";
  }
  http.end();
  return payload;
}

void fetchApi()
{

  String apiUrl = "http://api.weatherapi.com/v1/current.json?key=bce3ace085154bffb4c185834222212&q=41.6298097,32.3206074&aqi=yes&lang=tr&aqi=no";
  String jsonBuffer = httpGETRequest(apiUrl.c_str());
  JSONVar object = JSON.parse(jsonBuffer);

  if (JSON.typeof_(object) == "undefined")
  {
    Serial.println("JSON PARSE ERROR");
    return;
  }

  String x = JSON.stringify(object["current"]["temp_c"]);
  apiTemp = x.toFloat();

}

void loop()
{

  fetchApi();
  sensorData();

  if (Firebase.getInt(db, "/targetTemp"))
  {

    targetTemp = db.intData();
  }
  if (Firebase.getBool(db, "/active"))
  {

    active = db.boolData();
  }
  if (Firebase.getBool(db, "/manual"))
  {

    manual = db.boolData();
  }
  if (Firebase.getBool(db, "/automatic"))
  {

    automatic = db.boolData();
  }

  if (active)
  {

    if (manual)
    {

      if (sensorTemp >= targetTemp)
      {

        Serial.println("Manual Mod aktif değil");
        digitalWrite(relay, LOW);
      }
      else
      {
        Serial.println("Manual Mod aktif ");

        digitalWrite(relay, HIGH);
      }
    }
    else
    {
      if (apiTemp < 20 && sensorTemp <= 25)
      {
        Serial.println("otomotik mod aktif");
        digitalWrite(relay, HIGH);
      }
      else
      {
        digitalWrite(relay, LOW);
        Serial.println("otomotik mod aktif değil ");
      }
    }
  }
  else
  {
    Serial.println("Kombi kapalı");
    digitalWrite(relay, LOW);
  }
  delay(1000);
}

/*
Test Case 1 :
  manual :
    1:
      sensorTemp : 30 , targetTemp : 45
      beklenen: "Manual mod aktif"

    2: sensorTemp : 56 : targetTemp : 45
      beklenen "Manual mod deaktif"



*/