import http from 'k6/http'
import { SharedArray } from 'k6/data'
import { check, group, sleep } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"

const BASE_URL = __ENV.BASE_URL || 'https://bugbash.online'
const USERNAME = __ENV.USERNAME || 'demouser'
const PASSWORD = __ENV.PASSWORD || 'testingisfun99'
const DO_SIGNIN = (__ENV.DO_SIGNIN || 'true').toLowerCase() === 'true'
const VUS = parseInt(__ENV.VUS || '10', 10)
const DURATION = __ENV.DURATION || '30s'
const RAMP_UP = __ENV.RAMP_UP || '10s'
const RAMP_DOWN = __ENV.RAMP_DOWN || '5s'

const USERS = new SharedArray('users', () => {
  const rows = open('../testData/users.csv').trim().split(/\r?\n/)
  return rows.slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [userName, password] = line.split(',').map((value) => value.trim())
      return { userName, password }
    })
    .filter((user) => user.userName && user.password)
})

export const options = {
  scenarios: {
    web_api_journey: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: RAMP_UP, target: VUS },
        { duration: DURATION, target: VUS },
        { duration: RAMP_DOWN, target: 0 },
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1200'],
    checks: ['rate>0.95'],
  },
  summaryTrendStats: ['avg', 'min', 'med', 'p(90)', 'p(95)', 'max'],
}

function buildAuthHeaders(token, extraHeaders = {}) {
  const headers = {
    Accept: 'application/json, text/plain, */*',
    ...extraHeaders,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

function safeJson(response) {
  try {
    return response.json()
  } catch (err) {
    return null
  }
}

function extractValue(obj, candidates) {
  if (!obj || typeof obj !== 'object') {
    return null
  }

  for (const key of candidates) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      return obj[key]
    }
  }

  return null
}

function withCorrelatedUser(pathWithQuery, effectiveUser) {
  try {
    const tmp = new URL(pathWithQuery, 'https://placeholder.local')
    if (tmp.searchParams.has('userName')) {
      tmp.searchParams.set('userName', effectiveUser)
    }
    return `${tmp.pathname}${tmp.search}`
  } catch (err) {
    return pathWithQuery
  }
}

function withCorrelatedBody(body, effectiveUser) {
  if (!body || typeof body !== 'string') {
    return body
  }

  try {
    const parsed = JSON.parse(body)
    if (parsed && typeof parsed === 'object' && parsed.userName) {
      parsed.userName = effectiveUser
      return JSON.stringify(parsed)
    }
  } catch (err) {
    return body
  }

  return body
}

export default function () {
  const activeUser = USERS.length ? USERS[(__VU - 1) % USERS.length] : { userName: USERNAME, password: PASSWORD }
  let authToken = null
  let effectiveUser = activeUser.userName

  group('01_signin_and_correlate_auth', () => {
    if (!DO_SIGNIN) {
      return
    }

    const signinPayload = JSON.stringify({
      userName: activeUser.userName,
      password: activeUser.password,
    })

    const signinRes = http.post(`${BASE_URL}/api/signin`, signinPayload, {
      headers: buildAuthHeaders(null, { 'Content-Type': 'application/json;charset=UTF-8' }),
      responseCallback: http.expectedStatuses({ min: 200, max: 499 }),
      tags: { name: 'POST /api/signin' },
    })

    check(signinRes, {
      'signin status is 200': (r) => r.status === 200,
    })

    const signinJson = safeJson(signinRes)
    authToken = extractValue(signinJson, ['token', 'accessToken', 'jwt'])
    effectiveUser = extractValue(signinJson, ['userName', 'username']) || activeUser.userName
  })
  sleep(0.108)

  group('02_get', () => {
    const res = http.get(`${BASE_URL}${'/'}`, {
      headers: buildAuthHeaders(authToken),
      tags: { name: 'GET /' },
    })

    check(res, {
      'status is 200': (r) => r.status == 200,
    })
  })
  sleep(0.523)

  group('03_get__api_products', () => {
    const res = http.get(`${BASE_URL}${'/api/products'}`, {
      headers: buildAuthHeaders(authToken),
      tags: { name: 'GET /api/products' },
    })

    check(res, {
      'status is 200': (r) => r.status == 200,
    })
  })
  sleep(8.076)

  group('04_get__api_products_username_demouser', () => {
    const res = http.get(`${BASE_URL}${withCorrelatedUser('/api/products?userName=demouser', effectiveUser)}`, {
      headers: buildAuthHeaders(authToken),
      tags: { name: 'GET /api/products?userName=demouser' },
    })

    check(res, {
      'status is 200': (r) => r.status == 200,
    })
  })

}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    "summary.txt": textSummary(data, { indent: " ", enableColors: true }),
  }
}
