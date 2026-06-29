# @cmdquery/units-listing

Themeable, framework-agnostic React component library for apartment and condo unit listings. Supports card and list views, filters, image galleries, and full CSS token customization — with no data fetching inside the package.

## Installation

```bash
npm install @cmdquery/units-listing
# or
yarn add @cmdquery/units-listing
```

> **Peer dependencies:** `react >= 18`, `react-dom >= 18`
> **Optional peers:** `motion` (animations), `next` (image optimization)

## Quick start

```tsx
import { UnitsListing } from '@cmdquery/units-listing'
import '@cmdquery/units-listing/styles'

export function UnitsList() {
  return (
    <UnitsListing
      units={units}
      isLoading={false}
    />
  )
}
```

## Usage with Next.js + Framer Motion

```tsx
import { UnitsListing } from '@cmdquery/units-listing'
import '@cmdquery/units-listing/styles'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

export function UnitsList({ units, isLoading }) {
  return (
    <UnitsListing
      units={units}
      isLoading={isLoading}
      ImageComponent={Image}
      motion={{ div: motion.div, AnimatePresence }}
      onBookTour={(unit) => openBookTourModal(unit)}
    />
  )
}
```

## Data contract

The package never fetches data — pass units as a prop. Map your API response to the `Unit` type:

```ts
import type { Unit } from '@cmdquery/units-listing'

function mapApiUnit(raw: ApiUnit): Unit {
  return {
    id: String(raw.id),
    unitNumber: raw.unit,
    beds: raw.bed,
    baths: raw.bath,
    price: {
      net: raw.monthly_rent_net,
      gross: raw.monthly_rent_gross,
    },
    images: raw.images?.map(img => ({ src: img.original, alt: `Unit ${raw.unit}` })),
    floorPlan: raw.floor_plan ? { src: raw.floor_plan.original } : null,
    floorPlanUrl: raw.floor_plan?.original ?? null,
    concession: raw.months_free
      ? { type: 'months', value: raw.months_free }
      : raw.weeks_free
      ? { type: 'weeks', value: raw.weeks_free }
      : null,
    leaseTerm: raw.lease_term,
    outdoor: raw.outdoor,
  }
}
```

### `Unit` type

```ts
interface Unit {
  id: string
  unitNumber: string
  beds: number
  baths: number
  price: {
    net: number | null
    gross: number | null
    currency?: string         // default 'USD'
  }
  images?: UnitImage[]
  floorPlan?: UnitImage | null
  floorPlanUrl?: string | null
  concession?: {
    type: 'months' | 'weeks'
    value: number | string
  } | null
  leaseTerm?: number | string | null
  outdoor?: string | null
  meta?: Record<string, unknown>  // escape hatch for custom slot data
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `units` | `Unit[]` | **required** | Array of units to display |
| `isLoading` | `boolean` | `false` | Shows skeleton cards |
| `isError` | `boolean` | `false` | Shows error state |
| `onRetry` | `() => void` | — | Retry callback on error |
| `defaultView` | `'card' \| 'list'` | `'card'` | Initial view mode |
| `view` | `'card' \| 'list'` | — | Controlled view mode |
| `onViewChange` | `(v: ViewMode) => void` | — | View change callback |
| `enableViewToggle` | `boolean` | `true` | Show view toggle control |
| `pageSize` | `number` | `25` | Max units to display |
| `skeletonCount` | `number` | `10` | Number of skeleton cards |
| `priceStep` | `number` | `50` | Price filter step |
| `header` | `ReactNode` | — | Custom header slot |
| `labels` | `Partial<UnitsListingLabels>` | — | Override UI strings |
| `theme` | `UnitsListingTheme` | — | Typed token overrides |
| `themeVars` | `UnitsListingThemeVars` | — | Raw `--ul-*` var overrides |
| `className` | `string` | — | Root element class |
| `ImageComponent` | `ImageComponent` | `<img>` | `next/image` or custom |
| `motion` | `MotionAdapter` | static | Framer Motion adapter |
| `onBookTour` | `(unit: Unit) => void` | — | Book tour callback |
| `renderBookTourModal` | `(ctx) => ReactNode` | — | Custom book tour modal |

## Theming

All visual values are CSS custom properties. Override them at any scope:

### Via `theme` prop (typed)

```tsx
<UnitsListing
  theme={{
    colorBg: '#f8f5f0',
    colorAccent: '#1d3a5f',
    colorAccentContrast: '#ffffff',
    colorPrice: '#c9dff5',
    radiusLg: '16px',
    fontFamily: '"Inter", sans-serif',
    gridMinCol: '300px',
  }}
  units={units}
