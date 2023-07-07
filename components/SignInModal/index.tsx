import { Box, IconButton, Modal } from "@mui/material"
import { SignIn } from "components/SignIn"
import Image from "next/image"

interface SignInModalProps {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
}

export function SignInModal({ modalOpen, setModalOpen }: SignInModalProps) {
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        borderRadius="1rem"
        px={2}
        py={4}
        width="34rem"
        bgcolor="background.default"
      >
        <Box position="relative">
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <Image src="/x.svg" width={12} height={12} alt="x" />
          </IconButton>
        </Box>
        <SignIn />
      </Box>
    </Modal>
  )
}
