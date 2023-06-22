import { Modal } from "@mui/material"
import { MessageApprentice } from "components/MessageApprentice"
import { SelectYourApprentice } from "components/SelectYourApprenticeModal"
import { WouldYouLikeAnApprentice } from "components/WouldYouLikeAnApprentice"
import { useState } from "react"

export function ApprenticesModal({ modalOpen, setModalOpen }) {
  const [stage, setStage] = useState(1)
  const [selectedApprentice, setSelectedApprentice] = useState(null)

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <WouldYouLikeAnApprentice
            setModalOpen={setModalOpen}
            setStage={setStage}
          />
        )
      case 2:
        return (
          <SelectYourApprentice
            selectedApprentice={selectedApprentice}
            setSelectedApprentice={setSelectedApprentice}
            setModalOpen={setModalOpen}
            setStage={setStage}
          />
        )
      case 3:
        return (
          <MessageApprentice
            setModalOpen={setModalOpen}
            selectedApprentice={selectedApprentice}
          />
        )
    }
  }
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(null)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderStage()}
    </Modal>
  )
}
