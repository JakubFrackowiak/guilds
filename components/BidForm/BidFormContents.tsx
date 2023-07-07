import {
  Divider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"

export function BidFormContents({ values, setFieldValue, selectedApprentice }) {
  const [workingTime, setWorkingTime] = useState("default")

  useEffect(() => {
    calculateApprenticeCut(values, setFieldValue)
    calculateTotalEarnings(values, setFieldValue)
  }, [values.rate, values.amount, values.timeRequired])

  const calculateAmount = (values) => {
    const { rate, timeRequired, amount } = values
    if (rate == "hourly") {
      return timeRequired * amount
    } else {
      return amount
    }
  }

  const calculateApprenticeCut = (values, setFieldValue) => {
    const { amount, apprenticeRate } = values
    if (amount == 0) return "Enter information above"
    const calculatedAmount = calculateAmount(values)
    const calculatedApprenticeCut = calculatedAmount * apprenticeRate
    setFieldValue("apprenticeCut", calculatedApprenticeCut)
  }

  const calculateTotalEarnings = (values, setFieldValue) => {
    const { amount, apprenticeRate } = values
    if (amount == 0) return "Enter information above"
    const calculatedAmount = calculateAmount(values)
    const calculatedTotalEarnings =
      calculatedAmount - calculatedAmount * apprenticeRate
    setFieldValue("totalEarnings", calculatedTotalEarnings)
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2">Payment type</Typography>
        <ToggleButtonGroup
          value={values.rate}
          exclusive
          size="medium"
          aria-label="rate-choose"
          color="primary"
        >
          <ToggleButton
            value="hourly"
            aria-label="pound"
            onClick={() => setFieldValue("rate", "hourly")}
          >
            Hourly
          </ToggleButton>
          <ToggleButton
            value="fixed"
            aria-label="percentage"
            onClick={() => setFieldValue("rate", "fixed")}
          >
            Fixed rate
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ToggleButtonGroup
          value={values.currency}
          exclusive
          size="medium"
          aria-label="unit-choose"
          color="primary"
        >
          <ToggleButton
            value="£"
            aria-label="pound"
            onClick={() => setFieldValue("currency", "£")}
          >
            £
          </ToggleButton>
          <ToggleButton
            value="%"
            aria-label="percentage"
            onClick={() => setFieldValue("currency", "%")}
          >
            %
          </ToggleButton>
          <ToggleButton
            value="$"
            aria-label="dollar"
            onClick={() => setFieldValue("currency", "$")}
          >
            $
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          size="small"
          type="number"
          sx={{ width: "50%" }}
          placeholder={`${values.rate} rate`}
          value={values.amount}
          onChange={(e) => setFieldValue("amount", e.target.value)}
        />
      </Stack>
      <Divider />
      {values.rate == "hourly" ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" noWrap>
              Estimated time required (in hours)
            </Typography>
            <TextField
              placeholder="time required"
              type="number"
              sx={{ width: "50%" }}
              value={values.timeRequired}
              onChange={(e) => setFieldValue("timeRequired", e.target.value)}
              size="small"
            />
          </Stack>
          <Divider />
        </>
      ) : null}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2">Available working times</Typography>
        <ToggleButtonGroup
          value={workingTime}
          exclusive
          size="medium"
          aria-label="working-time-choose"
          color="primary"
        >
          <ToggleButton
            value="Default"
            aria-label="default"
            onClick={() => {
              setWorkingTime("Default")
              setFieldValue("workingTime", "Default")
            }}
          >
            Default
          </ToggleButton>
          <ToggleButton
            value="custom"
            aria-label="custom"
            onClick={() => setWorkingTime("custom")}
          >
            Custom
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {workingTime == "custom" ? (
        <ToggleButtonGroup
          value={values.workingTime}
          exclusive
          size="medium"
          aria-label="working-time-choose"
          color="primary"
          sx={{ alignSelf: "flex-end" }}
        >
          <ToggleButton
            value="Weekdays"
            aria-label="weekdays"
            onClick={() => setFieldValue("workingTime", "Weekdays")}
          >
            Weekdays
          </ToggleButton>
          <ToggleButton
            value="Weekday evenings"
            aria-label="weekday-evening-only"
            onClick={() => setFieldValue("workingTime", "Weekday evenings")}
          >
            Weekday evenings
          </ToggleButton>
          <ToggleButton
            value="Weekends"
            aria-label="weekends"
            onClick={() => setFieldValue("workingTime", "Weekends")}
          >
            Weekends
          </ToggleButton>
          <ToggleButton
            sx={{ textDecoration: "none" }}
            value="Any"
            aria-label="any"
            onClick={() => setFieldValue("workingTime", "Any")}
          >
            Any
          </ToggleButton>
        </ToggleButtonGroup>
      ) : null}
      <Divider />
      {selectedApprentice ? (
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Apprentice rate</Typography>
            <Typography variant="body2">
              {values.apprenticeRate * 100 + "%"}
            </Typography>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Apprentice cut</Typography>
            <Typography variant="body2">
              {values.currency == "%"
                ? values.apprenticeCut + values.currency
                : values.currency + values.apprenticeCut}
            </Typography>
          </Stack>
          <Divider />
        </Stack>
      ) : null}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2">Estimate total earnings</Typography>
        <Typography variant="body2">
          {values.currency == "%"
            ? values.totalEarnings + values.currency
            : values.currency + values.totalEarnings}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  )
}
