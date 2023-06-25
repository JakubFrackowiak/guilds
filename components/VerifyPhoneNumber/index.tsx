import Image from "next/image"
import {
  Alert,
  AlertProps,
  Button,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"
import { useRef, useState } from "react"
import { CodeTextField } from "./CodeTextField"
import { useRouter } from "next/router"

export interface Code {
  [key: number]: string
}

export function VerifyPhoneNumber() {
  const [toast, setToast] = useState({
    open: false,
    message: "Phone number verified correctly.",
    severity: "success",
  })
  const [code, setCode] = useState<Code>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  })
  const router = useRouter()
  const { phone: phoneNumber } = router.query
  const inputRefs = useRef(Array(6).fill(null))

  const handleVerifyPhoneNumber = async (code: string) => {
    if (window.confirmationResult) {
      try {
        await window.confirmationResult.confirm(code)
        setToast({
          open: true,
          message: "Phone number verified successfully",
          severity: "success",
        })
      } catch (error) {
        setToast({
          open: true,
          message: "Invalid code",
          severity: "error",
        })
      }
    } else {
      setToast({
        open: true,
        message: "Code expired",
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
    <Stack alignItems="center" spacing={4}>
      <Image
        src="/alert-circle.svg"
        width={70}
        height={70}
        alt="Alert circle"
      />
      <Typography variant="h3">Check your phone</Typography>
      <Stack alignItems="center">
        <Typography variant="h6" color="text.secondary">
          We sent a verification code to
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight="600">
          {phoneNumber}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} width="40%">
        <CodeTextField
          code={code}
          setCode={setCode}
          index={0}
          inputRefs={inputRefs}
        />
        <CodeTextField
          code={code}
          setCode={setCode}
          index={1}
          inputRefs={inputRefs}
        />
        <CodeTextField
          code={code}
          setCode={setCode}
          index={2}
          inputRefs={inputRefs}
        />
        <CodeTextField
          code={code}
          setCode={setCode}
          index={3}
          inputRefs={inputRefs}
        />
        <CodeTextField
          code={code}
          setCode={setCode}
          index={4}
          inputRefs={inputRefs}
        />
        <CodeTextField
          code={code}
          setCode={setCode}
          index={5}
          inputRefs={inputRefs}
        />
      </Stack>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ width: "40%" }}
        onClick={() => handleVerifyPhoneNumber(Object.values(code).join(""))}
      >
        Verify phone
      </Button>
      <Stack direction="row" alignItems="center">
        <Typography variant="body1" color="text.secondary">
          Didn't receive the code?
        </Typography>
        <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
          Click to resend
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Image src="/circle.svg" width={20} height={20} alt="Circle" />
        <Link href="/login" underline="none" color="text.primary">
          Back to login
        </Link>
      </Stack>
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
    </Stack>
  )
}
