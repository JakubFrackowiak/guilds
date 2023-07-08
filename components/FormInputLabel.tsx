import { Stack, Typography } from "@mui/material"

interface FormInputLabelProps {
  label: string
  subLabel?: string
}

export function FormInputLabel({ label, subLabel }: FormInputLabelProps) {
  return (
    <Stack>
      <Typography variant="formBody" color="text.primary">
        {label}
      </Typography>
      <Typography variant="formBody" color="text.secondary">
        {subLabel}
      </Typography>
    </Stack>
  )
}
