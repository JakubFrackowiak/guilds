import { Stack, Typography, Link } from "@mui/material"
import { SocialSignIn } from "components/SocialSignIn"
import { SignInForm } from "./SignInForm"
import { providers } from "../SocialSignIn/providers"

export function SignIn() {
  return (
    <Stack m="auto" width="28rem" spacing={4}>
      <SignInForm />
      <Stack direction="row">
        {providers.map((provider) => (
          <SocialSignIn key={provider.image + "-signin"} {...provider} />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={1} mt="2rem">
        <Typography variant="body1">Don't have an account?</Typography>
        <Link href="/signup" style={{ textDecoration: "none" }}>
          Sign up
        </Link>
      </Stack>
    </Stack>
  )
}
