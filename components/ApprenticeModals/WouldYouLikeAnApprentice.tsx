import Image from "next/image"
import { Button, Link, Stack, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

export function WouldYouLikeAnApprentice() {
  return (
    <Stack borderRadius="12px" p={2} spacing={2} maxWidth="31.5rem">
      <Stack direction="row" justifyContent="space-between">
        <Image src="/apprentice.svg" width={48} height={48} alt="apprentice" />
        <Button>
          <Image src="/x.svg" width={12} height={12} alt="x" />
        </Button>
      </Stack>
      <Stack>
        <Typography variant="h6">Would you like an apprentice?</Typography>
        <Typography variant="body2">
          You can earn a higher fee and reduce work time by sharing your skills
          with an enthusiastic apprentice. Find out more{" "}
          <Link href="/" underline="none">
            here
          </Link>
          .
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" paddingLeft={-1.5}>
        <SecondaryButton width="11.5rem" label="I don't want an apprentice" />
        <PrimaryButton width="11.5rem" label="Browse apprentices" />
      </Stack>
    </Stack>
  )
}
