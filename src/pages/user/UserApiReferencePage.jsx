// 文件用途：用户中心接口参考页，展示供应商原始接口地址。
import { vendorApiReference } from '../../config/userCenterApi'

// 模块功能：把接口配置渲染成对接人员可查看的参考列表。
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
