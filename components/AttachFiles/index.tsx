import { AttachFile } from "@mui/icons-material"
import { Stack } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SetFieldValue } from "pages/new-quest"
import { useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { AttachedFile } from "./AttachedFile"
import { DropArea } from "./DropArea"

interface AttachFilesProps {
  setFieldValue: SetFieldValue
  name: string
  value: File[]
}

export function AttachFiles({ setFieldValue, name, value }: AttachFilesProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const prevValues = value
    const [acceptedFile] = acceptedFiles
    const newValues = [...prevValues, acceptedFile]
    setFieldValue(name, newValues)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Stack spacing={4}>
      <div {...getRootProps()} onDrop={null}>
        <input {...getInputProps()} />
        <PrimaryButton
          label="Attach"
          direction="row-reverse"
          sx={{ height: "100%" }}
          width="fit-content"
        >
          <AttachFile sx={{ rotate: "45deg" }} />
        </PrimaryButton>
      </div>
      <Stack direction="row" spacing={4}>
        {value.map((file, idx) => (
          <AttachedFile
            key={idx}
            setFieldValue={setFieldValue}
            name={name}
            file={file}
            value={value}
          />
        ))}
        <DropArea setFieldValue={setFieldValue} name={name} value={value} />
      </Stack>
    </Stack>
  )
}
