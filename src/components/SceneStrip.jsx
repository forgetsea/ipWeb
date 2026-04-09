function SceneStrip({ scenes }) {
  return (
    <section className="trust-strip section-container">
      <p>服务场景</p>
      <div>
        {scenes.map((scene) => (
          <span key={scene}>{scene}</span>
        ))}
      </div>
    </section>
  )
}

export default SceneStrip
