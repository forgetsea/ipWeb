import { platformApiReference } from '../../config/userCenterApi'
import { Card, CardContent } from '../../components/ui/card'
import { UserPanel, UserSectionHeader } from './userUi'

function UserApiReferencePage() {
  return (
    <UserPanel>
      <UserSectionHeader eyebrow="API" title="接口对接参考" compact />
      <div className="mt-5 grid gap-3">
        {Object.entries(platformApiReference).map(([name, endpoint]) => (
          <Card key={name} className="rounded-[24px] border-slate-200/70 bg-[#f4f9ff]/82 shadow-none">
            <CardContent className="grid gap-2 p-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
              <strong className="text-sm font-black text-slate-900">{name}</strong>
              <span className="break-all text-sm leading-7 text-[color:var(--muted-strong)]">{endpoint}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </UserPanel>
  )
}

export default UserApiReferencePage
