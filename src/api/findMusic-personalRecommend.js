import {get} from './request'

/**
 * 
 * @returns 获取发现-个性推荐轮播图
 * 0 => pc
 */
export function getBanner() {
   return get('/banner?type=0')
}
/**
 * 获取推荐歌单
 */
export function getRecommendSongList() {
   return get('/personalized?limit=9')
}


/**
 * 独家放送
 * limit:  size
 * offset: skip
 */

export function getUnique({limit, offset}) {
   return get(`/personalized/privatecontent/list?limit=${limit}&offset=${offset}`)
}


/**
 * 最新音乐
 * type:
 * 0: 全部
 * 7: 华语
 * 96: 欧美
 * 8:日本
 * 16: 韩国
*/

export function getNewMusic({type, limit}) {
   return get(`/top/song?type=${type}&limit=${limit}`)
}

/**
 * 推荐mv
 */
export function getRecommendMv() {
   return get(`/personalized/mv`)
}

/**
 * 获取每日推荐歌单
 */
export function getDayRecommendSongList() {
   return get('/recommend/songs')
}


/**
 * 获取历史日推
 */
export function getHistoryDayrecommend() {
   return get('/history/recommend/songs')
}