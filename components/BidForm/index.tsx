import styled from "@emotion/styled"
import {
  useFirestore,
  useFirestoreDocData,
  useSigninCheck,
  useUser,
} from "reactfire"
import Image from "next/image"
import {
  Stack,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  AlertColor,
  Box,
} from "@mui/material"
import { Form, Formik } from "formik"
import { useState } from "react"
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { BidFormContents } from "./BidFormContents"
import { SecondaryButton } from "components/SecondaryButton"
import { PrimaryButton } from "components/PrimaryButton"

const Heading = styled(Typography)({
  color: "#101828",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 500,
  marginTop: 5,
  marginBottom: 5,
})

const SubHeading = styled(Typography)({
  color: "#667085",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 400,
})

interface FormValues {
  rate: "hourly" | "fixed"
  amount: number
  currency: "£" | "%" | "$"
  timeRequired: number
  workingTime: "default" | "weekdays" | "weekday evenings" | "any"
  apprenticeRate?: number
  apprenticeCut?: number
  totalEarnings?: number
}

interface BidFormProps {
  setModalOpen: (value: boolean) => void
  setStage: (value: number) => void
  selectedApprentice: string
  questId: string
}

export function BidForm({
  setModalOpen,
  setStage,
  selectedApprentice,
  questId,
}: BidFormProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const firestore = useFirestore()
  const { data: user } = useUser()
  const { data: signInCheckResult } = useSigninCheck()
  const apprenticeRef = doc(firestore, `heroes/${selectedApprentice}`)
  const { data: apprentice } = useFirestoreDocData(apprenticeRef)

  const handleSubmit = async (values: FormValues) => {
    const {
      rate,
      currency,
      amount,
      timeRequired,
      workingTime,
      apprenticeCut,
      totalEarnings,
    } = values
    try {
      const bid = {
        bidderId: user.uid,
        createdAt: Timestamp.now(),
        rate: rate,
        amount: amount,
        currency: currency,
        timeRequired: timeRequired,
        workingTime: workingTime,
        totalEarnings: totalEarnings,
        questId: questId,
        totalBidValue: totalEarnings + (apprenticeCut || 0),
      }
      const bidColRef = collection(firestore, `quests/${questId}/bids`)
      const bidRef = doc(bidColRef)
      const bidSnap = await getDoc(bidRef)
      if (!bidSnap.exists()) {
        if (!selectedApprentice) {
          await setDoc(bidRef, {
            ...bid,
            status: "pending",
          })
        } else {
          await setDoc(bidRef, {
            ...bid,
            apprentice: selectedApprentice,
            apprenticeCut: apprenticeCut,
            status: "apprentice pending",
          })
        }
        const questRef = doc(firestore, `quests/${questId}`)
        const questSnap = await getDoc(questRef)
        if (questSnap.exists()) {
          await updateDoc(questRef, {
            bidders: arrayUnion(user.uid),
          })
        }
        setSnackbar({
          open: true,
          message: "Bid made",
          severity: "success",
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      })
    }
  }

  if (signInCheckResult) {
    return (
      <Formik
        initialValues={{
          rate: "hourly",
          currency: "£",
          amount: 0,
          timeRequired: 0,
          workingTime: "default",
          apprenticeRate: selectedApprentice ? apprentice.apprentice.rate : 0,
          apprenticeCut: 0,
          totalEarnings: 0,
        }}
        onSubmit={(values: FormValues) => handleSubmit(values)}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Stack
              borderRadius="1rem"
              px={4}
              bgcolor="background.default"
              maxHeight="90vh"
              minWidth="50vw"
              overflow="scroll"
              spacing={3}
            >
              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() =>
                  setSnackbar({ open: false, message: "", severity: "" })
                }
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Alert
                  variant="filled"
                  severity={snackbar.severity as AlertColor}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
              <Stack
                justifyContent="center"
                alignItems="center"
                position="sticky"
                top={0}
                bgcolor="background.default"
                zIndex={99}
                pt={4}
                pb={2}
              >
                <Image src="/cash.svg" width={48} height={48} alt="cash icon" />
                <IconButton
                  sx={{ position: "absolute", right: 0, top: 30 }}
                  onClick={() => {
                    setModalOpen(false)
                    setStage(1)
                  }}
                >
                  <Image src="/x.svg" width={12} height={12} alt="x" />
                </IconButton>
                <Heading>Payment</Heading>
                <SubHeading>Amend your payment projections</SubHeading>
              </Stack>
              <BidFormContents
                values={values}
                setFieldValue={setFieldValue}
                selectedApprentice={selectedApprentice}
              />
              <Stack
                direction="row"
                spacing={2}
                py={2}
                position="sticky"
                bottom="0px"
                bgcolor="background.default"
                zIndex={99}
              >
                <Box flexBasis="50%">
                  <SecondaryButton
                    label="Go back"
                    onClick={() => setStage(1)}
                  />
                </Box>
                <Box flexBasis="50%">
                  <PrimaryButton label="Confirm and send bid" type="submit" />
                </Box>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    )
  }
}
