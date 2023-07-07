import { Button, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  label?: string
  width?: string | number
  disabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
  sx?: any
}

export function PrimaryButton({
  children = null,
  onClick = () => null,
  label = "",
  width = "100%",
  disabled = false,
  type = "button",
  sx = {},
}: ButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      type={type}
      sx={{
        ...sx,
        height: "3rem",
        width: width,
        borderRadius: "0.6rem",
        bgcolor: "button.primary",
        "&:hover": {
          backgroundColor: "button.primaryHover",
          borderColor: "button.primaryHover",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="center"
        color="button.primaryText"
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
