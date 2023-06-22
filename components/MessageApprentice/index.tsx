import Image from "next/image"
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"
import { doc } from "firebase/firestore"
import { useFirestore, useFirestoreDocData } from "reactfire"

interface MessageApprenticeProps {
  selectedApprentice: string
  setModalOpen: (value: boolean) => void
}

export function MessageApprentice({
  selectedApprentice,
  setModalOpen,
}: MessageApprenticeProps) {
  const firestore = useFirestore()
  const apprenticeRef = doc(firestore, `heroes/${selectedApprentice}`)
  const { data: apprentice } = useFirestoreDocData(apprenticeRef)
  return (
    <Stack
      borderRadius="1rem"
      p={2}
      spacing={2}
      width="24rem"
      bgcolor="background.default"
    >
      <Stack direction="row" justifyContent="space-between" position="relative">
        <Image src="/message.svg" width={48} height={48} alt="messageIcon" />
        <IconButton
          sx={{ position: "absolute", right: 0 }}
          onClick={() => setModalOpen(false)}
        >
          <Image src="/x.svg" width={12} height={12} alt="x" />
        </IconButton>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="h6">
          Message {apprentice?.name.first + " " + apprentice?.name.last}
        </Typography>
        <Typography variant="body2">
          Send message to {apprentice?.name.first + " " + apprentice?.name.last}
        </Typography>
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
      <Stack direction="row" spacing={2}>
        <Box flexBasis="50%">
          <SecondaryButton label="Cancel" onClick={() => setModalOpen(false)} />
        </Box>
        <Box flexBasis="50%">
          <PrimaryButton label="Send" />
        </Box>
      </Stack>
    </Stack>
  )
}
