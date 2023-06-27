import Image from "next/image"
import { Box, IconButton, Link, Stack, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

interface WouldYouLikeAnApprenticeProps {
  setModalOpen: (value: boolean) => void
  setStage: (value: number) => void
  setSelectedApprentice: (value: string) => void
}

export function WouldYouLikeAnApprentice({
  setModalOpen,
  setStage,
  setSelectedApprentice,
}: WouldYouLikeAnApprenticeProps) {
  return (
    <Stack
      borderRadius="1rem"
      p={2}
      spacing={2}
      width="34rem"
      bgcolor="background.default"
    >
      <Stack direction="row" justifyContent="space-between" position="relative">
        <Image
          src="/apprentice.svg"
          width={48}
          height={48}
          alt="apprentice icon"
        />
        <IconButton
          onClick={() => {
            setModalOpen(false)
            setStage(1)
          }}
          sx={{ position: "absolute", right: 0 }}
        >
          <Image src="/x.svg" width={12} height={12} alt="x" />
        </IconButton>
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="h6">Would you like an apprentice?</Typography>
          <Typography variant="body2">
            You can earn a higher fee and reduce work time by sharing your
            skills with an enthusiastic apprentice. Find out more{" "}
            <span>
              <Link href="/" underline="none">
                here
              </Link>
            </span>
            .
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box flexBasis="50%">
            <SecondaryButton
              label="I don't want an apprentice"
              onClick={() => {
                setSelectedApprentice(null)
                setStage(5)
              }}
            />
          </Box>
          <Box flexBasis="50%">
            <PrimaryButton
              label="Browse apprentices"
              onClick={() => setStage(2)}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
