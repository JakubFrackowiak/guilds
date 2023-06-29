import { AppBar, Stack, MenuItem, Typography, Slider } from "@mui/material"
import { UserMenu } from "../../components/Header/UserMenu"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { useUser } from "reactfire"
import styled from "@emotion/styled"
import { ExpandedNav } from "./ExpandedNav"
import { MainNav } from "./MainNav"

const LevelBar = styled(Slider)(() => ({
  "& .MuiSlider-thumb": {
    display: "none",
  },
  "& .MuiSlider-rail": {
    color: "#96C59E",
    width: "20px",
  },
  "& .MuiSlider-track": {
    color: "#96C59E",
    width: "20px",
  },
}))

export function SideNav(): JSX.Element {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false)
  const [mainMenuSelect, setMainMenuSelect] = useState()

  const handleMouseOver = (selection) => {
    setIsExpandedMenu(true)
    setMainMenuSelect(selection)
  }

  const handleMouseOut = () => {
    setIsExpandedMenu(null)
  }

  const { data: user } = useUser()
  {
    /*Todo - replace hardcode userLevel with user's experience level */
  }
  const userLevel = 30

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          left: 0,
          backgroundColor: "#498553",
          borderRadius: !isExpandedMenu ? "0px 25px 25px 0px" : null,
          width: "82px",
          height: "100vh",
        }}
      >
        <Stack
          direction="column"
          sx={{ marginY: "25px" }}
          flexGrow={1}
          justifyContent="space-around"
          alignItems="center"
        >
          <Image
            src="/lancr-logo.svg"
            width={36}
            height={36}
            alt="Lancr Logo"
            color={"blue"}
          />
          <Stack direction="column" flexGrow={1}>
            <MainNav handleMouseOver={handleMouseOver} />
            <LevelBar
              orientation="vertical"
              defaultValue={userLevel}
              disabled
              sx={{ marginX: "auto", marginTop: 1, marginBottom: 1 }}
            />
            <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
              {userLevel}
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
            </Stack>
          </Stack>
          <UserMenu />
        </Stack>
      </AppBar>

      {isExpandedMenu ? (
        <ExpandedNav
          mainMenuSelect={mainMenuSelect}
          user={user}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
        />
      ) : null}
    </>
  )
}
