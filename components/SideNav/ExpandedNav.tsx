import { MenuItem, Stack, AppBar, Typography } from "@mui/material"
import { sidebar } from "../../navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "reactfire"
import { Hero } from "types/hero"

interface ExpandedNavProps {
  hero: Hero
  mainMenuSelect: any
}

export const ExpandedNav = ({ mainMenuSelect, hero }: ExpandedNavProps) => {
  const auth = useAuth()

  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "primary.dark",
        left: 0,
        borderRadius: "0px 25px 25px 0px",
        width: "400px",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          marginLeft: "100px",
          marginTop: "30px",
          flex: 1,
          pr: 5,
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>
          {mainMenuSelect ? sidebar[mainMenuSelect].title : null}
        </Typography>
        {mainMenuSelect
          ? sidebar[mainMenuSelect].navigationItem?.map((page) => (
              <MenuItem
                key={page.title}
                style={{
                  marginTop: 5,
                  width: "100%",
                  height: 45,
                  borderRadius: 4,
                }}
              >
                <Link
                  href={page.href}
                  style={{ textDecoration: "none", height: 20 }}
                >
                  <Stack flexDirection="row">
                    <Image
                      height={20}
                      width={20}
                      src={page.image}
                      alt={page.title}
                    />
                    <Typography
                      sx={{ marginLeft: "9px", fontWeight: 500 }}
                      color="white"
                    >
                      {page.title}
                    </Typography>
                  </Stack>
                </Link>
              </MenuItem>
            ))
          : null}
        <Stack sx={{ marginTop: "auto", marginBottom: "28px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ fontWeight: 500 }}>
              {hero?.name.first + " " + hero?.name.last}
            </Typography>
            <Link
              href={"#"}
              style={{ textDecoration: "none", height: 20, width: 20 }}
              onClick={() => auth.signOut()}
            >
              <Image
                height={20}
                width={20}
                src={"/sidenav/logout.svg"}
                alt={"logout"}
              />
            </Link>
          </Stack>
          <Typography sx={{ color: "primary.light" }}>{hero?.email}</Typography>
        </Stack>
      </Stack>
    </AppBar>
  )
}
