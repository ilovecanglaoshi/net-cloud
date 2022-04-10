<template>
  <div class="newMusicWrapper">
        <div class="label">
            <span>最新音乐</span>
            <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
        </div>
        <div class="content">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="left" :style="{backgroundImage: 'url(' + item.album.picUrl + ')'}">
                    <div class="btn">
                        <i class="iconfont icon-bofang" ></i>
                    </div>
                </div>
                <div class="center">
                    <div class="no" v-if="isNoPlay">{{formatNo(index)}}</div>
                    <div v-else>
                        <div class="playing" v-if="isPlaying">
                            <i class="iconfont icon-shengyin_shiti" style="color:d33b31"></i>
                        </div>
                        <div class="paused" v-else>
                            <i class="iconfont icon-shengyin_shiti" style="color:d33b31"></i>
                        </div>
                    </div>
                </div>
                <div class="info_right">
                    <div class="name">
                        <div class="mainName">{{item.name}}</div>
                        <div class="subName" v-if="item.alias.length">({{item.alias[0]}})</div>
                    </div>
                    <!--sq  TODO-->
                    <div class="songer">{{item.artists[0].name}}</div>
                </div>
                <div class="videoBtn" v-if="item.mvid"></div>
            </div>
        </div>
  </div>
</template>

<script>
import {getNewMusic} from '@/api/findMusic-personalRecommend'
export default {
    name:'NewMusic',
    data() {
        return {
            list:[],
            isNoPlay: true,
            isPlaying:false
        }
    },
   
    created() {
        this.getList()
    },
    methods:{
        formatNo(no) {
            return no < 9 ? '0' + (no + 1) : no
        },
        async getList() {
            try {
                const result = await getNewMusic({type:0, limit: 10})
                console.log(result, 'result=====');
                this.list = result.data.slice(0, 10)
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .newMusicWrapper{
        margin: auto;
        margin-top: 65px;
        width: 7.4rem;
        max-width: 1040px;
        .label{
            @extend .label;
            margin-bottom: 15px;
        }
        .content{
            @include flex(row, flex-start, center, wrap);
            margin-left: -9px;
            width: 100%;
            .item{
                margin-right: 20px;
                width: 3.45rem;
                max-width: 495px;
                height: 80px;
                padding: 12px 9px;
                box-sizing: border-box;
                border-top: 1px solid #fafafa;
                @include flex(row, flex-start, center);
                &:hover{
                    background-color: #f5f5f5;
                    cursor: pointer;
                }
                .left{
                    width: 60px;
                    height: 60px;
                    border: 4px;
                    background-size: 100% 100%;
                    border-radius: 6px;
                    margin-right: 7px;
                    position: relative;
                    @include flex(row, center, center);
                     .btn {
                        position: absolute;
                        // bottom: 8px;
                        @extend .pauseBtn;
                        // right: 12px;
                        border-radius: 50%;
                        i {
                            @extend .btnI;
                        }
                    }
                }
                .center{
                   color: #d0d0d0;
                   font-size: 12px; 
                   margin-right: 7px
                }
                .info_right{
                    @include flex(column, space-around, flex-start);
                    flex:1;
                    .name{
                        @include flex(row);
                        margin-bottom: 10px;
                        .mainName{
                            color: #838383;
                            font-size: 12px;
                        }
                        .subName{
                            color: #d9d9d9;
                            font-size: 12px;
                        }
                    }
                    .songer{
                        color: #8a8a8a;
                        font-size: 11px;
                    }
                }
            }

        }

    }
</style>