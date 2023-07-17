import { Grid } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"
import { ChipAdd } from "./ChipAdd"
import { ChipDelete } from "./ChipDelete"
import { ChipView } from "./ChipView"

interface FormChipsProps {
  value?: string[]
  name?: string
  chips: string[]
  setFieldValue?: SetFieldValue
  variant: "add" | "delete" | "view"
}

export function FormChips({
  value,
  name,
  chips,
  setFieldValue = () => null,
  variant,
}: FormChipsProps) {
  const handleAdd = (option: string) => {
    const previousValues = value
    const newValues = [...previousValues, option]
    setFieldValue(name, newValues)
  }

  const handleDelete = (option: string) => {
    const previousValues = value
    const newValues = previousValues.filter((item) => item !== option)
    setFieldValue(name, newValues)
  }

  const renderChip = (option: string, idx: number) => {
    switch (variant) {
      case "add":
        return value.includes(option) ? null : (
          <ChipAdd key={idx} option={option} onClick={handleAdd} />
        )
      case "delete":
        return <ChipDelete key={idx} option={option} onClick={handleDelete} />
      case "view":
        return <ChipView key={idx} option={option} />
    }
  }

  return (
    <Grid container gap={2} maxWidth="30rem">
      {chips?.map((option, idx) => renderChip(option, idx))}
    </Grid>
  )
}
