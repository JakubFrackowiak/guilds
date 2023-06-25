import * as Yup from "yup"
import "yup-phone"

export const validationSchema = {
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("Password required!")
    .matches(/(?=.*[0-9])/, "Password must contain at lest one number!")
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at lest one lowercase letter!"
    )
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at lest one uppercase letter!"
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at lest one special character!"
    ),
  confirmPassword: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Password required!")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
  name: Yup.string().required("Name required!"),
  email: Yup.string().email("Invalid email!").required("Email required!"),
}
