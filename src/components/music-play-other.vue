<template>
  <div class="musicPlayWrapper">
    <div class="wrapper">
      <div class="musicInfoRel">
        <div class="left">
          <div class="niddle"></div>
          <div class="pan">
            <div class="card">
              <div class="imageWrapper">
                <div class="img">

                </div>
              </div>
            </div>
          </div>
          <div class="operate">
            <div>
              <i class="iconfont icon-aixin"></i>
            </div>
             <div>
              <i class="iconfont icon-xinjianwenjianjia"></i>
            </div>
            <div>
              <i class="iconfont icon-xiazai"></i>
            </div>
              <div>
              <i class="iconfont icon-fenxiang1"></i>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="songinfoHead">
            <div class="nameWrapper">
              <div class="name">我们从未输给过距离</div>
              <div class="quality">
                <span>标准音质</span>
                <div class="arrow">
                  <i class="iconfont icon-jiantouxiangshang"></i>
                </div>
              </div>
            </div>
            <div class="albumInfo">
              <div class="album">
                <div class="label-album">专辑：</div>
                <div class="des">我们从未输给过距离</div>
              </div>
              <div class="songer">
                <div class="label-album">歌手：</div>
                <div class="des">我们从未输给过距离</div>
              </div>
              <div class="source">
                <div class="label-album">来源：</div>
                <div class="des">我们从未输给过距离</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="commonAndOther">
        <div class="common"></div>
        <div class="recommend"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.musicPlayWrapper {
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  .wrapper{
    width: 820px;
    margin: auto;
  }
  .musicInfoRel {
    height: 470px;
    border: 1px solid red;
    height: 480px;
    @include flex(row, flex-start, center);
    .left {
      width: 330px;
      margin-right: 65px;
      height: 100%;
      // border: 1px solid black;
      position: relative;
      .niddle{
        position: absolute;
        height: 150px;
        width: 94px;
        left: 42%;
        top: -10px;
        // transform: translateX(-50%);
        background-size: 100% 100%;
        background-image: url('../assets/images/ic_needle.png');
      }
      .pan{
        width: 330px;
        margin-top: 75px;
        background-color: #e3e3e3;
        // background-image: url('../assets/images/ic_disc.png');
        border-radius: 50%;
        overflow: hidden;
        height:330px;
        @include flex(row, center, center);
        .card{
          width: 315px;
          height: 315px;
          border-radius:50%;
          background-size: 100% 100%;
          background-image: url('../assets/images/ic_disc.png');
          @include flex(row, center, center);
          .imageWrapper{
            @include flex(row, center, center);
            width: 220px;
            background-color: black;
            height: 220px;
            border-radius: 50%;
            .img{
              @include flex(row, center, center);
               width: 205px;
              height: 205px;
              border-radius: 50%;
              overflow: hidden;
              background-size: 100% 100%;
              background-image: url('../assets/images/OIP-C.jpeg')
            }
          }
        }
      }
      .operate{
        @include flex(row, space-around, center);
        position: absolute;
        width: 100%;
        padding-bottom: 5px ;
        bottom: 0;
        div{
          @include flex(row, center, center);
          i{
            font-size: 20px;
            color: #696969;
          }
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f1f1f1;
          &:hover{
            background-color: #e1e1e1;
          }
        }
      }
    }
    .right {
      flex:1;
      border: 1px solid blue;
      height: 100%;
      overflow: hidden;
      .songinfoHead{
        margin-top: 35px;
        .nameWrapper{
          font-size: 24px;
          // font-weight: bold;
          color: #000;
          @include flex(row, flex-start, center);
          .quality{
            width: 62px;
            height: 20px;
            border: 1px solid #d75248;
            text-align: center;
            line-height: 20px;
            color: #d75248;
            font-size: 12px;
            border-radius: 4px;
            position: relative;
            margin-left: 10px;
            .arrow{
              position: absolute;
              width: 9px;
              height: 9px;
              top: -5px;
              background-color: white;
              left: 40%;

              @include flex(row, center, center);
              i{
                color: #d75248;
                font-size: 10px;
              }
            }
          }
        }
        .albumInfo{
          margin-top: 18px;
          width: 100%;
          @include flex(row, flex-start, center);
          .album,.songer,.source{
            @include flex(row, flex-start, center);
            margin-right: 5px;
            // margin-right: 4px;
            // width: 33.333%;
            .label-album{
              color: #9c9b9b;
              // margin-right: 4px;
              font-size: 12px;
              width: 36px;
            }
            .des{
              color: #7c9cc2;
              width: 100px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
