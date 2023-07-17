import { Stack, Typography, Checkbox } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"

interface FormCheckboxesProps {
  value: string[]
  name: string
  setFieldValue: SetFieldValue
}

export function FormCheckboxList({
  value,
  name,
  setFieldValue,
}: FormCheckboxesProps) {
  const handleChange = (option: string) => {
    const previousValues = value
    const newValues = previousValues.filter((item) => item !== option)
    setFieldValue(name, newValues)
  }
  return (
    <Stack spacing={2}>
      {value.map((option) => (
        <Stack key={option} direction="row" spacing={1}>
          <Checkbox
            checked
            color="primary"
            onChange={() => handleChange(option)}
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              color: (theme) => theme.palette.grey[300],
              "& .MuiSvgIcon-root": {
                fontSize: "1.25rem",
              },
            }}
          />
          <Typography variant="formBody" lineHeight="1.5rem">
            {option}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
