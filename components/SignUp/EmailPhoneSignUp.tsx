import Image from "next/image"
import * as Yup from "yup"
import MuiPhoneNumber from "material-ui-phone-number-2"
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  AlertProps,
} from "@mui/material"
import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  getAuth,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithPhoneNumber,
} from "firebase/auth"
import { Form, Formik, FormikProps } from "formik"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { validationSchema } from "./ValidationSchemas"
import { useRouter } from "next/router"
import { PrimaryButton } from "components/PrimaryButton"

interface FormValues {
  email: string
  phone: string
  password: string
  confirmPassword: string
  remember: boolean
  name: string
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
  }
}

export function EmailPhoneSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [phoneFocused, setPhoneFocused] = useState(false)
  const [toast, setToast] = useState({
    message: "",
    open: false,
    severity: "success",
  })
  const auth = getAuth()
  const router = useRouter()
  const SignupSchema = Yup.object().shape(validationSchema)

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(userCredential.user)
      window.localStorage.setItem("emailForSignIn", email)
      setToast({
        message: "Please verify your email",
        open: true,
        severity: "success",
      })
    } catch (error) {
      setToast({
        message: error.message,
        open: true,
        severity: "error",
      })
    }
  }

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      )
      const appVerifier = window.recaptchaVerifier
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      window.confirmationResult = result
      setToast({
        message: "Please verify your phone",
        open: true,
        severity: "success",
      })
      router.push({
        pathname: "/verify-phone",
        query: { phone: phoneNumber },
      })
    } catch (error) {
      setToast({
        message: error.message,
        open: true,
        severity: "error",
      })
    }
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const { email, password, phone } = values
      if (phone.length < 4) {
        await signInWithEmail(email, password)
      } else {
        await signInWithPhone(phone)
      }
    } catch (error) {
      setToast({
        message: error.message,
        open: true,
        severity: "error",
      })
    }
  }

  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }
    setToast({ ...toast, open: false })
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="space-around"
      spacing={3}
      width="100%"
    >
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity as AlertProps["severity"]}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
      <Image width={50} height={50} src="/GuildsLogo2.svg" alt="Guilds logo" />
      <Typography fontWeight="600" variant="h4">
        Create an account
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Start your 30-day s trial.
      </Typography>
      <Formik
        initialValues={{
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          remember: false,
          name: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
        }: FormikProps<FormValues>) => (
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={4}>
              <Stack position="relative">
                <Typography variant="body1">Name</Typography>
                <TextField
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  placeholder="Enter your name"
                />
                {errors.name && touched.name ? (
                  <Typography
                    color="#ff0000"
                    position="absolute"
                    bottom="-1.5rem"
                  >
                    {errors.name}
                  </Typography>
                ) : null}
              </Stack>
              <Stack position="relative">
                <Typography variant="body1">Email</Typography>
                <TextField
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                />

                {errors.email && touched.email ? (
                  <Typography
                    color="#ff0000"
                    position="absolute"
                    bottom="-1.5rem"
                  >
                    {errors.email}
                  </Typography>
                ) : null}
              </Stack>
              <Stack position="relative">
                <Typography variant="body1">Phone*</Typography>
                <MuiPhoneNumber
                  required
                  variant="outlined"
                  onChange={(e) => setFieldValue("phone", e)}
                  value={values.phone}
                  type="phone"
                  autoFormat={true}
                  enableLongNumbers={false}
                  name="phone"
                  defaultCountry="pl"
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "100%",
                      backgroundColor: "background.default",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0.5rem 1rem",
                      height: "2.5rem",
                    },
                  }}
                />
                {values.phone.length <= 4 && phoneFocused ? (
                  <Typography
                    color="#0088d1"
                    position="absolute"
                    bottom="-1.5rem"
                  >
                    For phone verification, please enter your phone number
                  </Typography>
                ) : null}
                {values.phone.length > 4 ? (
                  <Typography
                    color="#2f7c31"
                    position="absolute"
                    bottom="-1.5rem"
                  >
                    Verification with phone enabled
                  </Typography>
                ) : null}
              </Stack>
              <Stack position="relative">
                <Typography variant="body1">Password</Typography>
                <TextField
                  onChange={handleChange}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && touched.password ? (
                  <Typography
                    color="#ff0000"
                    position="absolute"
                    bottom="-1.5rem"
                  >
                    {errors.password}
                  </Typography>
                ) : null}
              </Stack>
              <Stack position="relative">
                <Typography variant="body1">Confirm password</Typography>
                <TextField
                  onChange={handleChange}
                  value={values.confirmPassword}
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <Typography
                    color="#ff0000"
                    position="absolute"
                    bottom="-1.5rem"
                  >
                    {errors.confirmPassword}
                  </Typography>
                ) : null}
              </Stack>
              <PrimaryButton label="Get started" type="submit" />
            </Stack>
          </Form>
        )}
      </Formik>
      <div id="recaptcha-container" />
    </Stack>
  )
}
