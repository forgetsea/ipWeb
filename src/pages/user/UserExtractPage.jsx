import { Card, CardContent } from '../../components/ui/card'
import { buttonVariants } from '../../components/ui/button-variants'
import { fetchApiSummary, fetchCodeDemos } from '../../services/userCenterService'
import { UserPanel, UserSectionHeader } from './userUi'
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
    <UserPanel>
      <UserSectionHeader
        eyebrow="Docs"
        title="API 文档 / 代码示例"
        actions={
          <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={handleFetchDocs}>
            {isSubmitting === 'docs' ? '读取中...' : '读取文档摘要'}
          </button>
        }
      />

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['提取 API', '统一查看参数格式、鉴权方式和返回示例。'],
          ['代码示例', '支持快速联调，便于在业务中直接接入。'],
          ['联调建议', '优先用 JSON 格式联调，再切换到目标返回结构。'],
        ].map(([title, text]) => (
          <Card key={title} className="rounded-[24px] border-slate-200/70 bg-[#f4f9ff]/82 shadow-none">
            <CardContent className="grid gap-2 p-5">
              <strong className="text-base font-black text-slate-900">{title}</strong>
              <p className="text-sm leading-7 text-[color:var(--muted-strong)]">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </UserPanel>
  )
}

export default UserExtractPage
