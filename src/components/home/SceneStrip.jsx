function SceneStrip({ scenes }) {
  return (
    <section className="scene-strip section-container">
      <p>满足广泛应用场景需求</p>
      <div>
        {scenes.map((scene) => (
          <span key={scene}>{scene}</span>
        ))}
      </div>
    </section>
  )
}

export default SceneStrip
