import React, { useState, useEffect } from "react"
import {
  Container,
  Box,
  Typography,
  TextField,
  Divider,
  Grid,
  Button,
} from "@mui/material"
import { useSigninCheck, useUser } from "reactfire"
import { CountrySelect } from "../components/CountrySelectDropdown"
import { useFirestoreDocData, useFirestore } from "reactfire"
import { doc, updateDoc } from "firebase/firestore"
import { SideNav } from "../components/SideNav"
import { Hero } from "types/hero"
import { useRouter } from "next/router"

export default function TaxInfoPage() {
  const { data: user } = useUser()
  const firestore = useFirestore()
  const heroRef = doc(firestore, `heroes/${user?.uid}`)
  const { status: heroStatus, data: hero } = useFirestoreDocData(heroRef)
  const router = useRouter()
  const { data: signInCheckResult } = useSigninCheck()

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postcode, setPostcode] = useState("")
  const [country, setCountry] = useState("")

  useEffect(() => {
    if (signInCheckResult?.signedIn === false) {
      router.push("/login")
    }
  })

  useEffect(() => {
    if (heroStatus == "success") {
      if (hero.location?.city) {
        setCity(hero.location.city)
      }
      if (hero.location?.postcode) {
        setPostcode(hero.location.postcode)
      }
      if (hero.location?.address) {
        setAddress(hero.location.address)
      }
      if (hero.location?.country) {
        setCountry(hero.location.country)
      }
    }
  }, [heroStatus])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(heroRef, {
        location: {
          city: city,
          country: country,
          address: address,
          postcode: postcode,
        },
      })
      alert("Tax info saved")
    } catch (error) {
      alert("Error: " + error)
    }
  }

  const handleCountrySelect = (e) => {
    setCountry(e)
  }

  return (
    <>
      {signInCheckResult?.signedIn ? (
        <Box>
          <SideNav hero={hero as Hero} />
          <Container
            disableGutters
            sx={{
              paddingLeft: "150px",
              paddingRight: "20px",
              paddingTop: "40px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "30px",
                lineHeight: "38px",
                color: "#101828",
              }}
            >
              Tax Info
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "400",
                color: "#667085",
                marginTop: "6px",
              }}
            >
              This information will appear on invoices sent to clients
            </Typography>
            <Divider
              sx={{ marginTop: "20px", marginBottom: "30px" }}
              orientation="horizontal"
              flexItem
            />
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmit(e)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                    >
                      Email address
                    </Typography>
                    <Typography
                      sx={{
                        color: "#667085",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      You can change this in settings
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    value={user?.email}
                    disabled
                    sx={{ paddingRight: 10 }}
                  />
                </Grid>
                <Divider
                  sx={{ marginTop: "20px", width: "100%" }}
                  orientation="horizontal"
                  flexItem
                />
                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                    }}
                  >
                    Street address
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="address"
                    type="text"
                    id="address"
                    sx={{ paddingRight: 10 }}
                  />
                </Grid>
                <Divider
                  sx={{ marginTop: "20px", width: "100%" }}
                  orientation="horizontal"
                  flexItem
                />
                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                    }}
                  >
                    City
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    name="city"
                    placeholder="city"
                    type="city"
                    id="city"
                    sx={{ paddingRight: 10 }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Divider
                  sx={{ marginTop: "20px", width: "100%" }}
                  orientation="horizontal"
                  flexItem
                />
                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                    }}
                  >
                    Postcode
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    size="small"
                    name="postcode"
                    placeholder="postcode"
                    type="postcode"
                    id="postcode"
                    sx={{ paddingRight: 10 }}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </Grid>
                <Divider
                  sx={{ marginTop: "20px", width: "100%" }}
                  orientation="horizontal"
                  flexItem
                />
                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                    }}
                  >
                    Country
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CountrySelect
                    handleCountrySelect={handleCountrySelect}
                    country={country}
                  />
                </Grid>
              </Grid>

              {address.length == 0 ||
              city.length == 0 ||
              country.length == 0 ||
              postcode.length == 0 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: 3,
                    "&.Mui-disabled": {
                      background: "#A3CCAA",
                      color: "white",
                      textTransform: "none",
                    },
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, textTransform: "none", borderRadius: 3 }}
                >
                  Save
                </Button>
              )}
            </Box>
          </Container>
        </Box>
      ) : null}
    </>
  )
}
