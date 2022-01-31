export default interface Oauth {
  accessToken: string
  tokenType: string
  expiresAt: string
  phoneVerified: boolean
  kind: string
  initialConfig: boolean
  accountId: number
  enterprises: { id: number; terminals: { id: number }[] }[]
  terminalId: number
  currentEnterpriseId: number
  currentTerminalId: number
}
