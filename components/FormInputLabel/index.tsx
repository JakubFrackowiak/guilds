import { Stack, Typography } from "@mui/material"

interface FormInputLabelProps {
  label?: string
  subLabel?: string
  variant?: "header" | "body"
  width?: string | number
}

export function FormInputLabel({
  label = "",
  subLabel = "",
  variant = "body",
  width = "22rem",
}: FormInputLabelProps) {
  return (
    <Stack width={width}>
      <Typography
        variant={variant == "header" ? "formHeader" : "formBody"}
        color="text.primary"
      >
        {label}
      </Typography>
      <Typography variant="formBody" color="text.secondary">
        {subLabel}
      </Typography>
    </Stack>
  )
}
