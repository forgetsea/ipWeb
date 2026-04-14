import { useState } from 'react'
import { extractIp } from '../../services/userCenterService'
import { initialExtractForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserExtractPage() {
  const { isSubmitting, requireCredentials, runAction, updateForm } = useUserCenter()
  const [extractForm, setExtractForm] = useState(initialExtractForm)

  const handleExtractSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'extract',
      action: () =>
        extractIp({
          infoid: credentials.username,
          pw: credentials.password,
          p1: extractForm.count,
          p2: extractForm.regionCode,
        }),
      successMessage: '提取请求已提交。',
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Extract</p>
          <h2>提取 IP 测试</h2>
        </div>
        <span>单次 1 到 200 个</span>
      </div>

      <form className="user-form-grid user-form" onSubmit={handleExtractSubmit}>
        <label className="user-field">
          <span>提取数量</span>
          <input
            name="count"
            type="number"
            min="1"
            max="200"
            value={extractForm.count}
            onChange={updateForm(setExtractForm)}
          />
        </label>
        <label className="user-field">
          <span>地区编码</span>
          <input
            name="regionCode"
            value={extractForm.regionCode}
            onChange={updateForm(setExtractForm)}
            placeholder="选填，例如 410100"
          />
        </label>
        <button type="submit" className="primary-button user-form-submit">
          {isSubmitting === 'extract' ? '提交中...' : '提取 IP'}
        </button>
      </form>
    </section>
  )
}

export default UserExtractPage
