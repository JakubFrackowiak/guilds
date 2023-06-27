import { Formik, Form, FormikProps } from "formik"
import { Stack, TextField } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"

interface FormValues {
  email: string
}

export function Subscribe() {
  const handleSubmit = (values: FormValues) => {
    alert("subscribed: " + values.email)
  }
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values: FormValues) => handleSubmit(values)}
    >
      {({ handleSubmit, handleChange, values }: FormikProps<FormValues>) => (
        <Form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={3} height="3rem">
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              value={values.email}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "17rem",
                  backgroundColor: "background.default",
                  height: "100%",
                  borderRadius: "0.5rem",
                },
                "& .MuiOutlinedInput-input": { padding: "0.5rem 1rem" },
              }}
            />
            <PrimaryButton
              label="Subscribe"
              width="fit-content"
              type="submit"
            />
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
