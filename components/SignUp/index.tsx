import { Stack, Typography, Link } from "@mui/material"
import { SocialSignIn } from "components/SocialSignIn"
import { EmailPhoneSignUp } from "./EmailPhoneSignUp"
import { providers } from "../SocialSignIn/providers"

export function SignUp() {
  return (
    <Stack m="auto" width="28rem" spacing={2}>
      <EmailPhoneSignUp />
      <Stack direction="row">
        {providers.map((provider) => (
          <SocialSignIn key={provider.image + "-signin"} {...provider} />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={1} mt="2rem">
        <Typography variant="body1">Already have an account?</Typography>
        <Link href="/login">Log in</Link>
      </Stack>
    </Stack>
  )
}
