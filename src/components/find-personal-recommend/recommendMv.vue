<template>
  <div class="uniqueWrapper">
    <div class="label">
      <span>推荐MV</span>
      <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
    </div>
    <div class="content">
        <div class="item" v-for="(item, index) in list" :key="index">
            <div class="picWrap" :style="{backgroundImage: 'url(' + item.picUrl + ')'}"></div>
            <div class="des">{{item.name}}</div>
            <div class="btn">
               <div class="infoWrap">
                    <i class="iconfont icon-bofang1"></i>
                    <div class="playCount">{{item.playCount}}</div>
               </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getRecommendMv} from '@/api/findMusic-personalRecommend'
export default {
    name:'unique',
    data() {
        return {
            list:[]
        }
    },
    created() {
        this.getList()
    },  
    methods:{
        async getList() {
           
            try {
                const result = await getRecommendMv()
                console.log(result, 'result');
            this.list = result.result
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .uniqueWrapper{
        margin: auto;
        margin-top: 65px;
        width: 7.4rem;
        max-width: 1040px;
        .label{
            @extend .label;
        }
        .content{
            @include flex(row, center, flex-start);
            width: 100%;
            .item{
                margin-right: 20px;
                position: relative;
                .picWrap{
                    width: 1.7rem;
                    max-width:245px;
                    max-height: 38px;
                    height: .95rem;
                    max-height: 138px;
                    margin-bottom: 10px;
                    border-radius: 6px;
                    background-size: 100% 100%;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .btn{
                    position: absolute;
                    top: 4px;
                    right: 6px;
                    .infoWrap{
                        @include flex(row, flex-start, center);
                         i{
                            font-size:20px;color:rgba(255,255,255,1)
                        }
                        .playCount{
                            color: white;
                            font-size: 12px;
                        }
                    }
                   
                }
                .des{
                    width: 1.7rem;
                    max-width:245px;
                    @include multiEllipsis;
                     color: #575757;
                    font-size: 12px;
                    &:hover {
                        cursor: pointer;
                        color: #333;
                    }
                }
            }
            .item:last-child{
                margin-right: 0;
            }

        }
    }
</style>