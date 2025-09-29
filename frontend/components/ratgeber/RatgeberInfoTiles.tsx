interface RatgeberInfoTile {
  title: string
  value: string
  description: string
}

interface RatgeberInfoTilesProps {
  headline: string
  tiles: RatgeberInfoTile[]
}

const RatgeberInfoTiles: React.FC<RatgeberInfoTilesProps> = ({ headline, tiles }) => {
  if (tiles.length === 0) {
    return null
  }

  return (
    <div className="mt-8 space-y-4 md:space-y-6">
      <h3 className="font-bold text-brand text-base md:text-lg">{headline}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {tiles.map(tile => (
          <div
            key={tile.title}
            className="bg-[#fdf7f1] p-3 md:p-4 rounded border border-[#e0c9aa] shadow-sm"
          >
            <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">{tile.title}</h4>
            <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">{tile.value}</div>
            <div className="text-xs md:text-sm text-gray-600">{tile.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RatgeberInfoTiles
