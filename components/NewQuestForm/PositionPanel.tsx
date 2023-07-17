import { Box, Divider, Stack, Typography } from "@mui/material"
import { FormField } from "components/FormField"
import { FormInputLabel } from "components/FormInputLabel"
import { FormAutocomplete } from "components/FormAutocomplete"
import { FormSwitch } from "components/FormSwitch"
import { FormCheckboxList } from "components/FormCheckboxList"
import { useState } from "react"
import { FormValues, SetFieldValue } from "pages/new-quest"
import { FormChips } from "components/FormChips"

const jobTypes = [
  {
    label: "UX design",
  },
  {
    label: "Interaction design",
  },
  {
    label: "Prototyping",
  },
  {
    label: "Visual design",
  },
  {
    label: "User research",
  },
  {
    label: "Information architecture",
  },
  {
    label: "User testing",
  },
  {
    label: "Usability testing",
  },
  {
    label: "Wireframing",
  },
]

const skills = [
  { label: "HTML5" },
  { label: "CSS3" },
  { label: "JavaScript" },
  { label: "React" },
  { label: "Angular" },
  { label: "Vue.js" },
  { label: "Node.js" },
  { label: "Express.js" },
  { label: "MongoDB" },
  { label: "SQL" },
  { label: "Python" },
  { label: "Java" },
  { label: "C#" },
  { label: "Ruby" },
  { label: "Git" },
  { label: "Responsive Web Design" },
  { label: "UI/UX Design" },
  { label: "Wireframing" },
  { label: "Prototyping" },
  { label: "User Research" },
]

const popSkills = ["HTML5", "CSS3", "JavaScript"]

const timeZones = [
  { label: "UTC -12 Hours" },
  { label: "UTC -11 Hours" },
  { label: "UTC -10 Hours" },
  { label: "UTC -9 Hours" },
  { label: "UTC -8 Hours" },
  { label: "UTC -7 Hours" },
  { label: "UTC -6 Hours" },
  { label: "UTC -5 Hours" },
  { label: "UTC -4 Hours" },
  { label: "UTC -3 Hours" },
  { label: "UTC -2 Hours" },
  { label: "UTC -1 Hours" },
  { label: "UTC +0 Hours" },
  { label: "UTC +1 Hours" },
  { label: "UTC +2 Hours" },
  { label: "UTC +3 Hours" },
  { label: "UTC +4 Hours" },
  { label: "UTC +5 Hours" },
  { label: "UTC +6 Hours" },
  { label: "UTC +7 Hours" },
  { label: "UTC +8 Hours" },
  { label: "UTC +9 Hours" },
  { label: "UTC +10 Hours" },
  { label: "UTC +11 Hours" },
  { label: "UTC +12 Hours" },
]

const hoursDifference = [
  { label: "0 Hours" },
  { label: "1 Hour" },
  { label: "2 Hours" },
  { label: "3 Hours" },
  { label: "4 Hours" },
  { label: "5 Hours" },
  { label: "6 Hours" },
]

interface PositionPanelProps {
  values: FormValues
  setFieldValue: SetFieldValue
}

export function PositionPanel({ values, setFieldValue }: PositionPanelProps) {
  const [popularSkills, setPopularSkills] = useState(popSkills)

  return (
    <Stack spacing={3}>
      <Stack>
        <FormInputLabel
          label="Position information"
          subLabel="We'll need to collect some information from you."
          variant="header"
        />
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Job Title"
          subLabel="Enter your desired job title here."
        />
        <FormField
          placeholder="Job Title"
          value={values.jobTitle}
          name="jobTitle"
          setFieldValue={setFieldValue}
        />
      </Stack>
      <Stack direction="row">
        <FormInputLabel
          label="What kind of work is being done?"
          subLabel="Add your logo to reports and emails."
        />
        <FormCheckboxList
          value={values.workTypes}
          name="workTypes"
          setFieldValue={setFieldValue}
        />
      </Stack>
      <Box pl="22rem">
        <FormAutocomplete
          options={jobTypes}
          placeholder="Work Types"
          setFieldValue={setFieldValue}
          name="workTypes"
          value={values.workTypes}
        />
      </Box>
      <Divider />
      <Stack direction="row" width="fit-content">
        <FormInputLabel
          label="Skills Desired"
          subLabel="Search for skills and add them to your quest."
        />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <FormAutocomplete
              options={skills}
              placeholder="Skills"
              setFieldValue={setFieldValue}
              name="skills"
              value={values.skills}
            />
            <FormChips
              chips={values.skills}
              value={values.skills}
              name="skills"
              setFieldValue={setFieldValue}
              variant="delete"
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="formBody">Popular Skills</Typography>
            <FormChips
              value={values.skills}
              chips={popularSkills}
              name="skills"
              setFieldValue={setFieldValue}
              variant="add"
            />
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row">
        <FormInputLabel
          label="Timezone"
          subLabel="Select your desired timezone."
        />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <FormAutocomplete
              options={timeZones}
              placeholder="Timezone"
              setFieldValue={setFieldValue}
              name="timezones"
              value={values.timezones}
            />
            <FormChips
              value={values.timezones}
              chips={values.timezones}
              name="timezones"
              setFieldValue={setFieldValue}
              variant="delete"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="formBody">
              Do you need people to be in your timezone?
            </Typography>
            <FormSwitch
              value={values.isYourTimezone}
              onChange={() =>
                setFieldValue("isYourTimezone", !values.isYourTimezone)
              }
            />
            <Typography variant="formBody">
              {values.isYourTimezone ? "No" : "Yes"}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="formBody">
              How many hours difference can you work with?
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="formBody">+/-</Typography>
              <FormAutocomplete
                options={hoursDifference}
                placeholder="Hours Difference"
                setFieldValue={setFieldValue}
                name="hoursDifference"
                value={values.hoursDifference}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
