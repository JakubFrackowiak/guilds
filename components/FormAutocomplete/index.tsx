import { Autocomplete, Box, TextField } from "@mui/material"
import { SetFieldValue } from "pages/new-quest"
import { useState } from "react"

interface FormAutocompleteProps {
  options: { label: string }[]
  placeholder: string
  setFieldValue: SetFieldValue
  name: string
  value: string | string[]
}

export function FormAutocomplete({
  options,
  placeholder = "",
  setFieldValue = null,
  name = "",
  value,
}: FormAutocompleteProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (option: { label: string }) => {
    if (option?.label && typeof value === "string") {
      setFieldValue(name, option.label)
    } else if (option?.label && typeof value === "object") {
      const previousValues = value
      const newValues = [...previousValues, option.label]
      setFieldValue(name, newValues)
    }
  }

  return (
    <Box position="relative" height="fit-content" width="fit-content">
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
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        options={options}
        onChange={(e, value) => handleChange(value)}
        size="small"
        sx={{ width: 300 }}
        renderOption={(props, option) =>
          value.includes(option.label) ? null : (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.label}
            </Box>
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            focused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            onChange={(e) => console.log(params)}
            sx={{
              zIndex: 4,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.default",
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderWidth: 1,
                  borderColor: "primary.main",
                },
              },
            }}
          />
        )}
      />
    </Box>
  )
}
