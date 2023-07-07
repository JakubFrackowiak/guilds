import Image from "next/image"
import { Button, Snackbar, Alert, AlertProps } from "@mui/material"
import { Stack } from "@mui/system"
import { signInWithPopup, AuthProvider } from "firebase/auth"
import { useAuth, useFirestore } from "reactfire"
import { useState } from "react"
import { useRouter } from "next/router"
import { doc, getDoc, setDoc } from "firebase/firestore"

export function SocialSignIn({ provider, image, bgcolor }) {
  const auth = useAuth()
  const firestore = useFirestore()
  const router = useRouter()
  const [toast, setToast] = useState({
    severity: "success",
    message: "",
    open: false,
  })

  const addHero = async (user) => {
    const { displayName, email, uid } = user
    const [firstName, lastName] = displayName.split(" ")
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
        isVerified: true,
      })
    }
  }

  const signInWithProvider = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider)
      await addHero(result.user)
      if (result.operationType === "signIn") {
        setToast({
          severity: "success",
          message: "Logged in successfully",
          open: true,
        })
      } else if (result.operationType === "link") {
        setToast({
          severity: "success",
          message: "Linked successfully",
          open: true,
        })
      } else if (result.operationType === "reauthenticate") {
        setToast({
          severity: "success",
          message: "Reauthenticated successfully",
          open: true,
        })
      }
      router.push("/find-quest")
    } catch (error) {
      setToast({
        severity: "error",
        message: error.message,
        open: true,
      })
    }
  }

  return (
    <Stack m="auto">
      <Button
        variant="contained"
        sx={{
          p: "0.5rem",
          bgcolor: bgcolor,
          ":hover": {
            bgcolor: bgcolor,
          },
        }}
        onClick={() => signInWithProvider(provider)}
      >
        <Stack direction="row" spacing={2}>
          <Image width={24} height={24} src={image} alt="Social icon" />
        </Stack>
      </Button>
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
