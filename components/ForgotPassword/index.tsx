import Image from "next/image"
import {
  Button,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  AlertProps,
} from "@mui/material"
import { useAuth } from "reactfire"
import { sendPasswordResetEmail } from "firebase/auth"
import { Form, Formik, FormikProps } from "formik"
import { useState } from "react"

interface FormValues {
  email: string
  remember: boolean
}

export function ForgotPassword() {
  const [toast, setToast] = useState({
    severity: "success",
    message: "",
    open: false,
  })
  const auth = useAuth()

  async function handleSubmit(values: FormValues) {
    const { email } = values
    try {
      await sendPasswordResetEmail(auth, email)
      setToast({
        severity: "success",
        message: "Password reset email sent",
        open: true,
      })
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
        width="150"
        height="70"
        src="/lancr-text.svg"
        alt="Lancr logo text"
      />
      <Typography fontWeight="600" variant="h4">
        Reset Password
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please enter your email address
      </Typography>
      <Formik
        initialValues={{
          email: "",
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
              <Button
                variant="contained"
                type="submit"
                sx={{
                  textTransform: "none",
                  height: "2.8rem",
                }}
              >
                Send link
              </Button>
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
