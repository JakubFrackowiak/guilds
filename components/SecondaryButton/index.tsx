import { ThemeContext } from "@emotion/react"
import { Button, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  label?: string
  width?: string | number
  disabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
}

export function SecondaryButton({
  children = null,
  onClick = () => null,
  label = "",
  width = "100%",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      type={type}
      sx={{
        height: "3rem",
        width: width,
        borderRadius: "0.6rem",
        borderColor: (ThemeContext) => ThemeContext.palette.grey[300],
        bgcolor: "button.secondary",
        "&:hover": {
          backgroundColor: "button.secondaryHover",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="center"
        color="button.secondaryText"
        spacing={1}
      >
        {children}
        {label != "" ? (
          <Typography
            textAlign="center"
            textTransform="none"
            fontWeight={500}
            variant="body1"
            whiteSpace="nowrap"
          >
            {label}
          </Typography>
        ) : null}
      </Stack>
    </Button>
  )
}
