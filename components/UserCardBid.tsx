import styled from "@emotion/styled"
import Link from "next/link"
import Image from "next/image"
import { Stack, Typography, Box, Grid } from "@mui/material"
import { Bid } from "types/quest"
import { StorageImage, useFirestore, useFirestoreDocData } from "reactfire"
import { doc } from "firebase/firestore"
import { formatBid } from "formatters"

interface UserCardBidProps {
  bid: Bid
}

const Heading = styled(Typography)({
  color: "#101828",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 500,
})

const UserAvatar = styled(StorageImage)`
  width: 80px;
  height: 80px;
  border: 2.5px solid #ffffff;
  border-radius: 200px;
  margin: 0px -7px;
  object-fit: cover;
`

export function UserCardBid({ bid }: UserCardBidProps) {
  const firestore = useFirestore()
  const heroQuery = doc(firestore, "heroes", bid.bidderId)
  const { data: hero } = useFirestoreDocData(heroQuery)

  if (!hero) {
    return null
  }

  return (
    <Grid item xs={4}>
      <Stack sx={{ maxWidth: "330px" }}>
        <UserAvatar storagePath={`general/${hero?.profilePicture}`} />
        <Stack>
          <Heading>
            {hero.name.first} {hero.name.last}
          </Heading>
          <Typography
            sx={{
              fontWeight: 400,
              size: "1rem",
              lineHeight: "1.5rem",
              color: "primary.main",
            }}
          >
            {formatBid(bid)}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              size: "1rem",
              lineHeight: "1.5rem",
              color: "#667085",
              paddingY: 1,
            }}
          >
            {hero.experience
              ? hero?.experience[0].position +
                " at " +
                hero?.experience[0]?.company
              : "Gathering experience"}
          </Typography>
          <Stack flexDirection="row" sx={{ mb: 2, mt: 1 }}>
            <Box sx={{ mr: 2 }}>
              <Link href={"link"}>
                <Image
                  src="/twitter.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                />
              </Link>
            </Box>
            <Box sx={{ mr: 2 }}>
              <Link href={"link"}>
                <Image
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </Link>
            </Box>
            <Box sx={{ mr: 2 }}>
              <Link href={"link"}>
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  )
}
