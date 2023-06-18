import { Container, Stack, useMediaQuery, useTheme } from "@mui/material"
import { GetItDoneHeading } from "./GetItDoneHeading"
import { GetItDonePhotos } from "./GetItDonePhotos"

export function GetItDone() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Container>
      <Stack
        spacing={isMobile ? 10 : 0}
        py="3rem"
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="center"
      >
        <GetItDoneHeading />
        <GetItDonePhotos />
      </Stack>
    </Container>
  )
}
