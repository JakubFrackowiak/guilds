import Image from "next/image"
import { Box, Stack, Typography } from "@mui/material"

interface FeaturedCompanyProps {
  image: string
  name: string
}

export function FeaturedCompany({ image, name }: FeaturedCompanyProps) {
  return (
    <Stack
      width="fit-content"
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      margin="auto"
    >
      <Box width={50} height={50}>
        <Image src={image} width={50} height={50} alt="Featured Company" />
      </Box>
      <Typography variant="h5" color="primary.light">
        {name}
      </Typography>
    </Stack>
  )
}
