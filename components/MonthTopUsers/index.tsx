import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, limit, query, where } from "firebase/firestore"
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material"
import { TopUsersHeader, TopUsersHeaderProps } from "./TopUsersHeader"
import { User } from "./User"
import { Hero } from "types/hero"

interface TopMonthUserProps extends TopUsersHeaderProps {
  xpGained: number
}

export function MonthTopUsers({
  info,
  header,
  subheader,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonLink,
  xpGained,
}: TopMonthUserProps) {
  const firestore = useFirestore()
  const heroesRef = collection(firestore, "heroes")
  const heroesQuery = query(
    heroesRef,
    limit(6),
    where("isVerified", "==", true)
  )
  const { data } = useFirestoreCollectionData(heroesQuery)
  const heroes = data as Hero[]
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Stack direction={isMobile ? "column" : "row"} spacing={10}>
      <TopUsersHeader
        info={info}
        header={header}
        subheader={subheader}
        primaryButtonText={primaryButtonText}
        primaryButtonLink={primaryButtonLink}
        secondaryButtonLink={secondaryButtonLink}
      />
      <Grid container>
        {heroes?.map((hero, key) => (
          <Grid item xs={6} sm={6} md={6} lg={4} xl={4} key={key}>
            <User hero={hero} xpGained={xpGained} key={key} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
