import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { Card, CardContent } from '../components/ui/card'
import { buttonVariants } from '../components/ui/button-variants'
import { SelectInput, StatusMessage, Surface, SurfaceTitle, TextInput } from '../components/ui/surface'
import { provinceOptions } from '../data/postalCodes'
import { navItems } from '../data/homeData'
import { appRoutes } from '../router'
import { fetchOrders } from '../services/userCenterService'
import { normalizeOrderList } from './user/userCenterData'

const GET_IP_BASE_URL = 'http://ip.ppfly.top:6071/getApiIp'

const sectionNavItems = [
  { id: 'getip-hero', label: '页面概览' },
  { id: 'getip-api', label: 'API 获取' },
  { id: 'getip-result', label: '结果预览' },
]

const bannerStats = [
  { label: '调用地址', value: 'ip.ppfly.top:6071' },
  { label: '核心参数', value: '套餐 + 数量 + 省份' },
  { label: '编码方式', value: 'UTF-8 / GET' },
]

function clampExtractCount(value) {
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) return 1
  return Math.max(1, Math.min(200, Math.floor(numericValue)))
}

function buildApiUrl(selectedPackage, extractCount, provinceCode) {
  const params = new URLSearchParams({
    infoid: String(selectedPackage.packageId || selectedPackage.id || ''),
    pw: String(selectedPackage.apiAccount || selectedPackage.apiKey || ''),
    p1: String(clampExtractCount(extractCount)),
    p2: provinceCode,
  })

  return `${GET_IP_BASE_URL}?${params.toString()}`
}

