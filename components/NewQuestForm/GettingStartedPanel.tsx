import { Divider, Stack } from "@mui/material"
import { AttachFiles } from "components/AttachFiles"
import { FormCheckboxes } from "components/FormCheckboxes"
import { FormField } from "components/FormField"
import { FormInputLabel } from "components/FormInputLabel"
import { FormValues, SetFieldValue } from "pages/new-quest"

interface GettingStartedPanelProps {
  values: FormValues
  setFieldValue: SetFieldValue
}

export function GettingStartedPanel({
  values,
  setFieldValue,
}: GettingStartedPanelProps) {
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
          label="Getting started"
          subLabel="We'll need to collect some information from you."
          variant="header"
        />
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Quest Title"
          subLabel="Enter your desired quest title here."
        />
        <FormField
          placeholder="Quest Title"
          value={values.title}
          name="title"
          setFieldValue={setFieldValue}
        />
      </Stack>
      <Stack direction="row">
        <FormInputLabel
          label="Quest Description"
          subLabel="Enter your desired quest description here."
        />
        <FormField
          rows={16}
          placeholder="Quest Description"
          value={values.description}
          name="description"
          setFieldValue={setFieldValue}
        />
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Attach Files"
          subLabel="Attach any relevant project files here."
        />
        <AttachFiles
          setFieldValue={setFieldValue}
          name="files"
          value={values.files}
        />
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Estimated Contract Durations"
          subLabel="Add your logo to reports and emails."
        />
        <FormCheckboxes
          options={contractDurations}
          value={values.contractDuration}
          name="contractDuration"
          setFieldValue={setFieldValue}
        />
      </Stack>
    </Stack>
  )
}
