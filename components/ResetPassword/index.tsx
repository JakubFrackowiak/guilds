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
import { confirmPasswordReset } from "firebase/auth"
import { Form, Formik, FormikProps } from "formik"
import { useEffect, useState } from "react"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { useRouter } from "next/router"
import { validationSchema } from "components/SignUp/ValidationSchemas"
import * as Yup from "yup"

interface FormValues {
  password: string
  confirmPassword: string
}

export function ResetPassword() {
  const [toast, setToast] = useState({
    severity: "success",
    message: "",
    open: false,
  })

  const router = useRouter()
  const { query: code } = router
  const oobCode = code?.oobCode
  const auth = useAuth()

  const resetPasswordSchema = Yup.object().shape({
    password: validationSchema.password,
    confirmPassword: validationSchema.confirmPassword,
  })

  async function handleSubmit(values: FormValues) {
    const { password } = values
    try {
      await confirmPasswordReset(auth, oobCode as string, password)
      setToast({
        severity: "success",
        message: "Password reset successfully",
        open: true,
      })
      router.push("/login")
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
      <Image width="50" height="50" src="/GuildsLogo2.svg" alt="Guilds logo" />
      <Typography fontWeight="600" variant="h4">
        Reset Password
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please enter new password
      </Typography>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={resetPasswordSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }: FormikProps<FormValues>) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={4} width="25rem">
              <Stack spacing={4}>
                <Stack position="relative">
                  <Typography variant="body1">New Password</Typography>
                  <TextField
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    name="password"
                    placeholder="••••••••"
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
                  <Typography variant="body1">Confirm new Password</Typography>
                  <TextField
                    onChange={handleChange}
                    value={values.confirmPassword}
                    type="password"
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
              </Stack>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  textTransform: "none",
                  height: "2.8rem",
                }}
              >
                Reset password
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
