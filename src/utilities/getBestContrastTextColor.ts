export function getBestContrastTextColor(bgClass: string | null | undefined): string {
  // Extract the suffix after the last "-"
  if (bgClass) {
    const bgSuffix = bgClass.split('-').pop()

    // Handle special cases explicitly
    switch (bgSuffix) {
      case 'inherit':
      case 'current':
        // Assume text color is inherited and doesn't need adjustment
        return 'text-inherit'
      case 'transparent':
        // Transparent background; text color depends on the underlying content
        return 'text-black'
      case 'black':
        return 'text-white'
      case 'white':
        return 'text-black'
      default:
        // Numeric or color suffixes
        const numericValue = parseInt(bgSuffix || '', 10)
        if (!isNaN(numericValue)) {
          // For numeric suffixes, decide based on brightness threshold
          return numericValue >= 500 ? 'text-white' : 'text-black'
        }

        // Fallback for unknown cases
        console.warn(`Unknown or unsupported background class: ${bgClass}`)
        return 'text-black'
    }
  }
  return ''
}
