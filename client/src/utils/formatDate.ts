export function formatDate(date: string): string {
  return new Date(date).toLocaleString('en-US')
}
