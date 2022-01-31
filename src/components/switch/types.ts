export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  /* */
  /**
   * @platform native
   */
  style?: {};
  //
  /**
   * @platform web
   */
  className?: string;
  //
}
