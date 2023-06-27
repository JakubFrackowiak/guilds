import { useState, useEffect } from "react"
import { connectRange } from "react-instantsearch-dom"
import { Stack, Slider } from "@mui/material"
import { formatHour } from "formatters"
import { CustomRangeSliderProps } from "./RangeInput"

interface HoursSlider {
  step: number
}

interface Value {
  min: number
  max: number
}

interface CustomSliderProps extends CustomRangeSliderProps {
  refine: (value: { min: number } | { max: number }) => void
  value: Value
  setValue: (value: Value) => void
}

export function HoursSlider({ step }: HoursSlider) {
  const [value, setValue] = useState({ min: 0, max: 23 })
  const handleChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    setValue({ min: min, max: max })
  }

  return (
    <Stack>
      <Slider
        value={[value.min, value.max]}
        onChange={(e, newValue) => handleChange(e, newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={23}
        step={step}
        valueLabelFormat={(hour) => formatHour(hour)}
      />
      <CustomSlider
        value={value}
        setValue={setValue}
        attribute="apprentice.workingHours.start"
        min={0}
        max={23}
      />
      <CustomSlider
        value={value}
        setValue={setValue}
        attribute="apprentice.workingHours.end"
        min={0}
        max={23}
      />
    </Stack>
  )
}

function CustomRangeSlider({
  refine,
  value,
  setValue,
  currentRefinement,
  attribute,
}: CustomSliderProps) {
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

const CustomSlider = connectRange(CustomRangeSlider)
