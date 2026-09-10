import {
  Markdown,
  Git,
  Github,
  Ollama,
  OpenaiChatgpt,
  Claude,
} from "@thesvg/react"
const integrations = {
  Markdown: <Markdown variant="mono" width={24} height={24} />,
  Git: <Git variant="mono" width={24} height={24} />,
  GitHub: <Github variant="mono" width={24} height={24} />,

  Ollama: <Ollama variant="mono" width={24} height={24} />,
  OpenAI: <OpenaiChatgpt variant="mono" width={24} height={24} />,
  Claude: <Claude variant="mono" width={24} height={24} />,
}

export function EcosystemSection() {
  return (
    <section id="integrations" className="site-section">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">FAMILIAR BY DESIGN</p>
          <h2 className="section-title">
            Your files. Your tools. Still yours.
          </h2>
          <p className="project-description">
            Open formats, version control, and your choice of AI provider.
          </p>
        </div>

        <div className="ecosystem-grid">
          {Object.entries(integrations).map(([name, icon]) => (
            <div key={name} className="ecosystem-item">
              <span aria-hidden="true">{icon}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
