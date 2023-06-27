import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"
import Link from "next/link"

export function GetItDoneHeading() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Stack
      justifyContent="center"
      alignItems={isMobile ? "center" : "flex-start"}
      pr="0.5rem"
      width="100%"
      spacing={3}
      color="white"
      sx={{
        backgroundColor: "primary.dark",
      }}
    >
      <Typography
        variant="h3"
        mb="-0.5rem"
        maxWidth="sm"
        textAlign={isMobile ? "center" : "left"}
      >
        Whatever it is, get it done quickly with Guilds.
      </Typography>
      <Typography variant="h6" color="primary.light">
        Create a quest today.
      </Typography>
      <Stack direction="row" spacing={1} pt={1}>
        <SecondaryButton label="Learn more" />
        <Link
          href="/signup"
          style={{
            textDecoration: "none",
          }}
        >
          <PrimaryButton label="Get started" />
        </Link>
      </Stack>
    </Stack>
  )
}
