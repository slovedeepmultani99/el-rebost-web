interface Feature {
  icon: string
  title: string
  desc: string
}

export default function Features({ data }: { data: Feature[] }) {
  return (
    <section className="bg-white border-y border-line py-14">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((f, i) => (
            <div key={i} className="text-center md:text-left">
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-display text-base text-wine-700 mb-1">{f.title}</h3>
              <p className="font-body text-sm text-muted leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
