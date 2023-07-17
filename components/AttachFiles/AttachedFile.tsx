import { Cancel } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"
import { FileIcon, defaultStyles } from "react-file-icon"

interface AttachedFileProps {
  setFieldValue: SetFieldValue
  name: string
  file: File
  value: File[]
  edit?: boolean
}

export function AttachedFile({
  setFieldValue,
  name,
  file,
  value,
  edit = true,
}: AttachedFileProps) {
  const fileExtension = file.name.split(".").pop()

  const handleDelete = (file: File) => {
    const prevValues = value
    const newValues = prevValues.filter((prevFile) => prevFile !== file)
    setFieldValue(name, newValues)
  }

  return (
    <Box position="relative">
      <Stack
        width="6.5rem"
        height="6.5rem"
        justifyContent="space-around"
        alignItems="center"
        px={2}
        py={1}
        bgcolor="primary.light"
        sx={{
          border: "3px solid",
          borderColor: "primary.main",
        }}
      >
        {edit ? (
          <Stack
            position="absolute"
            top={0}
            right={0}
            width="1.5rem"
            height="1.5rem"
            bgcolor="background.default"
            border="2px solid"
            borderColor="primary.main"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            sx={{ transform: "translateX(50%) translateY(-50%)" }}
            onClick={() => handleDelete(file)}
          >
            <Cancel color="primary" fontSize="small" />
          </Stack>
        ) : null}
        <Box width={15} height={15}>
          <FileIcon
            extension={fileExtension}
            {...defaultStyles[fileExtension]}
          />
        </Box>
        <Typography
          variant="body2"
          color={(theme) => theme.palette.grey[500]}
          fontWeight={500}
        >
          {file.name.split("").splice(0, 8).join("") + "..."}
        </Typography>
      </Stack>
    </Box>
  )
}
