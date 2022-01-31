export interface TimerProps {
  value: number
  text: string
  unit: string
  onRestart?: () => void
}
