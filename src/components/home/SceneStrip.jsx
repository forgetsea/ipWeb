// 文件用途：首页场景横条，展示代理 IP 可覆盖的业务场景。

// 模块功能：把场景文案渲染为一组紧凑标签。
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
