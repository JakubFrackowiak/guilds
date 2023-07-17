import { Draw, PushPinOutlined } from "@mui/icons-material"
import { Divider, Stack, Typography } from "@mui/material"

import { AttachedFile } from "components/AttachFiles/AttachedFile"
import { FormChips } from "components/FormChips"
import { FormInputLabel } from "components/FormInputLabel"
import { FormSlider } from "components/FormSlider"
import { PrimaryButton } from "components/PrimaryButton"
import { FormValues, SetFieldValue } from "pages/new-quest"

interface SummaryPanelProps {
  values: FormValues
  setFieldValue: SetFieldValue
  edit?: boolean
  setCurrentStep?: (step: number) => void
}

export function SummaryPanel({
  values,
  setFieldValue,
  edit = false,
  setCurrentStep = null,
}: SummaryPanelProps) {
  const contractDurations = [
    {
      label: "Short term",
      subLabel: "A month or less",
    },
    {
      label: "Mid term",
      subLabel: "1-3 Months",
    },
    {
      label: "Long Term/Full Time",
      subLabel: "Ongoing work",
    },
  ]
  return (
    <Stack spacing={3}>
      <Stack>
        <FormInputLabel
          label="Quest summary"
          subLabel="We'll need to collect some information from you."
          variant="header"
        />
      </Stack>
      <Divider />
      <Typography variant="formBody" color="text.primary">
        {values?.title}
      </Typography>
      <Typography variant="formBody" color="text.primary">
        {values?.description}
      </Typography>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Relevant Files"
          subLabel="Attach any relevant project files here."
        />
        <Stack direction="row" spacing={1}>
          {values.files.map((file, idx) => (
            <AttachedFile
              key={idx}
              setFieldValue={setFieldValue}
              name="files"
              file={file}
              value={values.files}
              edit={false}
            />
          ))}
        </Stack>
      </Stack>
      <FormInputLabel
        label={values.contractDuration}
        subLabel={
          contractDurations.find(
            (duration) => duration.label == values.contractDuration
          )?.subLabel
        }
      />
      {edit ? (
        <PrimaryButton
          label="Edit Section"
          width="fit-content"
          direction="row-reverse"
          onClick={() => setCurrentStep(0)}
        >
          <Draw />
        </PrimaryButton>
      ) : null}
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={3}>
          <FormInputLabel
            label={"Job Title - " + values.jobTitle}
            subLabel="Enter your desired job title here."
            width="fit-content"
          />
          <Stack spacing={1}>
            <FormInputLabel
              label="Job tasks"
              subLabel="Enter your desired job tasks here."
              width="fit-content"
            />
            {values.workTypes.map((workType) => (
              <Stack direction="row">
                <PushPinOutlined
                  sx={{ transform: "rotate(45deg)", color: "primary.dark" }}
                />
                <Typography variant="formBody" color="text.primary">
                  {workType}
                </Typography>
              </Stack>
            ))}
          </Stack>
          {edit ? (
            <PrimaryButton
              label="Edit Section"
              width="fit-content"
              direction="row-reverse"
              onClick={() => setCurrentStep(1)}
            >
              <Draw />
            </PrimaryButton>
          ) : null}
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <FormInputLabel
              label="Skills Desired"
              subLabel="Enter your desired skills here."
              width="fit-content"
            />
            <FormChips variant="view" chips={values.skills} />
          </Stack>
          <Stack spacing={1}>
            <FormInputLabel
              label="Timezone"
              subLabel={
                values.isYourTimezone
                  ? "Client is only open to working in their timezone."
                  : "Client is open to working outside their timezone."
              }
              width="fit-content"
            />
            <FormChips variant="view" chips={values.timezones} />
            <FormChips variant="view" chips={[values.hoursDifference]} />
          </Stack>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={3}>
          <Stack spacing={1}>
            <FormInputLabel
              label="Job Size"
              subLabel="Enter your desired job size here."
              width="fit-content"
            />
            <FormChips variant="view" chips={[values.jobSize + " Sized Job"]} />
          </Stack>
          <Stack spacing={1}>
            <FormInputLabel label="Estimated Time Frame" width="fit-content" />
            <FormChips
              variant="view"
              chips={["About " + values.timeToComplete]}
            />
          </Stack>
          {edit ? (
            <PrimaryButton
              label="Edit Section"
              width="fit-content"
              direction="row-reverse"
              onClick={() => setCurrentStep(2)}
            >
              <Draw />
            </PrimaryButton>
          ) : null}
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={4}>
        <FormInputLabel
          label={"Will Pay " + values.billingMethod}
          subLabel="Enter your desired billing method here."
          width="fit-content"
        />
        <Stack spacing={1}>
          <FormInputLabel
            label={
              "Level Requirements | Level " +
              values.skillLevel[0] +
              " - " +
              values.skillLevel[1]
            }
            subLabel="Enter your desired billing method here."
            width="fit-content"
          />
          <FormSlider
            value={values.skillLevel}
            name="skillLevel"
            setFieldValue={setFieldValue}
            readOnly={true}
          />
        </Stack>
        <Stack spacing={1}>
          <FormInputLabel label="Contract to hire?" width="fit-content" />
          <FormChips variant="view" chips={[values.toHire]} />
        </Stack>
        {edit ? (
          <PrimaryButton
            label="Edit Section"
            width="fit-content"
            direction="row-reverse"
            onClick={() => setCurrentStep(3)}
          >
            <Draw />
          </PrimaryButton>
        ) : null}
      </Stack>
    </Stack>
  )
}
