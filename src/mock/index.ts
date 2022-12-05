import Mock from 'mockjs'
import BugStat from './BugStat'

interface MockParams {
    url: string
    type: string
    data?: unknown
    params?: unknown
    response(option?: unknown): Record<string, unknown>
}

const mocks: MockParams[] = [...BugStat]

export function mockXHR () {
  let i: MockParams
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
