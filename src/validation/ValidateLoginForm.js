/** @format */

import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir email giriniz")
    .required("Email girmek zorunludur"),
  password: yup
    .string()
    .min(8, ({ min }) => `Şifre en az ${min} karakter  olmalıdır`)
    .required("Şifre girmek zorunludur"),
});
