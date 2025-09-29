import { ReactNode } from 'react'

import InfoBox from '../InfoBox'

interface RegionBox {
  title: string
  description: string
  icon?: ReactNode
}

interface RatgeberRegionGridProps {
  regions: RegionBox[]
}

const RatgeberRegionGrid: React.FC<RatgeberRegionGridProps> = ({ regions }) => {
  if (regions.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {regions.map(region => (
        <InfoBox
          key={region.title}
          type="cost"
          icon={region.icon ?? '📍'}
          title={region.title}
          content={<p className="text-sm md:text-base leading-relaxed">{region.description}</p>}
        />
      ))}
    </div>
  )
}

export default RatgeberRegionGrid