function GetIpPage() {
  const [packages, setPackages] = useState([])
  const [isLoadingPackages, setIsLoadingPackages] = useState(true)
  const [formValues, setFormValues] = useState({
    packageId: '',
    extractCount: '1',
    provinceCode: '',
  })
  const [result, setResult] = useState({
    type: 'idle',
    message: '',
    apiUrl: '',
  })

  useEffect(() => {
    let mounted = true

    async function loadPackages() {
      setIsLoadingPackages(true)

      try {
        const response = await fetchOrders({ page: 1, pageSize: 50 })
        const nextPackages = normalizeOrderList(response)

        if (!mounted) return

        setPackages(nextPackages)
        setFormValues((current) => ({
          ...current,
          packageId: current.packageId || nextPackages[0]?.orderNo || '',
        }))
      } catch {
        if (!mounted) return
        setPackages([])
      } finally {
        if (mounted) {
          setIsLoadingPackages(false)
        }
      }
    }

    loadPackages()

    return () => {
      mounted = false
    }
  }, [])

  const selectedPackage = useMemo(
    () => packages.find((item) => item.orderNo === formValues.packageId) || null,
    [packages, formValues.packageId],
  )

  const selectedProvince = useMemo(
    () => provinceOptions.find((item) => item.code === formValues.provinceCode) || null,
    [formValues.provinceCode],
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((current) => ({
      ...current,
      [name]: name === 'extractCount' ? value.replace(/[^\d]/g, '') : value,
    }))
  }

  const handleGenerate = () => {
    if (!selectedPackage) {
      setResult({
        type: 'error',
        message: '请先选择套餐。未登录用户暂时无法生成 API 链接。',
        apiUrl: '',
      })
      return
    }

    if (!selectedPackage.packageId && !selectedPackage.id) {
      setResult({
        type: 'error',
        message: '当前套餐缺少套餐 ID，暂时无法生成 API 链接。',
        apiUrl: '',
      })
      return
    }

    if (!selectedPackage.apiAccount && !selectedPackage.apiKey) {
      setResult({
        type: 'error',
        message: '当前套餐缺少 API 密钥，暂时无法生成 API 链接。',
        apiUrl: '',
      })
      return
    }

    if (!formValues.provinceCode) {
      setResult({
        type: 'error',
        message: '请选择省份。',
        apiUrl: '',
      })
      return
    }

    const extractCount = clampExtractCount(formValues.extractCount || '1')
    const apiUrl = buildApiUrl(selectedPackage, extractCount, formValues.provinceCode)

    setFormValues((current) => ({
      ...current,
      extractCount: String(extractCount),
    }))

    setResult({
      type: 'success',
      message: `已生成 API 链接，当前地区编码为 ${selectedProvince?.code || formValues.provinceCode}。`,
      apiUrl,
    })
  }

  return (
    <div className="min-h-screen">
      <SiteHeader navItems={navItems} />

      <main className="section-container grid gap-6 pb-12 pt-28 sm:pt-32 xl:grid-cols-[220px_minmax(0,1fr)] xl:items-start">
        <aside className="xl:sticky xl:top-28">
          <Surface className="rounded-[28px] border-white/70">
            <CardContent className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">页面导航</p>
              <nav className="mt-4 grid gap-2" aria-label="提取IP页面导航">
                {sectionNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-2xl border-l-2 border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 no-underline transition hover:border-[#1677ff]/40 hover:bg-[#1677ff]/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Surface>
        </aside>

        <div className="grid gap-6">
          <section id="getip-hero" className="scroll-mt-28">
            <Surface className="rounded-[36px] border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(22,119,255,0.12),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(22,179,154,0.14),transparent_20%),rgba(255,255,255,0.94)]">
              <CardContent className="grid gap-5 p-7 sm:p-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
                <div>
                  <span className="eyebrow">Get IP</span>
                  <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-[3.75rem]">
                    在线提取代理 IP
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted-strong)]">
                    当前页面只保留套餐、提取数量和省份 3 个核心参数。选择完成后，点击按钮即可生成对应的 API 提取链接。
                  </p>
                </div>

                <div className="grid gap-3">
                  {bannerStats.map((item) => (
                    <Card key={item.label} className="rounded-[24px] border-0 bg-[#f2f7ff]/92 shadow-none">
                      <CardContent className="grid gap-2 p-5">
                        <span className="text-sm text-slate-500">{item.label}</span>
                        <strong className="text-2xl font-black text-slate-900">{item.value}</strong>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Surface>
          </section>

          <section id="getip-api" className="scroll-mt-28">
            <Surface className="rounded-[32px] border-white/70 p-6 sm:p-8">
              <SurfaceTitle eyebrow="API 获取" title="生成你的 API 链接" />

              <div className="mt-6 grid gap-5">
                <section className="rounded-[24px] border border-slate-200/70 bg-[#f5f9ff]/78 p-5">
                  <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
                    <strong className="text-base font-black text-slate-900">选择套餐</strong>
                    <SelectInput
                      name="packageId"
                      value={formValues.packageId}
                      onChange={handleChange}
                      disabled={isLoadingPackages}
                    >
                      <option value="">
                        {isLoadingPackages ? '正在加载套餐...' : '请选择套餐'}
                      </option>
                      {packages.map((item) => (
                        <option key={item.orderNo} value={item.orderNo}>
                          {item.packageName || item.orderNo}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </section>

                <section className="rounded-[24px] border border-slate-200/70 bg-[#f5f9ff]/78 p-5">
                  <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,240px)_minmax(0,1fr)] lg:items-center">
                    <strong className="text-base font-black text-slate-900">提取数量</strong>
                    <TextInput
                      name="extractCount"
                      type="text"
                      inputMode="numeric"
                      value={formValues.extractCount}
                      onChange={handleChange}
                    />
                    <span className="text-sm leading-7 text-slate-500">提示：单次提取数量范围 1-200</span>
                  </div>
                </section>

                <section className="rounded-[24px] border border-slate-200/70 bg-[#f5f9ff]/78 p-5">
                  <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,320px)_minmax(0,1fr)] lg:items-center">
                    <strong className="text-base font-black text-slate-900">地区选择</strong>
                    <SelectInput name="provinceCode" value={formValues.provinceCode} onChange={handleChange}>
                      <option value="">请选择省份</option>
                      {provinceOptions.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.label}
                        </option>
                      ))}
                    </SelectInput>
                    <span className="text-sm leading-7 text-slate-500">
                      使用省级地区编码作为 `p2`，例如浙江对应 `330000`
                    </span>
                  </div>
                </section>
              </div>

              <div className="mt-6">
                <button type="button" className={buttonVariants({ size: 'lg' })} onClick={handleGenerate}>
                  生成 API 链接
                </button>
              </div>
            </Surface>
          </section>

          <section id="getip-result" className="scroll-mt-28">
            <Surface className="rounded-[32px] border-white/70 p-6 sm:p-8">
              <SurfaceTitle eyebrow="结果预览" title="生成结果与接口说明" />

              <div className="mt-6 grid gap-5">
                <StatusMessage type={result.type}>
                  {result.message || '选择套餐、数量和省份后，这里会显示生成结果。'}
                </StatusMessage>

                <Card className="rounded-[24px] border-slate-200/70 bg-[#f5f9ff]/78 shadow-none">
                  <CardContent className="p-5">
                    <span className="text-sm text-slate-500">API 链接</span>
                    <code className="mt-3 block overflow-auto rounded-2xl bg-[#0f2b67] p-4 text-sm leading-7 text-slate-50">
                      {result.apiUrl || `${GET_IP_BASE_URL}?infoid=套餐id&pw=API密钥&p1=1&p2=330000`}
                    </code>
                  </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-3">
                  <Card className="rounded-[24px] border-slate-200/70 bg-[#f5f9ff]/78 shadow-none">
                    <CardContent className="p-5">
                      <strong className="text-base font-black text-slate-900">链接格式</strong>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted-strong)]">
                        `infoid` 为套餐 ID，`pw` 为 API 密钥，`p1` 为提取数量，`p2` 为地区编码。
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-[24px] border-slate-200/70 bg-[#f5f9ff]/78 shadow-none">
                    <CardContent className="p-5">
                      <strong className="text-base font-black text-slate-900">数量限制</strong>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted-strong)]">
                        当前前端按你提供的参考表单限制为单次 1 到 200，默认起步为 1。
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-[24px] border-slate-200/70 bg-[#f5f9ff]/78 shadow-none">
                    <CardContent className="p-5">
                      <strong className="text-base font-black text-slate-900">地区编码</strong>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted-strong)]">
                        当前先提供省级下拉选择。完整省市编码表已独立整理成文档页，后续也方便继续扩展城市联动。
                      </p>
                      <Link
                        to={appRoutes.postalCodes}
                        className="mt-3 inline-flex text-sm font-bold text-[#1677ff] no-underline hover:underline"
                      >
                        查看省市编码文档
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Surface>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default GetIpPage
