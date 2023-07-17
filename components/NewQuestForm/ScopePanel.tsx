import { Divider, Stack } from "@mui/material"
import { FormCheckboxes } from "components/FormCheckboxes"

import { FormInputLabel } from "components/FormInputLabel"
import { FormAutocomplete } from "components/FormAutocomplete"

export function ScopePanel({ values, setFieldValue }) {
  const jobSizes = [
    {
      label: "Small",
      subLabel: "Straightforward tasks that dont't take very long.",
    },
    {
      label: "Medium",
      subLabel: "Small, defined projects.",
    },
    {
      label: "Large",
      subLabel: "Large undertakings that can span months or even years.",
    },
  ]
  const months = [
    { label: "1 month" },
    { label: "2 months" },
    { label: "3 months" },
    { label: "4 months" },
    { label: "5 months" },
    { label: "6 months" },
    { label: "7 months" },
    { label: "8 months" },
    { label: "9 months" },
    { label: "10 months" },
    { label: "11 months" },
    { label: "12 months" },
  ]

  const isToHire = [{ label: "Yes" }, { label: "No" }, { label: "Maybe" }]

  return (
    <Stack spacing={3}>
      <Stack>
        <FormInputLabel
          label="Scope information"
          subLabel="We'll need to collect some information from you."
          variant="header"
        />
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Job Size"
          subLabel="Enter your desired job size here."
        />
        <FormCheckboxes
          options={jobSizes}
          value={values.jobSize}
          name="jobSize"
          setFieldValue={setFieldValue}
        />
      </Stack>
      <Stack direction="row">
        <FormInputLabel
          label="How many months will this take to complete?"
          subLabel="Enter how many months you expect the job to take."
        />
        <FormAutocomplete
          options={months}
          placeholder="Months"
          setFieldValue={setFieldValue}
          name="timeToComplete"
          value={values.timeToComplete}
        />
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Is this a contract to hire position?"
          subLabel="State whether this is a contract to hire position."
        />
        <FormAutocomplete
          options={isToHire}
          placeholder="Hire"
          setFieldValue={setFieldValue}
          name="toHire"
          value={values.toHire}
        />
      </Stack>
    </Stack>
  )
}
