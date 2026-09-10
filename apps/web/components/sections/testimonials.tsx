export interface Testimonial {
  quote: string
  name: string
  role?: string
}

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[]
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section className="site-section">
      <div className="site-shell">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="section-title">A better way to own your knowledge.</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={`${testimonial.name}-${testimonial.quote}`}
              className="flex min-h-64 flex-col rounded-lg border border-border bg-card p-6"
            >
              <blockquote className="flex-1">
                <p className="leading-7 text-pretty">“{testimonial.quote}”</p>
              </blockquote>

              <figcaption className="mt-8">
                <div className="text-sm font-medium">{testimonial.name}</div>

                {testimonial.role ? (
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
