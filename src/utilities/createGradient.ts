import colors from 'tailwindcss/colors'

type TailwindColor = keyof typeof colors
type TailwindShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type GradientDirection =
  | 'to-r'
  | 'to-l'
  | 'to-t'
  | 'to-b'
  | 'to-tr'
  | 'to-tl'
  | 'to-br'
  | 'to-bl'
  | 'to-right'
  | 'to-left'
  | 'to-top'
  | 'to-bottom'
  | 'to-top-right'
  | 'to-top-left'
  | 'to-bottom-right'
  | 'to-bottom-left'

function directionToDegrees(direction: GradientDirection): number {
  const directionMap: Record<GradientDirection, number> = {
    'to-r': 90,
    'to-right': 90,
    'to-l': 270,
    'to-left': 270,
    'to-t': 0,
    'to-top': 0,
    'to-b': 180,
    'to-bottom': 180,
    'to-tr': 45,
    'to-top-right': 45,
    'to-tl': 315,
    'to-top-left': 315,
    'to-br': 135,
    'to-bottom-right': 135,
    'to-bl': 225,
    'to-bottom-left': 225,
  }

  return directionMap[direction]
}

function getTailwindColor(colorClass: string): string {
  // Remove 'bg-' prefix if it exists
  const normalizedColor = colorClass.startsWith('bg-') ? colorClass.slice(3) : colorClass

  // Handle special cases
  if (normalizedColor === 'inherit') return 'inherit'
  if (normalizedColor === 'current') return 'currentColor'
  if (normalizedColor === 'transparent') return 'transparent'
  if (normalizedColor === 'black') return '#000000'
  if (normalizedColor === 'white') return '#ffffff'

  // Parse color classes like "slate-500" or "blue-200"
  const match = normalizedColor.match(/([a-z]+)-(\d+)/)
  if (!match) return 'transparent'

  const [_, colorName, shade] = match

  // Ensure color exists in Tailwind
  if (!colors[colorName as TailwindColor]) {
    console.warn(`Color ${colorName} not found in Tailwind colors`)
    return 'transparent'
  }

  // Get the color value
  const colorValue = colors[colorName as TailwindColor][shade as unknown as TailwindShade]
  if (!colorValue) {
    console.warn(`Shade ${shade} not found for color ${colorName}`)
    return 'transparent'
  }

  return colorValue
}

function createGradient(
  firstSectionColor: string,
  secondSectionColor: string,
  direction: GradientDirection = 'to-r',
  splitPoint: number = 30,
): string {
  const firstColor = getTailwindColor(firstSectionColor)
  const secondColor = getTailwindColor(secondSectionColor)
  const degrees = directionToDegrees(direction)

  return `linear-gradient(${degrees}deg, 
    ${firstColor} 0%, 
    ${firstColor} ${splitPoint}%, 
    ${secondColor} ${splitPoint + 1}%, 
    ${secondColor} 100%)`
}

export { createGradient, type GradientDirection }
