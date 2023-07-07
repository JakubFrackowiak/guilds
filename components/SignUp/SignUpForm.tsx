import Image from "next/image"
import * as Yup from "yup"
import {
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
  signOut,
} from "firebase/auth"
import { Form, Formik, FormikProps } from "formik"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { validationSchema } from "./ValidationSchemas"
import { PrimaryButton } from "components/PrimaryButton"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useFirestore } from "reactfire"

interface FormValues {
  email: string
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

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState({
    message: "",
    open: false,
    severity: "success",
  })
  const auth = getAuth()
  const firestore = useFirestore()
  const SignupSchema = Yup.object().shape(validationSchema)

  const addHero = async (
    firstName: string,
    lastName: string,
    email: string,
    uid: string
  ) => {
    const heroRef = doc(firestore, "heroes", uid)
    const heroSnap = await getDoc(heroRef)
    if (!heroSnap.exists()) {
      await setDoc(heroRef, {
        id: uid,
        name: {
          first: firstName,
          last: lastName,
        },
        email: email,
        level: 0,
        rating: 0,
        profilePicture: "placeholder-avatar.svg",
        isVerified: false,
      })
    }
  }

  const signUpWithEmail = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const [firstName, lastName] = name.split(" ")
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(userCredential.user)
      await addHero(firstName, lastName, email, userCredential.user.uid)
      window.localStorage.setItem("emailForSignIn", email)
      signOut(auth)
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

  const handleSubmit = async (values: FormValues) => {
    try {
      const { name, email, password } = values
      await signUpWithEmail(name, email, password)
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
      <Image width={70} height={70} src="lancr-logo.svg" alt="Lancer logo" />
      <Typography fontWeight="600" variant="h4">
        Create an account
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Start your 30-day s trial.
      </Typography>
      <Formik
        initialValues={{
          email: "",
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
    </Stack>
  )
}
