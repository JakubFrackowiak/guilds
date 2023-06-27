import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { RefinementSelect } from "./RefinementSelect"
import { HoursSlider } from "./HoursSlider"
import { useState } from "react"
import { RangeInput } from "./RangeInput"

export function ApprenticeFilters({ showFilters }) {
  const [accordion, setAccordion] = useState("")
  const handleChange = (selectedAccordion) => {
    setAccordion(accordion == selectedAccordion ? "" : selectedAccordion)
  }
  return (
    <Collapse in={showFilters}>
      <Stack spacing={2}>
        <Stack>
          <Accordion
            expanded={accordion == "country"}
            onChange={() => handleChange("country")}
          >
            <AccordionSummary>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Country
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider orientation="horizontal" sx={{ mb: "1rem" }} />
              <RefinementSelect attribute="location.country" />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={accordion == "level"}
            onChange={() => handleChange("level")}
          >
            <AccordionSummary>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Level
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider orientation="horizontal" sx={{ mb: "1.5rem" }} />
              <RangeInput
                attribute="level"
                label="Level"
                step={1}
                variant="level"
                min={0}
                max={10}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={accordion == "rating"}
            onChange={() => handleChange("rating")}
          >
            <AccordionSummary>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Rating
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider orientation="horizontal" sx={{ mb: "1.5rem" }} />
              <RangeInput
                attribute="rating"
                label="Rating"
                step={0.2}
                variant="rating"
                min={0}
                max={5}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={accordion == "rate"}
            onChange={() => handleChange("rate")}
          >
            <AccordionSummary>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Rate
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider orientation="horizontal" sx={{ mb: "1.5rem" }} />
              <RangeInput
                attribute="apprentice.rate"
                label="Rate"
                step={0.1}
                variant="rate"
                min={0}
                max={1}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={accordion == "hours"}
            onChange={() => handleChange("hours")}
          >
            <AccordionSummary>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Working hours
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider orientation="horizontal" sx={{ mb: "1.5rem" }} />
              <HoursSlider step={1} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Collapse>
  )
}
