import axios from 'axios'
import Vue from 'vue'
// import store from '../store'
import {getBaseURL} from '@/utils'
// import {getRefreshToken, getToken, setToken} from '@/utils/auth'

const showStatus = (status, msg) => {
    let message = ''
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            return `${msg} (code: ${status})!`
    }
    return `${message}，请检查网络或联系管理员！`
}

export const request = axios.create({
    // 联调
    baseURL: getBaseURL(),
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        put: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        delete: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    },
    // 是否跨站点访问控制请求
    withCredentials: true,
    timeout: 1000000,
    transformRequest: [
        (data) => {
            if (data instanceof FormData) return data
            return JSON.stringify(data)
        },
    ],
    validateStatus() {
        // 使用 async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    transformResponse: [
        (data) => {
            if (typeof data === 'string' && data.startsWith('{')) {
                data = JSON.parse(data)
            }
            return data
        },
    ],
})

// // 刷新 access_token 的接口
// let requests = [] // 存储待重发请求的数组
// let isRefreshing = false // 标记是否正在刷新 token
// const refreshTokenUrl = '/auth/oauth/token?grant_type=refresh_token&scope=server'
// const refreshToken = () => {
//     return request.post(refreshTokenUrl, {
//         refresh_token: getRefreshToken(),
//     })
// }

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // config.headers.VERSION = ''
        // config.headers.ClientId = 'Basic aGVhbHRoOmhlYWx0aA=='
        // const token = getToken()
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // } else {
        //     config.headers.Authorization = 'Basic aGVhbHRoOmhlYWx0aA=='
        // }

        return config
    },
    (error) => {
        // 错误抛到业务代码
        error.data = {}
        error.data.msg = '服务器异常'
        return Promise.resolve(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const status = response.status
        // 刷新token
        // if (status === 401) {
        //     const {config} = response
        //     if (response.config.url.includes(refreshTokenUrl)) {
        //         return Vue.prototype.$alert({persistent: true, title: '温馨提示', content: '您的登录状态已失效，请重新登录！'}).then((res) => {
        //             // store.dispatch('user/clear')
        //         })
        //     }

        //     if (!isRefreshing) {
        //         isRefreshing = true
        //         return refreshToken()
        //             .then((res) => {
        //                 if (res.data.code !== 0) {
        //                     return Vue.prototype
        //                         .$alert({persistent: true, title: '温馨提示', content: '您的登录状态已失效，请重新登录！'})
        //                         .then((res) => {
        //                             // store.dispatch('user/clear')
        //                         })
        //                 }
        //                 const {access_token} = res.data
        //                 setToken(access_token)
        //                 config.headers.Authorization = `Bearer ${access_token}`
        //                 return request(config)
        //             })
        //             .catch((err) => {
        //                 return Vue.prototype
        //                     .$alert({persistent: true, title: '温馨提示', content: '您的登录状态已失效，请重新登录！'})
        //                     .then((res) => {
        //                         store.dispatch('user/clear')
        //                     })
        //             })
        //             .finally(() => {
        //                 isRefreshing = false
        //             })
        //     } else {
        //         // 返回未执行 resolve 的 Promise
        //         return new Promise((resolve) => {
        //             // 用函数形式将 resolve 存入，等待刷新后再执行
        //             requests.push((token) => {
        //                 config.headers.Authorization = `Bearer ${token}`
        //                 resolve(request(config))
        //             })
        //         })
        //     }
        // }

        let msg = ''
        // 处理http错误，抛到业务代码
        if (status < 200 || status >= 300) {
            msg = showStatus(status, response.data.msg)
            if (typeof response.data === 'string') {
                response.data = {msg}
            } else {
                response.data.msg = msg
            }
        }
        return response
    },
    (error) => {
        // 错误抛到业务代码
        console.error(error)
        error.data = {}
        error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
        return Promise.resolve(error)
    }
)
export default request

// 过滤业务
function filterBusinessStatus(data, isAlert = true, resolve, reject) {
    if (!data.code || data.code === 200) return resolve(data)

    isAlert && Vue.prototype.$alert({persistent: true, title: '温馨提示', content: data.msg})

    return reject(data)
}

/**
 * 描述 axios post 请求
 * @param {String} url
 * @param {Object} params
 * @param {Boolean} isAlert 错误弹窗 ｜ 默认：true
 * @returns {Promise}
 */
export function post(url, params, isAlert = true) {
    return new Promise((resolve, reject) => {
        request
            .post(url, params)
            .then((res) => filterBusinessStatus(res.data, isAlert, resolve, reject))
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * @描述: 上传
 * @param {*} url
 * @param {*} params
 * @param {*} isAlert
 * @return {*}
 */
export function upload(url, params, isAlert = true) {
    return new Promise((resolve, reject) => {
        request
            .post(url, params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => filterBusinessStatus(res.data, isAlert, resolve, reject))
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 描述 axios put 请求
 * @param {String} url
 * @param {Object} params
 * @param {Boolean} isAlert 错误弹窗 ｜ 默认：true
 * @returns {Promise}
 */
export function put(url, params, isAlert = true) {
    return new Promise((resolve, reject) => {
        request
            .put(url, params)
            .then((res) => filterBusinessStatus(res.data, isAlert, resolve, reject))
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 描述 axios get 请求
 * @param {String} url
 * @param {Object} params
 * * @param {Boolean} isAlert 错误弹窗 ｜ 默认：true
 * @returns {Promise}
 */
export function get(url, params, isAlert = true) {
    return new Promise((resolve, reject) => {
        request
            .get(url, {params})
            .then((res) => filterBusinessStatus(res.data, isAlert, resolve, reject))
            .catch((error) => {
                reject(error)
            })
    })
}

export function download(url, params) {
    return new Promise((resolve, reject) => {
        request
            .get(url, {params, responseType: 'arraybuffer'})
            .then((res) => res.data)
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 描述 axios delete 请求
 * @param {String} url
 * @param {Object} params
 * * @param {Boolean} isAlert 错误弹窗 ｜ 默认：true
 * @returns {Promise}
 */
export function del(url, params, isAlert = true) {
    return new Promise((resolve, reject) => {
        request
            .delete(url, {params})
            .then((res) => filterBusinessStatus(res.data, isAlert, resolve, reject))
            .catch((error) => {
                reject(error)
            })
    })
}
