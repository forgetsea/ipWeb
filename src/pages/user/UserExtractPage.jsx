import { fetchApiSummary, fetchCodeDemos } from '../../services/userCenterService'
import { useUserCenter } from './useUserCenter'

function UserExtractPage() {
  const { isSubmitting, runAction } = useUserCenter()

  const handleFetchDocs = () => {
    runAction({
      key: 'docs',
      action: async () => {
        const [summary, demos] = await Promise.all([fetchApiSummary(), fetchCodeDemos()])
        return {
          message: summary?.data?.title || `已获取 ${demos?.data?.list?.length || 0} 个代码示例。`,
          data: { summary: summary?.data, demos: demos?.data?.list || [] },
        }
      },
      successMessage: 'API 文档摘要已刷新。',
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Docs</p>
          <h2>API 文档 / 代码示例</h2>
        </div>
        <button type="button" className="ghost-button" onClick={handleFetchDocs}>
          {isSubmitting === 'docs' ? '读取中...' : '读取文档摘要'}
        </button>
      </div>

      <p>最新文档未提供前端直接提取 IP 的业务接口。页面改为读取平台 API 文档摘要和代码示例，实际 IP 提取由订单 API 凭证在服务端维护。</p>
    </section>
  )
}

export default UserExtractPage
