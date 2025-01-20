export function extractTicketIdFromQr(qrCodeData: string): string | undefined {
  const regex = /\/checkin\/([^\\/]+)/ // Regex to capture ticketId
  const match = qrCodeData.match(regex)

  const ticketId = match?.[1] // Extract ticketId
  return ticketId
}
