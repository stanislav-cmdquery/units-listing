export interface UnitsListingTheme {
  colorBg?: string
  colorSurface?: string
  colorSurfaceAlt?: string
  colorBorder?: string
  colorText?: string
  colorTextMuted?: string
  colorAccent?: string
  colorAccentContrast?: string
  colorPrice?: string
  colorConcession?: string
  radiusSm?: string
  radiusMd?: string
  radiusLg?: string
  radiusPill?: string
  gridMinCol?: string
  fontFamily?: string
}

export type UnitsListingThemeVars = {
  [K in `--ul-${string}`]?: string
}

export function themeToVars(theme: UnitsListingTheme): UnitsListingThemeVars {
  const map: Record<string, string | undefined> = {
    '--ul-color-bg': theme.colorBg,
    '--ul-color-surface': theme.colorSurface,
    '--ul-color-surface-alt': theme.colorSurfaceAlt,
    '--ul-color-border': theme.colorBorder,
    '--ul-color-text': theme.colorText,
    '--ul-color-text-muted': theme.colorTextMuted,
    '--ul-color-accent': theme.colorAccent,
    '--ul-color-accent-contrast': theme.colorAccentContrast,
    '--ul-color-price': theme.colorPrice,
    '--ul-color-concession': theme.colorConcession,
    '--ul-radius-sm': theme.radiusSm,
    '--ul-radius-md': theme.radiusMd,
    '--ul-radius-lg': theme.radiusLg,
    '--ul-radius-pill': theme.radiusPill,
    '--ul-grid-min-col': theme.gridMinCol,
    '--ul-font-family': theme.fontFamily,
  }
  const result: UnitsListingThemeVars = {}
  for (const [k, v] of Object.entries(map)) {
    if (v !== undefined) (result as Record<string, string>)[k] = v
  }
  return result
}
