import { Divider, Stack } from "@mui/material"
import { FormCheckboxes } from "components/FormCheckboxes"
import { FormInputLabel } from "components/FormInputLabel"
import { FormSlider } from "components/FormSlider"
import { BarChart } from "components/BarChart"
import { FormValues, SetFieldValue } from "pages/new-quest"

interface BudgetPanelProps {
  values: FormValues
  setFieldValue: SetFieldValue
}

export function BudgetPanel({ values, setFieldValue }: BudgetPanelProps) {
  const billingMethods = [
    {
      label: "Project-based",
      subLabel: "Bill by milestone completion.",
    },
    {
      label: "Horuly",
      subLabel: "Pay by the hour.",
    },
  ]

  return (
    <Stack spacing={3}>
      <Stack>
        <FormInputLabel
          label="Budget information"
          subLabel="We'll need to collect some information from you."
          variant="header"
        />
      </Stack>
      <Divider />
      <Stack spacing={10}>
        <Stack spacing={3}>
          <Stack direction="row">
            <FormInputLabel
              label="How would you like to bill?"
              subLabel="Enter what is your desired billing method."
            />
            <FormCheckboxes
              options={billingMethods}
              value={values.billingMethod}
              name="billingMethod"
              setFieldValue={setFieldValue}
            />
          </Stack>
          <Stack direction="row">
            <FormInputLabel
              label="What skill level do you need the freelancer to have?"
              subLabel="Enter the desired skill level of the freelancers you want to hire."
            />
            <FormSlider
              value={values.skillLevel}
              name="skillLevel"
              setFieldValue={setFieldValue}
            />
          </Stack>
        </Stack>
        <BarChart />
      </Stack>
    </Stack>
  )
}
