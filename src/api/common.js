import {get} from './request'



/**
 * 获取歌曲详情
 * @param  id 歌曲id
 * @returns 
 */
export function getSongDetauil(id) {
    return get(`/song/detail?ids=${id}`)
}

/**
 * 获取歌词
 * @param id  歌曲id
 * @returns 
 */
export function getLyric(id) {
    return get(`/lyric?id=${id}`)
}


/**
 * 获取歌曲评论
 * @param id 歌曲id
 * @param limit 取出的数量
 * @param [offset, before]
 * offset: 偏移数量  用于分页
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * 
 * @returns 
 */
export function getSongComment({id, limit}) {
    return get(`/comment/music?id=${id}&limit=${limit}`)
}

/**
 * 评论点赞
 * @param {id} 资源 id, 如歌曲 id,mv id
 * @param {cid} 评论id
 * @param {t} 是否点赞 1==>点赞 0==> 取消点赞
 * @param {type} 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * @returns 
 */
export function voteToComment({id, cid, t, type}) {
    return get(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`)
}

export function sendOrDeleteComment({t, type, id, content, commentId, threadId}) {
    if(threadId) {
        // 删除动态里面的评论
        return get(`/comment?t=0&type=${type}&threadId=${threadId}&commentId=${commentId}`)
    }
    if(commentId) {
        // 删除评论
        return get(`/comment?t=0&type=${type}&id=${id}&content=${content}`)
    }
   
    // 发表评论
    return get(`/comment?t=${t}&type=${type}&id=${id}&content=${content}`)
}

/**
 * 通过歌曲id获取音乐url
 * @param {*} id 
 * @returns 
 */
export function getMusicUrl(id) {
    return get(`/song/url?id=${id}&br=320000`)
}