import styled from "@emotion/styled"
import {
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  Box,
} from "@mui/material"
import Image from "next/image"

interface FormStepperProps {
  steps: number[]
  activeStep: number
}

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#E31B54",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#E31B54",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#e9ecf0",
    borderTopWidth: 2,
    borderRadius: 1,
    width: "calc(100% + 17px)",
    transform: "translateX(-17px)",
  },
}))

const CustomStepIcon = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  "& img": {
    marginRight: 17,
  },
}))

export function FormStepper({ steps, activeStep }: FormStepperProps) {
  const getStepIcon = (index: number, activeStep: number) => {
    if (activeStep < index) {
      return "/incoming-step-icon.svg"
    } else if (activeStep === index) {
      return "/current-step-icon.svg"
    } else {
      return "/completed-step-icon.svg"
    }
  }

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<CustomConnector />}
      sx={{ width: "40rem", translate: -44 }}
    >
      {steps.map((label: number, index) => (
        <Step key={label} sx={{ padding: 0 }}>
          <StepLabel
            StepIconComponent={() => (
              <CustomStepIcon>
                {activeStep == index ? (
                  <Box
                    width={36}
                    height={36}
                    bgcolor="primary.light"
                    position="absolute"
                    left={-6}
                    borderRadius="50%"
                    zIndex={1}
                  />
                ) : null}
                <Image
                  src={getStepIcon(index, activeStep)}
                  width={24}
                  height={24}
                  alt="step-icon"
                  style={{ zIndex: 2 }}
                />
              </CustomStepIcon>
            )}
          />
        </Step>
      ))}
    </Stepper>
  )
}
