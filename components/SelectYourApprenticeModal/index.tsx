import Image from "next/image"
import { Box, IconButton, Stack, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"
import { FeaturedApprenticesTable } from "components/FeaturedApprenticesTable"

interface SelectYourApprenticeProps {
  setModalOpen: (value: boolean) => void
  selectedApprentice: string | null
  setSelectedApprentice: (value: string | null) => void
  setStage: (value: number) => void
}

export function SelectYourApprentice({
  setModalOpen,
  selectedApprentice,
  setSelectedApprentice,
  setStage,
}: SelectYourApprenticeProps) {
  return (
    <Stack
      borderRadius="1rem"
      p={2}
      spacing={3}
      width="70rem"
      maxHeight="90vh"
      bgcolor="background.default"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <IconButton
        sx={{ position: "absolute", right: "2rem", top: "2rem" }}
        onClick={() => setModalOpen(false)}
      >
        <Image src="/x.svg" width={12} height={12} alt="x" />
      </IconButton>
      <Image
        src="/rounded-face-pics.svg"
        width={140}
        height={70}
        alt="rounded face pics"
      />
      <Typography variant="h6">Select your apprentice</Typography>
      <Typography variant="body2">
        Your apprentice will greatly appreciate the experience working with you.
      </Typography>
      <FeaturedApprenticesTable
        selectedApprentice={selectedApprentice}
        setSelectedApprentice={setSelectedApprentice}
      />
      <Typography variant="body2" sx={{ cursor: "pointer" }}>
        View all apprentices
      </Typography>
      <Stack direction="row" spacing={2} width="100%">
        <Box flexBasis="50%">
          <SecondaryButton label="Go back" onClick={() => setStage(1)} />
        </Box>
        <Box flexBasis="50%">
          <PrimaryButton
            label="Confirm selection"
            onClick={() => setStage(3)}
            disabled={selectedApprentice == null ? true : false}
          />
        </Box>
      </Stack>
    </Stack>
  )
}
