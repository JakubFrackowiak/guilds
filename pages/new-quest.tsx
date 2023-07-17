import {
  Alert,
  AlertColor,
  Box,
  Container,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"
import { FormStepper } from "components/FormStepper"
import { Header } from "components/Header"
import { BudgetPanel } from "components/NewQuestForm/BudgetPanel"
import { GettingStartedPanel } from "components/NewQuestForm/GettingStartedPanel"
import { PositionPanel } from "components/NewQuestForm/PositionPanel"
import { ScopePanel } from "components/NewQuestForm/ScopePanel"
import { SummaryPanel } from "components/NewQuestForm/SummaryPanel"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"
import { SideNav } from "components/SideNav"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useFirestore, useStorage, useUser } from "reactfire"

export interface FormValues {
  title: string
  description: string
  files: File[]
  contractDuration: string
  jobTitle: string
  workTypes: string[]
  skills: string[]
  timezones: string[]
  isYourTimezone: boolean
  hoursDifference: string
  jobSize: string
  timeToComplete: string
  toHire: string
  billingMethod: string
  skillLevel: number[]
}

export type SetFieldValue = (
  name: string,
  value: string | File[] | string[] | boolean | number[]
) => void

export default function NewQuestPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const { data: user } = useUser()
  const firestore = useFirestore()
  const storage = useStorage()
  const router = useRouter()

  const initialValues = [
    {
      title: "",
      description: "",
      files: [],
      contractDuration: "",
    },
    {
      jobTitle: "",
      workTypes: [],
      skills: [],
      timezones: [],
      isYourTimezone: false,
      hoursDifference: "",
    },
    {
      jobSize: "",
      timeToComplete: "",
      toHire: "",
    },
    {
      billingMethod: "",
      skillLevel: [0, 10],
    },
  ]

  const handleBackStep = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setCurrentStep((prev) => prev - 1)
  }

  const handleNextStep = () => {
    if (currentStep === 5) {
      router.push("/find-quest")
      return
    }
    window.scrollTo({
      top: 0,
    })
    setCurrentStep((prev) => prev + 1)
  }

  const isDisabled = (values: FormValues) => {
    if (currentStep > 3) return false
    return Object.entries(initialValues[currentStep]).some(([key, value]) => {
      if (typeof value === "boolean" || typeof value == "object") return false
      return value === values[key]
    })
  }

  const getPrimaryButtonText = () => {
    switch (currentStep) {
      case 4:
        return "Submit"
      case 5:
        return "Back to Quest Hub"
      default:
        return "Next"
    }
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const questsRef = collection(firestore, "quests")
      const questRef = doc(questsRef)
      const questId = questRef.id
      const questSnap = await getDoc(questRef)
      const fileNames = values.files.map((file) => file.name)
      if (!questSnap.exists()) {
        await setDoc(questRef, {
          id: questId,
          creatorId: user.uid,
          ...values,
          files: fileNames,
        })
        const fileReq = values.files.map((file) => {
          const storageRef = ref(storage, `quests/${questId}/${file.name}`)
          return uploadBytes(storageRef, file)
        })
        await Promise.all(fileReq)
        setSnackbar({
          open: true,
          message: "Quest created successfully!",
          severity: "success",
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Quest creation failed!",
        severity: "error",
      })
    }
  }
  const renderStepPanel = (
    values: FormValues,
    setFieldValue: SetFieldValue
  ) => {
    switch (currentStep) {
      case 0:
        return (
          <GettingStartedPanel values={values} setFieldValue={setFieldValue} />
        )
      case 1:
        return <PositionPanel values={values} setFieldValue={setFieldValue} />
      case 2:
        return <ScopePanel values={values} setFieldValue={setFieldValue} />
      case 3:
        return <BudgetPanel values={values} setFieldValue={setFieldValue} />
      case 4:
        return (
          <SummaryPanel
            values={values}
            setFieldValue={setFieldValue}
            edit={true}
            setCurrentStep={setCurrentStep}
          />
        )
      case 5:
        return (
          <SummaryPanel
            values={values}
            setFieldValue={setFieldValue}
            edit={false}
          />
        )
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav /> : <Header />}
      <Container sx={{ pt: 10 }}>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() =>
            setSnackbar({ open: false, message: "", severity: "success" })
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity={snackbar.severity as AlertColor}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Stack spacing={3} pb={12}>
          <Typography variant="h4">New Quest</Typography>
          <FormStepper steps={[0, 1, 2, 3, 4]} activeStep={currentStep} />
          <Formik
            initialValues={{
              title: "",
              description: "",
              files: [],
              contractDuration: "",
              jobTitle: "",
              workTypes: [],
              skills: [],
              timezones: [],
              isYourTimezone: false,
              hoursDifference: "",
              jobSize: "",
              timeToComplete: "",
              toHire: "",
              billingMethod: "",
              skillLevel: [0, 10],
            }}
            onSubmit={(values: FormValues) => handleSubmit(values)}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {renderStepPanel(values, setFieldValue)}
                    <Divider />
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      {currentStep !== 0 && currentStep !== 5 ? (
                        <SecondaryButton
                          label="Back"
                          width="fit-content"
                          onClick={() => handleBackStep()}
                        />
                      ) : null}
                      <PrimaryButton
                        label={getPrimaryButtonText()}
                        width="fit-content"
                        type={currentStep === 5 ? "submit" : "button"}
                        disabled={isDisabled(values)}
                        onClick={() => handleNextStep()}
                      />
                    </Stack>
                  </Stack>
                </Form>
              </>
            )}
          </Formik>
        </Stack>
      </Container>
    </Box>
  )
}
