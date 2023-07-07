import { Container, Box, CircularProgress, Typography } from "@mui/material"
import { Header } from "../../components/Header"
import { BackToSearch } from "../../components/BackToSearch"
import { Footer } from "../../components/Footer"
import { CurrentBids } from "../../components/CurrentBids"
import { IndividualQuestBanner } from "../../components/IndividualQuestBanner"
import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
  useUser,
} from "reactfire"
import { collection, doc, limit, orderBy, query } from "firebase/firestore"
import { AboutGig } from "../../components/AboutGig"
import { CaseStudy } from "../../components/CaseStudy"
import { useRouter } from "next/router"
import { Hero } from "types/hero"
import { Bid, Quest } from "types/quest"
import { SideNav } from "components/SideNav"

export default function Quest() {
  const router = useRouter()
  const { qid } = router.query
  const { data: user } = useUser()

  const firestore = useFirestore()
  const questRef = doc(firestore, `quests/${qid}`)
  const { data: quest } = useFirestoreDocData(questRef)

  const bidsRef = collection(firestore, `quests/${qid}/bids` || "")
  const bidsQuery = query(bidsRef, limit(6), orderBy("totalBidValue", "asc"))
  const { status, data: bids } = useFirestoreCollectionData(bidsQuery)
  const bestBid = bids && bids.length > 0 ? bids[0] : null

  const heroRef = doc(firestore, `heroes/${quest?.creatorId}`)
  const { data: hero } = useFirestoreDocData(heroRef)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav /> : <Header />}
      <Container>
        {quest && hero ? (
          <>
            <Box my="5rem">
              <IndividualQuestBanner
                hero={hero as Hero}
                bestBid={bestBid as Bid}
                quest={quest as Quest}
              />
            </Box>
            <Box my="7rem">
              <AboutGig quest={quest} />
            </Box>
            <Box my="10rem">
              <CaseStudy type="quest" hero={hero as Hero} />
            </Box>
            <Box my="10rem">
              <CurrentBids quest={quest} bids={bids as Bid[]} />
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}
        <Box my="5rem">
          <BackToSearch />
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
