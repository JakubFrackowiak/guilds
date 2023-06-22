import { Typography } from "@mui/material"
import { collection, limit, query, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { Hero } from "types/hero"
import { FeaturedApprentice } from "./FeaturedApprentice"

interface FeaturedApprenticesProps {
  selectedApprentice: string
  setSelectedApprentice: (value: string) => void
}

export function FeaturedApprentices({
  selectedApprentice,
  setSelectedApprentice,
}: FeaturedApprenticesProps) {
  const firestore = useFirestore()
  const { data: user } = useUser()
  const apprenticesRef = collection(firestore, "heroes")
  const apprenticesQuery = query(
    apprenticesRef,
    where("apprentice.favoriteTo", "array-contains", user?.uid || ""),
    limit(5)
  )
  const { data: apprentices, status: apprenticesStatus } =
    useFirestoreCollectionData(apprenticesQuery)

  return (
    <>
      {apprenticesStatus == "success" ? (
        apprentices?.map((apprentice: Hero, index) => (
          <FeaturedApprentice
            key={index}
            apprentice={apprentice}
            selectedApprentice={selectedApprentice}
            setSelectedApprentice={setSelectedApprentice}
          />
        ))
      ) : (
        <Typography
          height="5rem"
          textAlign="center"
          sx={{ lineHeight: "5rem" }}
        >
          loading...
        </Typography>
      )}
    </>
  )
}
