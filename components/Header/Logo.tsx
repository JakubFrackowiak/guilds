import Link from "next/link"
import Image from "next/image"
import { Box, Stack, Typography } from "@mui/material"

export const Logo = () => {
  return (
    <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Stack direction="row" alignItems="flex-end">
        <Box>
          <Image
            src="/lancr-logo-transparent.svg"
            width={50}
            height={50}
            alt="Lancr Logo"
          />
        </Box>
        <Box pb="10px">
          <Image
            src="/lancr-text-transparent.svg"
            width={100}
            height={25}
            alt="Lancr Logo"
          />
        </Box>
      </Stack>
    </Link>
  )
}
