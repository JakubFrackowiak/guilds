import styled from "@emotion/styled"
import { Stack, Box, Typography } from "@mui/material"
import { Hero } from "types/hero"
import { Bid, Quest } from "types/quest"
import {
  StorageImage,
  useFirestoreCollectionData,
  useFirestore,
  useUser,
} from "reactfire"
import { collection } from "firebase/firestore"
import { MakeBidModal } from "./MakeBidModal"
import { useState } from "react"
import { SecondaryButton } from "./SecondaryButton"
import { PrimaryButton } from "./PrimaryButton"
import { SignInModal } from "./SignInModal"
import { formatBid } from "formatters"

interface IndividualQuestBannerProps {
  hero: Hero
  quest: Quest
  bestBid: Bid
}

const QuestImage = styled(StorageImage)({
  objectFit: "cover",
  maxHeight: 590,
  aspectRatio: "7/8",
})

const UserAvatar = styled(StorageImage)`
  width: 60px;
  height: 60px;
  border: 2.5px solid #ffffff;
  border-radius: 200px;
  margin: 0px -7px;
  object-fit: cover;
`

export function IndividualQuestBanner({
  hero,
  quest,
  bestBid,
}: IndividualQuestBannerProps) {
  const [makeBidModalOpen, setMakeBidModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const { data: user } = useUser()
  const firestore = useFirestore()

  const heroRef = collection(firestore, "heroes")
  const { data: heroes } = useFirestoreCollectionData(heroRef)
  const bestBidder = heroes?.find((hero) => hero.id === bestBid?.bidderId)

  const handleModalOpen = () => {
    if (user) {
      setMakeBidModalOpen(true)
    } else {
      setLoginModalOpen(true)
    }
  }

  return (
    <Stack
      direction={{ lg: "row", xl: "row" }}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        sm: "flex-start",
        md: "flex-start",
        lg: "center",
      }}
      spacing={3}
    >
      <MakeBidModal
        modalOpen={makeBidModalOpen}
        setModalOpen={setMakeBidModalOpen}
        questId={quest.id}
      />
      <SignInModal
        modalOpen={loginModalOpen}
        setModalOpen={setLoginModalOpen}
      />
      <Stack mb={{ xs: "2rem", sm: "2rem", md: "2rem" }}>
        <Stack spacing={2} mb="2rem">
          {bestBid ? (
            <Box
              display="flex"
              sx={{
                px: 1,
                py: 0.5,
                width: "max-content",
                backgroundColor: "primary.light",
                borderRadius: "1rem",
              }}
            >
              <Typography
                display="inline"
                variant="body2"
                sx={{
                  py: 0.5,
                  px: 1,
                  backgroundColor: "#FFFFFF",
                  color: "primary.main",
                  borderRadius: "1rem",
                }}
              >
                <Box display="inline" fontWeight={500}>
                  {bestBidder?.name.first} {bestBidder?.name.last}
                </Box>{" "}
                holds the best bid
              </Typography>
              <Typography
                variant="body2"
                display="inline"
                color="primary.main"
                sx={{ p: 0.5, ml: 1 }}
              >
                {formatBid(bestBid)}
              </Typography>
            </Box>
          ) : null}

          <Typography variant="h1">{quest?.title}</Typography>
        </Stack>
        <Typography
          variant="h6"
          sx={{
            color: "#667085",
            fontWeight: 400,
          }}
        >
          {quest?.summary}
        </Typography>
        <Stack display="flex" flexDirection="row" alignItems="center" my={3}>
          <Box pr="1rem">
            <UserAvatar storagePath={`general/${hero?.profilePicture}`} />
          </Box>
          <Stack>
            <Typography>
              {hero?.name.first} {hero?.name.last}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                size: "1rem",
                lineHeight: "1.5rem",
                color: "#667085",
              }}
            >
              {(quest?.createdAt as any)?.toDate().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <SecondaryButton label="More information" width="fit-content" />
          <PrimaryButton
            label="Place a bid"
            onClick={() => handleModalOpen()}
            width="fit-content"
          />
        </Stack>
      </Stack>
      <Stack width={{ xs: "100%", sm: "100%", md: "100%", lg: 510 }}>
        <QuestImage
          storagePath={`general/${quest?.image}`}
          alt={`${quest?.title} quest image`}
        />
      </Stack>
    </Stack>
  )
}
