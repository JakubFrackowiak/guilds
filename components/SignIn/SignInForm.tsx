import Image from "next/image"
import Link from "next/link"
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  AlertProps,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { useAuth, useFirestore } from "reactfire"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { Form, Formik, FormikProps } from "formik"
import { useState } from "react"
import { PrimaryButton } from "components/PrimaryButton"
import { useRouter } from "next/router"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Visibility, VisibilityOff } from "@mui/icons-material"

interface FormValues {
  email: string
  password: string
  remember: boolean
}

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState({
    severity: "success",
    message: "",
    open: false,
  })
  const auth = useAuth()
  const firebase = useFirestore()
  const router = useRouter()

  async function handleSubmit(values: FormValues) {
    const { email, password } = values
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      if (result.user.emailVerified) {
        const heroRef = doc(firebase, "heroes", result.user.uid)
        const heroSnap = await getDoc(heroRef)
        if (heroSnap.exists() && !heroSnap.data().isVerified) {
          updateDoc(heroRef, {
            isVerified: true,
          })
        }
        setToast({
          severity: "success",
          message: "Logged in successfully",
          open: true,
        })
        router.push("/find-quest")
      } else {
        signOut(auth)
        setToast({
          severity: "warning",
          message: "Verify email to log in",
          open: true,
        })
      }
    } catch (error) {
      setToast({
        severity: "error",
        message: error.message,
        open: true,
      })
    }
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="space-around"
      spacing={4}
      width="100%"
    >
      <Image
        width="70"
        height="70"
        src="/lancr-logo-transparent.svg"
        alt="Lancr logo"
      />
      <Typography fontWeight="600" variant="h4">
        Log in to your account
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome back! Please enter your details
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
          remember: false,
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, handleChange, values }: FormikProps<FormValues>) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={2} width="25rem">
              <Stack>
                <Typography variant="body1">Email</Typography>
                <TextField
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </Stack>
              <Stack>
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
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  name="remember"
                  onChange={handleChange}
                  value={values.remember}
                  control={<Checkbox />}
                  label="Remember for 30 days"
                />
                <Link
                  href="/forgot-password"
                  style={{ textDecoration: "none" }}
                >
                  <Typography color="primary.main">Forgot password</Typography>
                </Link>
              </Stack>
              <PrimaryButton label="Sign in" type="submit" />
            </Stack>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={toast.severity as AlertProps["severity"]}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
