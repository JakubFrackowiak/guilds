import Link from "next/link"
import { Stack, Typography } from "@mui/material"
import { SecondaryButton } from "components/SecondaryButton"
import { PrimaryButton } from "components/PrimaryButton"

export interface TopUsersHeaderProps {
  info: string
  header: string
  subheader: string
  primaryButtonText: string
  secondaryButtonLink: string
  primaryButtonLink: string
}

export function TopUsersHeader({
  info,
  header,
  subheader,
  primaryButtonText,
  secondaryButtonLink,
  primaryButtonLink,
}: TopUsersHeaderProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={500} color="primary.main">
        {info}
      </Typography>
      <Typography variant="h4" fontWeight={500}>
        {header}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subheader}
      </Typography>
      <Stack direction="row" spacing={2} pt="1rem">
        <Link
          href={secondaryButtonLink}
          style={{
            textDecoration: "none",
          }}
        >
          <SecondaryButton label="See all" />
        </Link>
        <Link
          href={primaryButtonLink}
          style={{
            textDecoration: "none",
          }}
        >
          <PrimaryButton label={primaryButtonText} />
        </Link>
      </Stack>
    </Stack>
  )
}
