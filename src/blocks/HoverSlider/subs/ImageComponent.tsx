import Image from 'next/image'

export const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative h-full w-full">
      <Image src={src} alt={alt} className="object-fit w-full h-full" fill />
    </div>
  )
}
