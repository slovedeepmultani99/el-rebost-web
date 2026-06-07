interface CasaData {
  eyebrow: string
  heading: string
  p1: string
  p2: string
}

export default function Casa({ data }: { data: CasaData }) {
  return (
    <section id="nosotros" className="py-20 bg-white scroll-mt-14">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-bold tracking-widest uppercase text-muted mb-3">
            {data.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
            {data.heading}
          </h2>
          <p className="font-body text-base text-muted leading-relaxed mb-4">{data.p1}</p>
          <p className="font-body text-base text-muted leading-relaxed">{data.p2}</p>
        </div>
      </div>
    </section>
  )
}
