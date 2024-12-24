const VideoComponent = ({ url }: { url: string }) => {
  return (
    <div className="relative h-full w-full">
      <video
        className="absolute aspect-square top-0 left-0 w-full h-full object-cover rounded-[1em]"
        src={url}
        autoPlay
        loop
      />
    </div>
  )
}

export default VideoComponent
