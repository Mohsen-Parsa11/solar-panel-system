type Props = {
  size?: number;
  color?: string;
  className?: string;
};

export default function XIcon({
  size = 20,
  color = '#CECECE',
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.28 0C1.4685 0 0 1.4685 0 3.28V16.4C0 18.2115 1.4685 19.68 3.28 19.68H16.4C18.2115 19.68 19.68 18.2115 19.68 16.4V3.28C19.68 1.4685 18.2115 0 16.4 0H3.28ZM4.25741 4.21714H7.9767L10.6179 7.97029L13.8229 4.21714H14.9943L11.1469 8.72165L15.8912 15.4629H12.1728L9.10786 11.1084L5.38857 15.4629H4.21714L8.57888 10.3571L4.25741 4.21714ZM6.05116 5.15429L12.6615 14.5257H14.0974L7.48708 5.15429H6.05116Z"
        fill={color}
      />
    </svg>
  );
}
