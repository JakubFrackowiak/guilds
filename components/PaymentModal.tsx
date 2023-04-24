import styled from "@emotion/styled"
import React, { useState } from "react"
import { useSigninCheck } from "reactfire"
import Image from "next/image"
import { useTheme } from "@mui/material/styles"
import {
  Stack,
  Box,
  Typography,
  Grid,
  Divider,
  Backdrop,
  Container,
  TextField,
  Button,
  Fade,
  useMediaQuery,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"

const Heading = styled(Typography)({
  color: "#101828",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 500,
  marginTop: 5,
  marginBottom: 5,
})

const SubHeading = styled(Typography)({
  color: "#667085",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 400,
})

const CloseIcon = styled(Image)({
  position: "absolute",
  right: 0,
  top: 0,
  margin: 40,
})

export function PaymentModal(): JSX.Element {
  const [rate, setRate] = useState("hourly")
  const [unit, setUnit] = useState("£")
  const [workingTimes, setWorkingTimes] = useState("default")
  const [hours, setHours] = useState("")
  const [amount, setAmount] = useState("")

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("md"))

  const { status, data: signInCheckResult } = useSigninCheck()

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmall ? null : 800,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  }

  const handleUnit = (
    event: React.MouseEvent<HTMLElement>,
    newUnit: string | null
  ) => {
    setUnit(newUnit)
  }

  const handleRate = (
    event: React.MouseEvent<HTMLElement>,
    newRate: string | null
  ) => {
    setRate(newRate)
  }

  const handleWorkingTimes = (
    event: React.MouseEvent<HTMLElement>,
    newWorkingTimes: string | null
  ) => {
    setWorkingTimes(newWorkingTimes)
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (status == "success") {
    return (
      <>
        <Container disableGutters>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleOpen}
          >
            Make or amend payment
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Grid container spacing={2}>
                  <Grid item justifyContent="center" xs={12}>
                    <Stack
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          backgroundColor: "#D1FADF",
                          width: "48px",
                          height: "48px",
                          borderRadius: "28px",
                        }}
                      >
                        {" "}
                        <Image
                          src="/cash.svg"
                          width={22}
                          height={22}
                          alt="close"
                        />
                      </Box>

                      <CloseIcon
                        src="/x.svg"
                        width={10}
                        height={10}
                        alt="close"
                        onClick={() => handleClose()}
                      />
                    </Stack>
                    <Stack display="flex" alignItems="center">
                      <Heading>Payment</Heading>
                      <SubHeading>Amend your payment projections</SubHeading>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ padding: 3 }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2">Payment type</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <ToggleButtonGroup
                            value={rate}
                            exclusive
                            size="medium"
                            onChange={handleRate}
                            aria-label="rate-choose"
                            color="primary"
                          >
                            <ToggleButton value="hourly" aria-label="pound">
                              Hourly
                            </ToggleButton>
                            <ToggleButton value="fixed" aria-label="percentage">
                              Fixed rate
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ padding: 3 }}
                    >
                      <Grid item xs={4}>
                        <ToggleButtonGroup
                          value={unit}
                          exclusive
                          size="medium"
                          onChange={handleUnit}
                          aria-label="unit-choose"
                          color="primary"
                        >
                          <ToggleButton value="£" aria-label="pound">
                            £
                          </ToggleButton>
                          <ToggleButton value="%" aria-label="percentage">
                            %
                          </ToggleButton>
                          <ToggleButton value="$" aria-label="dollar">
                            $
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          size="small"
                          fullWidth
                          placeholder={`${rate} rate`}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ padding: 3 }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          Estimated time required
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          placeholder="time required"
                          value={hours}
                          fullWidth
                          size="small"
                          onChange={(e) => setHours(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ paddingLeft: 3, paddingTop: 3, paddingBottom: 3 }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          Available working times
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <ToggleButtonGroup
                            value={workingTimes}
                            exclusive
                            size="medium"
                            onChange={handleWorkingTimes}
                            aria-label="working-time-choose"
                            color="primary"
                            sx={{ marginRight: 2 }}
                          >
                            <ToggleButton value="default" aria-label="default">
                              Default
                            </ToggleButton>
                            <ToggleButton value="custom" aria-label="custom">
                              Custom
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      {workingTimes == "custom" ? (
                        <ToggleButtonGroup
                          value={workingTimes}
                          exclusive
                          size="large"
                          onChange={handleWorkingTimes}
                          aria-label="working-time-choose"
                          color="primary"
                          sx={{
                            marginLeft: "auto",
                            marginBottom: 2,
                            marginRight: 2,
                          }}
                        >
                          <ToggleButton value="Weekdays" aria-label="weekdays">
                            Weekdays
                          </ToggleButton>
                          <ToggleButton
                            value="Weekdays(evenings only)"
                            aria-label="weekday-evening-only"
                          >
                            Weekday evenings
                          </ToggleButton>
                          <ToggleButton value="Weekends" aria-label="weekends">
                            Weekends
                          </ToggleButton>
                          <ToggleButton
                            sx={{ textDecoration: "none" }}
                            value="Any"
                            aria-label="any"
                          >
                            <Typography sx={{ textDecoration: "none" }}>
                              Any
                            </Typography>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      ) : null}
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ padding: 3 }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2">Apprentice rate</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box display="flex" justifyContent="flex-end">
                          <Typography variant="body2">10%</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ padding: 3 }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2">Apprentice cut</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box display="flex" justifyContent="flex-end">
                          <Typography variant="body2">
                            Enter information above
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      container
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ padding: 3 }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          Estimate total earnings
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box display="flex" justifyContent="flex-end">
                          <Typography variant="body2">
                            Enter information above
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ margin: 2, marginTop: 3 }}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          textTransform: "none",
                          marginRight: 2,
                          borderRadius: 2,
                        }}
                        onClick={() => handleClose()}
                      >
                        Go back
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          textTransform: "none",
                          marginRight: 2,
                          borderRadius: 2,
                        }}
                      >
                        Confirm and send bid
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Modal>
        </Container>
      </>
    )
  }
}
