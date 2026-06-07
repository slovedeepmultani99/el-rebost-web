interface Stat {
  num: string
  text: string
}

export default function Stats({ data }: { data: Stat[] }) {
  return (
    <section className="bg-wine-700 py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl md:text-5xl text-cream mb-2">{s.num}</p>
              <p className="font-body text-xs text-cream/70 leading-snug">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
