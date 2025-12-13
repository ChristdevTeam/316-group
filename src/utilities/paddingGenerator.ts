export const paddingGenerator = (paddingType?: string | null) => {
  switch (paddingType) {
    case 'default':
      return 'py-8 md:py-16'
    case 'noPadding':
      return 'py-0'
    case 'paddingAdded':
      return 'py-16 md:py-32'
    case 'paddingTopOnly':
      return 'pt-8 md:pt-16 pb-0'
    case 'paddingBottomOnly':
      return 'pb-8 md:pb-16 pt-0'
    case 'paddingTopOnlyAdded':
      return 'pt-16 md:pt-32 pb-0'
    case 'paddingBottomOnlyAdded':
      return 'pb-16 md:pb-32 pt-0'
    case 'paddingTopAdded':
      return 'pt-16 md:pt-32 pb-16'
    case 'paddingBottomAdded':
      return 'pb-16 md:pb-32 pt-16'
    default:
      return 'py-8 md:py-16'
  }
}
