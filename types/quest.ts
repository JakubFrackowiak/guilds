import { URL, UUID } from "./common"

export enum Tag {
  Design = "Design",
  Management = "Management",
  Research = "Research",
  Presentation = "Presentation",
  SoftwareDevelopment = "Software Development",
  CustomerSuccess = "Customer Success",
  Leadership = "Leadership",
}

export interface Quest {
  id?: UUID
  creatorId?: UUID
  reward?: string
  title?: string
  description?: string
  tags?: Tag[]
  image?: URL
  bidders?: UUID[]
  status?: string
  createdAt?: Date
  summary?: string
  level?: number
}

export interface Bid {
  id: UUID
  bidderId: UUID
  createdAt: Date
  updatedAt?: Date
  rate: "hourly" | "fixed"
  amount: number
  currency: "£" | "&" | "$"
  timeRequired: string
  workingTime: "default" | "weekdays" | "weekday evenings" | "any"
  questId: UUID
  apprentice?: string
  apprenticeRate?: number
  apprenticeCut?: number
  totalEarnigns: number
  status: string
}
