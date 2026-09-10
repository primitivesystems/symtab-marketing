import type { CSSProperties } from "react";

const brandIcons = {
  claude: new URL("../../icons/claude.svg", import.meta.url).href,
} as const;

export type BrandName = keyof typeof brandIcons;

export interface BrandIconProps {
  name: BrandName;
  size?: number;
}

export function BrandIcon({
  name,
  size = 16,
}: BrandIconProps) {
  const src = brandIcons[name];

  return (
    <span
      aria-hidden="true"
      className="brand-icon"
      style={
        {
          width: size,
          height: size,
          maskImage: `url("${src}")`,
          WebkitMaskImage: `url("${src}")`,
        } satisfies CSSProperties
      }
    />
  );
}