// 文件用途：封装浏览器 fetch 请求，统一处理 JSON 提交和错误消息。

// 模块功能：把不同内容类型的响应整理为页面可直接消费的数据。
async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  // 兼容后端联调早期的返回：优先读 JSON，纯文本错误也统一包装成 message。
  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? { message: text } : null
}

export async function postJson(url, body) {
  // 所有业务接口先走同一层 POST JSON，便于后续补 token、超时和全局错误处理。
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    throw new Error(data?.message || '接口暂未返回成功结果，请稍后再试。')
  }

  return data
}
