import { connectRange } from "react-instantsearch-dom"
import { Stack, Divider, TextField } from "@mui/material"
import { useEffect, useState } from "react"

export interface CustomRangeSliderProps {
  min: number
  max: number
  currentRefinement: {
    min: number
    max: number
  }
  refine: (value: { min: number; max: number }) => void
  step: number
  attribute: string
}

function CustomRangeInput({
  min,
  max,
  currentRefinement,
  refine,
  step,
}: CustomRangeSliderProps) {
  const stringMin = min.toString()
  const stringMax = max.toString()
  const [value, setValue] = useState({
    min: stringMin,
    max: stringMax,
  })

  useEffect(() => {
    if (currentRefinement.min == min && currentRefinement.max == max) {
      setValue({ min: stringMin, max: stringMax })
    }
  }, [currentRefinement])

  useEffect(() => {
    if (value.min == "") {
      refine({ ...currentRefinement, min: min })
    }
  }, [value.min])

  useEffect(() => {
    if (value.max == "") {
      refine({ ...currentRefinement, max: max })
    }
  }, [value.max])

  const handleMinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const minValue = parseFloat(parseFloat(event.target.value).toFixed(1))
    if (event.target.value == "") {
      setValue({ ...value, min: "" })
    }
    if (
      minValue <= currentRefinement.max &&
      minValue - step < currentRefinement.max
    ) {
      setValue({
        ...value,
        min: minValue < min ? stringMin : minValue.toString(),
      })
      refine({
        ...currentRefinement,
        min: minValue < min ? min : minValue,
      })
    }
  }

  const handleMaxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const maxValue = parseFloat(parseFloat(event.target.value).toFixed(1))
    if (event.target.value == "") {
      setValue({ ...value, max: "" })
    }
    if (
      maxValue >= currentRefinement.min &&
      maxValue + step > currentRefinement.min
    ) {
      setValue({
        ...value,
        max: maxValue > max ? stringMax : maxValue.toString(),
      })
      refine({
        ...currentRefinement,
        max: maxValue > max ? max : maxValue,
      })
    }
  }

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <TextField
          inputProps={{
            step: step,
            min: min,
            max: max,
          }}
          value={currentRefinement.min}
          onChange={(e) => handleMinChange(e)}
          size="small"
          type="number"
        />
        <Divider
          orientation="horizontal"
          sx={{ width: "0.5rem", bgcolor: "black" }}
        />
        <TextField
          inputProps={{
            step: step,
            min: min,
            max: max,
          }}
          value={currentRefinement.max}
          onChange={(e) => handleMaxChange(e)}
          size="small"
          type="number"
        />
      </Stack>
    </Stack>
  )
}

export const RangeInput = connectRange(CustomRangeInput)
