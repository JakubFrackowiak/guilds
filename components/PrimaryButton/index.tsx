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
  direction?: "column" | "column-reverse" | "row" | "row-reverse"
}

export function PrimaryButton({
  children = null,
  onClick = () => null,
  label = "",
  width = "100%",
  disabled = false,
  type = "button",
  sx = {},
  direction = "row",
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
        bgcolor: "button.primary",
        "&:hover": {
          backgroundColor: "button.primaryHover",
          borderColor: "button.primaryHover",
        },
        ...(disabled && {
          backgroundColor: (theme) => theme.palette.grey[300],
          borderColor: (theme) => theme.palette.grey[300],
        }),
        ...sx,
      }}
    >
      <Stack
        direction={direction}
        alignItems="center"
        width="100%"
        justifyContent="center"
        color={disabled ? "button.secondaryText" : "button.primaryText"}
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
