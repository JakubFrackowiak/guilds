import { Close } from "@mui/icons-material"
import { Chip } from "@mui/material"

interface ChipDeleteProps {
  option: string
  onClick: (option: string) => void
}

export function ChipDelete({ option, onClick }: ChipDeleteProps) {
  return (
    <Chip
      size="small"
      variant="outlined"
      label={option}
      color="primary"
      sx={{
        width: "fit-content",
        bgcolor: "primary.light",
        color: "primary.dark",
      }}
      onDelete={() => onClick(option)}
      deleteIcon={<Close />}
    />
  )
}
