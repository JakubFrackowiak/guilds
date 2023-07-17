import { ControlPoint } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"
import { useDropzone } from "react-dropzone"

interface DropAreaProps {
  setFieldValue: SetFieldValue
  name: string
  value: File[]
}

export function DropArea({ setFieldValue, name, value }: DropAreaProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const prevValues = value
    const isInArray = value.includes(acceptedFiles[0])
    if (isInArray) return
    const newValues = [...prevValues, acceptedFiles[0]]
    setFieldValue(name, newValues)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack
        width="6.5rem"
        height="6.5rem"
        justifyContent="space-around"
        alignItems="center"
        px={2}
        py={1}
        bgcolor={isDragActive ? "primary.light" : "bakground.default"}
        sx={{
          border: "3px solid",
          borderColor: isDragActive
            ? "primary.main"
            : (theme) => theme.palette.grey[500],
          borderStyle: "dashed",
        }}
      >
        <ControlPoint sx={{ color: (theme) => theme.palette.grey[500] }} />
        <Typography
          variant="body2"
          color={(theme) => theme.palette.grey[500]}
          fontWeight={500}
        >
          Drop files here
        </Typography>
      </Stack>
    </div>
  )
}
