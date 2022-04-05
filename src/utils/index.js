/**
 * 描述 获取环境 BaseURL
 * @param {any} env=process.env.NODE_ENV
 * @returns {any}
 */
 export const getBaseURL = function(env = process.env.NODE_ENV) {
    let url;
    switch (env) {
        case 'development':
            url  =  '/dev-api'
            break
        case 'production':
            url = '/pro-api'
            break
        default:
            url = '/test'
    }
    return url
}