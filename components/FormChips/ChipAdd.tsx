import { ControlPoint } from "@mui/icons-material"
import { Chip } from "@mui/material"

interface ChipAddProps {
  option: string
  onClick: (option: string) => void
}

export function ChipAdd({ option, onClick }: ChipAddProps) {
  return (
    <Chip
      size="small"
      variant="filled"
      label={option}
      color="default"
      sx={{
        width: "fit-content",
      }}
      onDelete={() => onClick(option)}
      deleteIcon={<ControlPoint />}
    />
  )
}
