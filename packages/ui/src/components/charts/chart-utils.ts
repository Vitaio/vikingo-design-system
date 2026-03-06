/** Numerikus rövid dátum: "02.14." */
export function formatDatumRovid(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T00:00:00')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${month}.${day}.`
  } catch {
    return dateStr
  }
}

/** Y-tengely kompakt formátum: 5.800.000 → "5,8M" */
export function formatAxisY(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.', ',')}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`
  return String(value)
}
