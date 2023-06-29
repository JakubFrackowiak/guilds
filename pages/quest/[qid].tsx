import { Container, Box, CircularProgress } from "@mui/material"
import { Header } from "../../components/Header"
import { BackToSearch } from "../../components/BackToSearch"
import { Footer } from "../../components/Footer"
import { CurrentBids } from "../../components/CurrentBids"
import { IndividualQuestBanner } from "../../components/IndividualQuestBanner"
import { useFirestoreDocData, useFirestore } from "reactfire"
import { doc } from "firebase/firestore"
import { AboutGig } from "../../components/AboutGig"
import { CaseStudy } from "../../components/CaseStudy"
import { useRouter } from "next/router"
import { Hero } from "types/hero"

export default function Quest() {
  const router = useRouter()
  const { qid } = router.query

  const firestore = useFirestore()
  const questRef = doc(firestore, `quests/${qid}`)

  const { data: quest } = useFirestoreDocData(questRef)
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
      <Header />
      <Container>
        {quest && hero ? (
          <>
            <Box my="5rem">
              <IndividualQuestBanner hero={hero as Hero} quest={quest} />
            </Box>
            <Box my="7rem">
              <AboutGig quest={quest} />
            </Box>
            <Box my="10rem">
              <CaseStudy type="quest" hero={hero as Hero} />
            </Box>
            <Box my="10rem">
              <CurrentBids quest={quest} path={`quests/${quest.id}/bids`} />
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
