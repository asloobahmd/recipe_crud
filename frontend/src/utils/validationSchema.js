import * as Yup from "yup";

export const userRegisterPayload = Yup.object({
  username: Yup.string()
    .min(6, "Username must be atleast 6 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginPayload = Yup.object({
  username: Yup.string()
    .min(6, "Username must be atleast 6 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
