import Image from "next/image"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

interface SelectYourApprenticeProps {
  name: string
}

export function SelectYourApprentice({ name }: SelectYourApprenticeProps) {
  return (
    <Stack borderRadius="12px" p={2} spacing={2} maxWidth="400px">
      <Stack direction="row" justifyContent="space-between">
        <Image src="/message.svg" width={48} height={48} alt="messageIcon" />
        <Button>
          <Image src="/x.svg" width={12} height={12} alt="x" />
        </Button>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h6">Message {name}</Typography>
        <Typography variant="body2">Send message to {name}</Typography>
      </Stack>
      <TextField
        variant="outlined"
        placeholder="Your message..."
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
      <Stack direction="row" justifyContent="space-between">
        <SecondaryButton width="8rem" label="Cancel" />
        <PrimaryButton width="8rem" label="Send" />
      </Stack>
    </Stack>
  )
}
