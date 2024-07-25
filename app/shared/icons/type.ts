export interface ISvgProps extends React.SVGProps<SVGCircleElement> {
  radius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  active?: boolean;
}