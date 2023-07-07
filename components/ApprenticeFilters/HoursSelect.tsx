import { useState, useEffect } from "react"
import { connectRange } from "react-instantsearch-dom"
import {
  Stack,
  Divider,
  Select,
  MenuItem,
  Typography,
  Menu,
} from "@mui/material"
import { formatHour } from "formatters"
import { CustomRangeSliderProps } from "./RangeInput"

interface HoursSelect {
  step: number
}

interface Value {
  min: number
  max: number
}

interface CustomInputProps extends CustomRangeSliderProps {
  refine: (value: { min: number } | { max: number }) => void
  value: Value
  setValue: (value: Value) => void
}

export function HoursSelect({ step }: HoursSelect) {
  const hoursArr = Array.from(Array(24).keys())
  const [value, setValue] = useState({ min: 0, max: 23 })

  const handleMinChange = (newValue: string | number) => {
    setValue({ min: newValue as number, max: value.max })
  }
  const handleMaxChange = (newValue: string | number) => {
    setValue({ min: value.min, max: newValue as number })
  }

  return (
    <Stack>
      <Stack spacing={1}>
        <Stack spacing={2} justifyContent="space-between">
          <Select
            value={value.min}
            size="small"
            onChange={(e) => handleMinChange(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "10rem",
                },
              },
            }}
          >
            {hoursArr.map((hour) => (
              <MenuItem value={hour}>{formatHour(hour)}</MenuItem>
            ))}
          </Select>
          <Divider
            orientation="horizontal"
            sx={{ width: "0.5rem", bgcolor: "black", alignSelf: "center" }}
          />
          <Select
            value={value.max}
            size="small"
            onChange={(e) => handleMaxChange(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "10rem",
                },
              },
            }}
          >
            {Array.from(Array(24).keys()).map((hour) => (
              <MenuItem value={hour}>{formatHour(hour)}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <CustomSelect
        value={value}
        setValue={setValue}
        attribute="apprentice.workingHours.start"
        min={0}
        max={23}
      />
      <CustomSelect
        value={value}
        setValue={setValue}
        attribute="apprentice.workingHours.end"
        min={0}
        max={23}
      />
    </Stack>
  )
}

function CustomHoursSelect({
  refine,
  value,
  setValue,
  currentRefinement,
  attribute,
}: CustomInputProps) {
  useEffect(() => {
    attribute == "apprentice.workingHours.start"
      ? refine({ min: value.min })
      : refine({ max: value.max })
  }, [attribute == "apprentice.workingHours.start" ? value.min : value.max])

  useEffect(() => {
    attribute == "apprentice.workingHours.start"
      ? setValue({ ...value, min: currentRefinement.min })
      : setValue({ ...value, max: currentRefinement.max })
  }, [currentRefinement])

  return null
}

const CustomSelect = connectRange(CustomHoursSelect)
