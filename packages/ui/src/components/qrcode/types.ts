export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H'

export type QRCodeStatus = 'active' | 'expired' | 'loading' | 'scanned'

export interface QRCodeProps {
  /** The text to encode into the QR code */
  value: string
  /** Size of the QR code in pixels */
  size?: number
  /** Color of the dark modules */
  color?: string
  /** Background color */
  bgColor?: string
  /** Error correction level */
  errorLevel?: QRCodeErrorLevel
  /** URL of the center icon */
  icon?: string
  /** Size of the center icon in pixels */
  iconSize?: number
  /** Status of the QR code */
  status?: QRCodeStatus
  /** Whether to show a border around the QR code */
  bordered?: boolean
}

export const qrCodeDefaultProps = {
  size: 160,
  color: '#000000',
  bgColor: '#ffffff',
  errorLevel: 'M' as const,
  iconSize: 40,
  status: 'active' as const,
  bordered: true,
} as const

export interface QRCodeEmits {
  (e: 'refresh', event: MouseEvent): void
}
