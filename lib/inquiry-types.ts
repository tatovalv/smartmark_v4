export const INQUIRY_STATUSES = ["unread", "read", "replied"] as const
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number]

export type Inquiry = {
  id: string
  createdAt: string
  status: InquiryStatus
  locale: string
  name: string
  company: string
  email: string
  phone: string
  contactMethod: string
  country: string
  service: string
  message: string
}
