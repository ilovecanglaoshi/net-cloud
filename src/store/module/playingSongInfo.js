// 正在播放的歌曲信息
const modulePLayingSongInfo = {
    namespaced:true,
    state:{
        isPlaying: false,
        type: '', // 正在播放的音乐类型
        info:{
            name:'',
            id:'',
            ar:[],
            alia:'',
            fee:-1,
            mv:0,
            dt:0,
            al:{}
        }

    },
    getters:{

    },
    mutations:{
        // 更新正在播放的歌曲信息
        updatePLaying(state, payload) { 
            state.isPlaying = true
            state.type = payload.type
            state.info = payload.info
        },
        updateStatus(state, payload) {
            state.isPlaying = payload
        }
    },
    actions:{

    }
}
export default modulePLayingSongInfo