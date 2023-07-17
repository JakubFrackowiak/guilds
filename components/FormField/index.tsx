import { Box, TextField } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"
import { useState } from "react"

interface FormFieldProps {
  rows?: number
  placeholder?: string
  value?: string
  name?: string
  setFieldValue?: SetFieldValue
}

export function FormField({
  rows = 1,
  placeholder = "",
  value = "",
  name = "",
  setFieldValue,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Box position="relative" height="fit-content">
      {isFocused ? (
        <Box
          bgcolor="#f4ebff"
          position="absolute"
          width="calc(100% + 10px)"
          height="calc(100% + 10px)"
          top="50%"
          left="50%"
          borderRadius={3}
          sx={{ transform: "translateX(-50%) translateY(-50%)" }}
          zIndex={1}
        />
      ) : null}
      <TextField
        size="small"
        multiline={rows == 1 ? false : true}
        rows={rows}
        focused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setFieldValue(name, e.target.value)}
        InputProps={{
          sx: {
            borderRadius: 2,
            width: "30rem",
          },
        }}
        sx={{
          zIndex: 4,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.default",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderWidth: 1,
              borderColor: "primary.main",
            },
          },
        }}
      />
    </Box>
  )
}
