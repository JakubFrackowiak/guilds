import { Modal, Stack } from "@mui/material"
import { ApprenticeTablePanel } from "components/ApprenticeTablePanel"
import { MessageApprentice } from "components/MessageApprentice"
import { SelectYourApprentice } from "components/SelectYourApprenticeModal"
import { WouldYouLikeAnApprentice } from "components/WouldYouLikeAnApprentice"
import { useEffect, useState } from "react"
import { BidForm } from "../BidForm"

export function MakeBidModal({ modalOpen, setModalOpen, questId }) {
  const [stage, setStage] = useState(1)
  const [selectedApprentice, setSelectedApprentice] = useState(null)

  useEffect(() => {
    setSelectedApprentice(null)
    setStage(1)
  }, [modalOpen])

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <WouldYouLikeAnApprentice
            setModalOpen={setModalOpen}
            setStage={setStage}
            setSelectedApprentice={setSelectedApprentice}
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
          <Stack
            borderRadius="1rem"
            p={6}
            spacing={2}
            bgcolor="background.default"
            height="90vh"
            minWidth="95vw"
          >
            <ApprenticeTablePanel
              tab={null}
              index={null}
              displayButtons={true}
              setStage={setStage}
              setSelectedApprentice={setSelectedApprentice}
              selectedApprentice={selectedApprentice}
            />
          </Stack>
        )
      case 4:
        return (
          <MessageApprentice
            setModalOpen={setModalOpen}
            selectedApprentice={selectedApprentice}
            setStage={setStage}
          />
        )
      case 5:
        return (
          <BidForm
            setModalOpen={setModalOpen}
            setStage={setStage}
            selectedApprentice={selectedApprentice}
            questId={questId}
          />
        )
    }
  }
  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setStage(1)
        setModalOpen(false)
      }}
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
