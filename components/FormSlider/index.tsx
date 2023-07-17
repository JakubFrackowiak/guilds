import { Slider } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"

interface FormSliderProps {
  value: number[]
  name: string
  setFieldValue: SetFieldValue
  readOnly?: boolean
}

export function FormSlider({
  value,
  name,
  setFieldValue,
  readOnly = false,
}: FormSliderProps) {
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
  ]

  const handleChange = (event, newValue: number | number[]) => {
    setFieldValue(name, newValue as number[])
  }

  return (
    <Slider
      getAriaLabel={() => "Skill range"}
      valueLabelDisplay="auto"
      onChange={(e, value) => (readOnly ? null : handleChange(e, value))}
      marks={marks}
      defaultValue={value}
      min={0}
      max={10}
      components={{
        Mark: () => null,
      }}
      value={value}
      sx={{
        width: "25rem",
        "& .MuiSlider-thumb": {
          display: readOnly ? "none" : "block",
          width: "1.5rem",
          height: "1.5rem",
          bgcolor: "background.default",
          border: "2px solid",
        },
        "& .MuiSlider-rail": {
          bgcolor: (theme) => theme.palette.grey[400],
          height: "0.5rem",
        },
      }}
    />
  )
}
