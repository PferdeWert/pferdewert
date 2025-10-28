import Image from 'next/image'
import { ImageAttribution } from '@/types/attribution'

interface RatgeberHeroImageProps {
  src: string
  alt: string
  priority?: boolean
  objectPosition?: string
  attribution?: ImageAttribution
}

const RatgeberHeroImage: React.FC<RatgeberHeroImageProps> = ({
  src,
  alt,
  priority = false,
  objectPosition = 'center',
  attribution
}) => {
  return (
    <section className="py-8" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover rounded-lg shadow-lg"
            style={{ objectPosition }}
            sizes="(min-width: 768px) 80vw, 100vw"
            suppressHydrationWarning
          />
        </div>
        {attribution && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Foto: {attribution.author} /{' '}
            <a
              href={attribution.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              {attribution.license}
            </a>
            {attribution.source && ` / ${attribution.source}`}
          </p>
        )}
      </div>
    </section>
  )
}

export default RatgeberHeroImage
