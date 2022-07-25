export default function getFullSeconds(floatNumber: number): number {
  return Math.floor(Number(floatNumber.toFixed(3)) * 1000)
}