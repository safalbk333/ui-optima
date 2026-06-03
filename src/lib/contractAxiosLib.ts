import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const mode = process.env.NEXT_PUBLIC_API_BASE_URL
const isDev = mode === 'development'

const USE_OLD_CODE = isDev // true = direct calls (dev), false = proxy (prod)

console.log(
    '🚀 AxiosLib Mode:',
    USE_OLD_CODE ? 'OLD (Direct)' : 'NEW (Proxy)'
)

// Direct Axios instances (used in dev)
const createDirectAxios = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 30000
    })

    instance.interceptors.request.use(config => {
        const accessToken = window.localStorage.getItem('jwt_access_token')

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
            // config.headers['refreshtoken'] = refreshToken || ''

            try {
                const decoded: any = jwtDecode(accessToken)

                if (decoded?.schema) {
                    config.headers['x-tenant-id'] = decoded.schema
                }
            } catch (err: any) {
                console.error('Error on baseclient', err)
            }
        }

        return config
    })

    return instance
}

export const contractAxiosLib = createDirectAxios(
    process.env.NEXT_PUBLIC_API_BASE_URL as string
)