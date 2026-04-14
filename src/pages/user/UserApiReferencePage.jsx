import { vendorApiReference } from '../../config/userCenterApi'

function UserApiReferencePage() {
  return (
    <section className="user-panel">
      <div className="user-section-title compact">
        <div>
          <p>API</p>
          <h2>接口对接参考</h2>
        </div>
      </div>

      <div className="api-reference-list">
        {Object.entries(vendorApiReference).map(([name, endpoint]) => (
          <div key={name}>
            <strong>{name}</strong>
            <span>{endpoint}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UserApiReferencePage
