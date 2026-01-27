import React from 'react'
import * as FaIcons from 'react-icons/fa6'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io5'

const AllIcons = { ...FaIcons, ...MdIcons, ...IoIcons }

type IconProps = {
  name: string
  className?: string
  size?: number | string
}

export const Icon: React.FC<IconProps> = ({ name, className, size }) => {
  const IconComponent = (AllIcons as any)[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={className} size={size} />
}