/>
```

### Via CSS (zero JS)

```css
/* Apply after importing package styles */
.ul-root {
  --ul-color-bg: #f8f5f0;
  --ul-color-accent: #1d3a5f;
  --ul-color-price: #c9dff5;
  --ul-grid-min-col: 300px;
}
```

### All available tokens

| Token | Default | Description |
|-------|---------|-------------|
| `--ul-color-bg` | `#fffaf5` | Page/grid background |
| `--ul-color-surface` | `#ffffff` | Card background |
| `--ul-color-surface-alt` | `#ebe5dc` | Secondary surfaces |
| `--ul-color-border` | `#e7e0d5` | Borders |
| `--ul-color-text` | `#2d232e` | Primary text |
| `--ul-color-text-muted` | `#726a67` | Secondary text |
| `--ul-color-accent` | `#2c201c` | Buttons, active states |
| `--ul-color-accent-contrast` | `#fffaf5` | Text on accent |
| `--ul-color-price` | `rgb(229, 207, 180)` | Price pill background |
| `--ul-color-concession` | `#b8463f` | Concession badge |
| `--ul-radius-sm` | `8px` | Small radius |
| `--ul-radius-md` | `12px` | Medium radius |
| `--ul-radius-lg` | `20px` | Card radius |
| `--ul-radius-pill` | `999px` | Pill buttons |
| `--ul-grid-min-col` | `260px` | Min card width |
| `--ul-grid-gap` | `20px` | Grid gap |
| `--ul-font-family` | `inherit` | Font family |
| `--ul-transition` | `150ms ease-in-out` | UI transitions |
| `--ul-z-dropdown` | `100` | Filter dropdown z-index |
| `--ul-z-modal` | `1000` | Modal z-index |
| `--ul-z-lightbox` | `1100` | Lightbox z-index |

## Labels (i18n)

All user-facing strings are injectable:

```tsx
<UnitsListing
  labels={{
    concessionMonths: 'Months Free',
    concessionWeeks: 'Weeks Free',
    bookTour: 'Schedule a Tour',
    emptyTitle: 'No units available',
    emptySubtitle: 'Try adjusting your filters',
    viewCard: 'Cards',
    viewList: 'List',
    clearFilters: 'Clear',
  }}
  units={units}
/>
```

## Book Tour

BookTour behavior is fully owned by the consumer. Two patterns:

```tsx
// Pattern 1: callback only
<UnitsListing
  onBookTour={(unit) => router.push(`/book?unit=${unit.id}`)}
  units={units}
/>

// Pattern 2: render your own modal
<UnitsListing
  renderBookTourModal={({ unit, close }) => (
    <MyBookTourModal unit={unit} onClose={close} />
  )}
  units={units}
/>
```

## Granular exports

For custom layouts, import individual components:

```tsx
import {
  UnitsGrid,
  UnitCard,
  UnitsTable,
  CardSkeleton,
  ViewToggle,
  FiltersDropdown,
  useUnitsFilter,
  UnitsListingProvider,
} from '@cmdquery/units-listing'
```

## Monorepo (pnpm workspaces)

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```jsonc
// apps/my-app/package.json
{
  "@cmdquery/units-listing": "workspace:*"
}
```

```js
// next.config.js — enables hot reload without pre-building
transpilePackages: ['@cmdquery/units-listing']
```

## Development

```bash
npm run dev       # watch mode
npm run build     # production build
npm run typecheck # TypeScript check
```

## License

MIT
