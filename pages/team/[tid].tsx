import { Container, Box, CircularProgress } from "@mui/material"
import { Header } from "../../components/Header"
import { BackToSearch } from "../../components/BackToSearch"
import { Footer } from "../../components/Footer"
import {
  useFirestoreDocData,
  useFirestoreCollectionData,
  useFirestore,
} from "reactfire"
import { doc, collection, query } from "firebase/firestore"
import { CaseStudy } from "../../components/CaseStudy"
import { useRouter } from "next/router"
import { IndividualTeamBanner } from "../../components/IndividualTeamBanner"
import { AboutTeam } from "../../components/AboutTeam"
import { Slider } from "../../components/Slider"
import { Hero } from "types/hero"

export default function Team() {
  const router = useRouter()
  const { tid } = router.query

  const firestore = useFirestore()

  const teamRef = doc(firestore, `teams/${tid}`)
  const { data: team } = useFirestoreDocData(teamRef)

  const heroRef = doc(firestore, `heroes/${team?.creatorId}`)
  const { data: hero } = useFirestoreDocData(heroRef)

  const rolesQuery = query(collection(firestore, `teams/${tid}/roles`))
  const { data: roles } = useFirestoreCollectionData(rolesQuery)

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
        {team && hero ? (
          <>
            <Box my="5rem">
              <IndividualTeamBanner hero={hero as Hero} team={team} />
            </Box>
            <Box my="7rem">
              <AboutTeam team={team as Hero} />
            </Box>
            <Box my="10rem">
              <CaseStudy type="team" hero={hero as Hero} />
            </Box>
            <Box my="10rem">
              <Slider
                variant="role"
                status="success"
                items={roles}
                variantId={team?.id}
              />
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
