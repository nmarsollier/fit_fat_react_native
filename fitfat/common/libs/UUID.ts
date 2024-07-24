export function uuid(): string {
  const timestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000000)
  return `${timestamp}-${randomNum}`
}
