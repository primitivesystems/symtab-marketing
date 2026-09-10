// Stacked backdrop masks, following Magic UI's progressive-blur pattern.
// https://magicui.design/docs/components/progressive-blur
export function ProgressiveBlur() {
  return (
    <div className="progressive-blur" aria-hidden="true">
      {[1, 2, 4, 8].map((radius, index) => {
        const mask = `linear-gradient(to bottom, black, transparent ${100 - index * 20}%)`
        return (
          <div
            key={radius}
            style={{
              backdropFilter: `blur(${radius}px)`,
              WebkitBackdropFilter: `blur(${radius}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}
    </div>
  )
}
