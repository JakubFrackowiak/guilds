import { Grid, Stack, Typography } from "@mui/material"
import { FeaturedCompany } from "./FeaturedCompany"

export default function FeaturedCompanies() {
  const companies = [
    { logo: "lancr-logo.svg", name: "Lancr" },
    { logo: "lancr-logo.svg", name: "Lancr" },
    { logo: "lancr-logo.svg", name: "Lancr" },
    { logo: "lancr-logo.svg", name: "Lancr" },
    { logo: "lancr-logo.svg", name: "Lancr" },
    { logo: "lancr-logo.svg", name: "Lancr" },
  ]

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      zIndex={1}
      spacing={{ xs: 4, sm: 4, md: 0 }}
      py={{ xs: 4, sm: 6, md: 8 }}
      sx={{
        bgcolor: "primary.dark",
        borderRadius: "0.8rem",
      }}
    >
      <Typography
        variant="body1"
        color="background.default"
        sx={{ opacity: 0.5 }}
        display={{ xs: "block", sm: "block", md: "none" }}
      >
        Trusted by 4000+ companies
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={6}
        sx={{
          color: "background.default",
          opacity: 0.5,
        }}
      >
        {companies.map((company, idx) => (
          <Grid item key={idx} xs={4} sm={3} md={1}>
            <FeaturedCompany image={company.logo} name={company.name} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
