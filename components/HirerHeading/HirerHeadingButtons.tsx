import { Stack } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"
import Image from "next/image"
import Link from "next/link"

export function HirerHeadingButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <SecondaryButton label="Demo">
        <Image
          src="/play-circle.svg"
          alt="play circle"
          width={20}
          height={20}
        />
      </SecondaryButton>
      <Link
        href="/signup"
        style={{
          textDecoration: "none",
        }}
      >
        <PrimaryButton label="Sign up" />
      </Link>
    </Stack>
  )
}
