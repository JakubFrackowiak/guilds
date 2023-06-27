import styled from "@emotion/styled"
import { useFirestore, useSigninCheck, useUser } from "reactfire"
import Image from "next/image"
import {
  Stack,
  Box,
  Typography,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material"
import { SecondaryButton } from "components/SecondaryButton"
import { PrimaryButton } from "components/PrimaryButton"
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
  currency: "£" | "&" | "$"
  timeRequired: string
  workingTime: "default" | "weekdays" | "weekday evenings" | "any"
  apprenticeRate?: number
  apprenticeCut?: number
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
  const [workingTime, setWorkingTime] = useState("default")
  const firestore = useFirestore()
  const { data: user } = useUser()
  const { data: signInCheckResult } = useSigninCheck()

  const handleSubmit = async (values: FormValues) => {
    try {
      const bid = {
        bidderId: user.uid,
        createdAt: Timestamp.now(),
        rate: values.rate,
        amount: values.amount,
        currency: values.currency,
        timeRequired: values.timeRequired,
        workingTime: values.workingTime,
        questId: questId,
      }
      const bidColRef = collection(firestore, `quests/${questId}/bids`)
      const bidRef = doc(bidColRef)
      const bidSnap = await getDoc(bidRef)
      if (!bidSnap.exists()) {
        if (!selectedApprentice) {
          await setDoc(bidRef, {
            ...bid,
            totalEarnings: values.amount,
            status: "pending",
          })
        } else {
          await setDoc(bidRef, {
            ...bid,
            apprentice: selectedApprentice,
            apprenticeCut: values.amount * values.apprenticeRate,
            totalEarnings: values.amount - values.amount * values.apprenticeCut,
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
          timeRequired: "",
          workingTime: "default",
          apprenticeRate: selectedApprentice ? 0.1 : 0,
          apprenticeCut: 0,
          totalEarnings: "",
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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Payment type</Typography>
                <ToggleButtonGroup
                  value={values.rate}
                  exclusive
                  size="medium"
                  aria-label="rate-choose"
                  color="primary"
                >
                  <ToggleButton
                    value="hourly"
                    aria-label="pound"
                    onClick={() => setFieldValue("rate", "hourly")}
                  >
                    Hourly
                  </ToggleButton>
                  <ToggleButton
                    value="fixed"
                    aria-label="percentage"
                    onClick={() => setFieldValue("rate", "fixed")}
                  >
                    Fixed rate
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <ToggleButtonGroup
                  value={values.currency}
                  exclusive
                  size="medium"
                  aria-label="unit-choose"
                  color="primary"
                >
                  <ToggleButton
                    value="£"
                    aria-label="pound"
                    onClick={() => setFieldValue("currency", "£")}
                  >
                    £
                  </ToggleButton>
                  <ToggleButton
                    value="%"
                    aria-label="percentage"
                    onClick={() => setFieldValue("currency", "%")}
                  >
                    %
                  </ToggleButton>
                  <ToggleButton
                    value="$"
                    aria-label="dollar"
                    onClick={() => setFieldValue("currency", "$")}
                  >
                    $
                  </ToggleButton>
                </ToggleButtonGroup>
                <TextField
                  size="small"
                  type="number"
                  sx={{ width: "50%" }}
                  placeholder={`${values.rate} rate`}
                  value={values.amount}
                  onChange={(e) => setFieldValue("amount", e.target.value)}
                />
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2" noWrap>
                  Estimated time required
                </Typography>
                <TextField
                  placeholder="time required"
                  sx={{ width: "50%" }}
                  value={values.timeRequired}
                  onChange={(e) =>
                    setFieldValue("timeRequired", e.target.value)
                  }
                  size="small"
                />
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Available working times</Typography>

                <ToggleButtonGroup
                  value={workingTime}
                  exclusive
                  size="medium"
                  aria-label="working-time-choose"
                  color="primary"
                >
                  <ToggleButton
                    value="default"
                    aria-label="default"
                    onClick={() => {
                      setWorkingTime("default")
                      setFieldValue("workingTime", "default")
                    }}
                  >
                    Default
                  </ToggleButton>
                  <ToggleButton
                    value="custom"
                    aria-label="custom"
                    onClick={() => setWorkingTime("custom")}
                  >
                    Custom
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              {workingTime == "custom" ? (
                <ToggleButtonGroup
                  value={values.workingTime}
                  exclusive
                  size="medium"
                  aria-label="working-time-choose"
                  color="primary"
                  sx={{ alignSelf: "flex-end" }}
                >
                  <ToggleButton
                    value="weekdays"
                    aria-label="weekdays"
                    onClick={() => setFieldValue("workingTime", "weekdays")}
                  >
                    Weekdays
                  </ToggleButton>
                  <ToggleButton
                    value="weekday evenings"
                    aria-label="weekday-evening-only"
                    onClick={() =>
                      setFieldValue("workingTime", "weekday evenings")
                    }
                  >
                    Weekday evenings
                  </ToggleButton>
                  <ToggleButton
                    value="weekends"
                    aria-label="weekends"
                    onClick={() => setFieldValue("workingTime", "weekends")}
                  >
                    Weekends
                  </ToggleButton>
                  <ToggleButton
                    sx={{ textDecoration: "none" }}
                    value="any"
                    aria-label="any"
                    onClick={() => setFieldValue("workingTime", "any")}
                  >
                    <Typography sx={{ textDecoration: "none" }}>Any</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              ) : null}
              <Divider />
              {selectedApprentice ? (
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2">Apprentice rate</Typography>
                    <Typography variant="body2">
                      {values.apprenticeRate * 100 + "%"}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2">Apprentice cut</Typography>
                    <Typography variant="body2">
                      {values.amount == 0
                        ? "Enter information above"
                        : values.amount * values.apprenticeRate +
                          values.currency}
                    </Typography>
                  </Stack>
                  <Divider />
                </Stack>
              ) : null}

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Estimate total earnings</Typography>
                <Typography variant="body2">
                  {values.amount == 0
                    ? "Enter information above"
                    : values.amount -
                      values.amount * values.apprenticeRate +
                      values.currency}
                </Typography>
              </Stack>
              <Divider />
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
