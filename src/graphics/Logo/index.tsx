import Image from 'next/image'
import React from 'react'

const Logo: React.FC = () => {
  return <Image src="/assets/logo.svg" alt="logo" height={60} width={300} />
}

export default Logo
