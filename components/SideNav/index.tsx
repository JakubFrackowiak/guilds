import { AppBar, Stack, MenuItem, Typography, Slider, Box } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  StorageImage,
  useFirestore,
  useFirestoreDocData,
  useUser,
} from "reactfire"
import { ExpandedNav } from "./ExpandedNav"
import { MainNav } from "./MainNav"
import { Hero } from "types/hero"
import styled from "@emotion/styled"
import { doc } from "firebase/firestore"
import { motion } from "framer-motion"

const UserAvatar = styled(StorageImage)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`

export function SideNav(): JSX.Element {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false)
  const [mainMenuSelect, setMainMenuSelect] = useState()

  const { data: user } = useUser()
  const firestore = useFirestore()

  const heroRef = doc(firestore, `heroes/${user?.uid}`)
  const { data: hero } = useFirestoreDocData(heroRef)

  const handleMouseOver = (selection) => {
    setIsExpandedMenu(true)
    setMainMenuSelect(selection)
  }

  const handleMouseOut = () => {
    setIsExpandedMenu(null)
  }

  {
    /*Todo - replace hardcode userLevel with user's experience level */
  }
  const userLevel = 30

  return (
    <Box onMouseLeave={handleMouseOut} position="relative">
      <AppBar
        position="fixed"
        sx={{
          left: 0,
          backgroundColor: "button.primaryHover",
          borderRadius: "0px 25px 25px 0px",
          width: "5.2rem",
          height: "100vh",
          zIndex: 99,
        }}
      >
        <Stack
          direction="column"
          sx={{ marginY: "25px" }}
          flexGrow={1}
          justifyContent="space-around"
          alignItems="center"
        >
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Image
              src="/lancr-logo.svg"
              width={50}
              height={50}
              alt="Lancr Logo"
              color={"blue"}
            />
          </Link>
          <Stack direction="column" flexGrow={1}>
            <MainNav handleMouseOver={handleMouseOver} />
            <Slider
              orientation="vertical"
              defaultValue={userLevel}
              disabled
              sx={{
                marginX: "auto",
                marginTop: 1,
                marginBottom: 1,
                "& .MuiSlider-thumb": {
                  display: "none",
                },
                "& .MuiSlider-rail": {
                  color: "primary.light",
                  width: "20px",
                },
                "& .MuiSlider-track": {
                  color: "primary.light",
                  width: "20px",
                },
              }}
            />
            <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
              {hero?.level}
            </Typography>
            <Stack>
              <MenuItem
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link
                  href={"/profile"}
                  style={{ textDecoration: "none", height: 20, width: 20 }}
                >
                  <Image
                    height={20}
                    width={20}
                    color="white"
                    alt="notifications"
                    src="/sidenav/notificationNav.svg"
                  />
                </Link>
              </MenuItem>
              <MenuItem
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link
                  href={"/settings"}
                  style={{ textDecoration: "none", height: 20, width: 20 }}
                >
                  <Image
                    height={22}
                    width={22}
                    color="white"
                    alt="settings"
                    src="/sidenav/settingsNav.svg"
                  />
                </Link>
              </MenuItem>
              <MenuItem
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {hero ? (
                  <UserAvatar
                    alt="hero image"
                    storagePath={`general/${hero?.profilePicture}`}
                  />
                ) : null}
              </MenuItem>
            </Stack>
          </Stack>
        </Stack>
      </AppBar>
      <Box position="fixed" zIndex={5}>
        <motion.div
          animate={{ x: isExpandedMenu ? 0 : -400 }}
          transition={{ ease: "linear", duration: 0.25 }}
        >
          <ExpandedNav mainMenuSelect={mainMenuSelect} hero={hero as Hero} />
        </motion.div>
      </Box>
    </Box>
  )
}
