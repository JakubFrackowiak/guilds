import { Stack, Typography, Checkbox } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"

interface FormCheckboxesProps {
  options: { label: string; subLabel?: string }[]
  value: string
  name: string
  setFieldValue: SetFieldValue
}

export function FormCheckboxes({
  options,
  value,
  name,
  setFieldValue,
}: FormCheckboxesProps) {
  return (
    <Stack spacing={2}>
      {options.map((option) => (
        <Stack key={option.label} direction="row" spacing={1}>
          <Checkbox
            checked={option.label == value}
            color="primary"
            onChange={() => setFieldValue(name, option.label)}
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              color: (theme) => theme.palette.grey[300],
              "& .MuiSvgIcon-root": {
                fontSize: "1.25rem",
              },
            }}
          />
          <Stack>
            <Typography variant="formBody" lineHeight="1.5rem">
              {option.label}
            </Typography>
            <Typography variant="formBody" color="text.secondary">
              {option.subLabel}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
