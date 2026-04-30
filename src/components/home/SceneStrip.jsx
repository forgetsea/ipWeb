function SceneStrip({ scenes }) {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-4 rounded-[30px] border border-white/70 bg-white/65 px-5 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <p className="m-0 text-base font-black text-slate-900">满足广泛应用场景需求</p>
        <div className="flex flex-wrap gap-2.5">
          {scenes.map((scene) => (
            <span
              key={scene}
              className="rounded-full bg-[#0d6efd]/7 px-3.5 py-2 text-sm font-medium text-[#315071]"
            >
              {scene}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SceneStrip
