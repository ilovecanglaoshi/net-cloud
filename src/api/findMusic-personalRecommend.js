import {get} from './request'

/**
 * 
 * @returns 获取发现-个性推荐轮播图
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