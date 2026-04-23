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

      <p>提取IP API 文档。</p>
    </section>
  )
}

export default UserExtractPage
