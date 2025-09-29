import Image from 'next/image'

interface RatgeberHeroImageProps {
  src: string
  alt: string
  priority?: boolean
}

const RatgeberHeroImage: React.FC<RatgeberHeroImageProps> = ({ src, alt, priority = false }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover rounded-lg shadow-lg"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}

export default RatgeberHeroImage
