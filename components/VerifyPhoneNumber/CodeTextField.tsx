import { TextField } from "@mui/material"
import { Code } from "../VerifyPhoneNumber"

interface CodeTextFieldProps {
  code: Code
  setCode: React.Dispatch<React.SetStateAction<Code>>
  index: number
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
}

export function CodeTextField({
  code,
  setCode,
  index,
  inputRefs,
}: CodeTextFieldProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    const regex = /^[0-9\b]+$/
    if (value === "" || regex.test(value)) {
      setCode((prev) => ({ ...prev, [index]: value }))
      if (
        !isNaN(parseInt(value)) &&
        value.length === 1 &&
        index < inputRefs.current.length - 1
      ) {
        inputRefs.current[index + 1].focus()
      }
    }
  }
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      index > 0 &&
      code[index] === ""
    ) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <TextField
      inputProps={{
        style: {
          height: "4rem",
          fontSize: 50,
          textAlign: "center",
          padding: 0,
          caretColor: "transparent",
          fontWeight: 600,
        },
        maxLength: 1,
      }}
      onChange={handleChange}
      value={code[index]}
      inputRef={(el) => (inputRefs.current[index] = el)}
      onKeyDown={(event) => handleKeyDown(event, index)}
    />
  )
}
