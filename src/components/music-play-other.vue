<template>
  <div class="musicPlayWrapper">
    <div class="wrapper">
      <div class="musicInfoRel">
        <div class="left">
          <div class="niddle"></div>
          <div class="pan">
            <div class="card">
              <div class="imageWrapper">
                <div class="img"></div>
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
          <div class="lyricInfo">
            <div class="lyric"></div>
            <div class="acc">
              <div class="top">
                <div class="up">
                  <i class="iconfont icon-shang"></i>
                </div>
                <div class="down">
                  <i class="iconfont icon-xia"></i>
                </div>
              </div>
              <div class="bottom">
                ?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commonAndOther">
      <div class="commonWrapper">
        <div class="common">
          <div class="title">
            <span>听友评论</span>
            <span>(已有442条评论)</span>
          </div>
          <div class="ipt">
            <div class="pencile">
              <i class="iconfont icon-huabi"></i>
            </div>
            <input type="text" placeholder="发表评论" />
            <div class="aite">
              <i class="iconfont icon-aite1"></i>
            </div>
          </div>
        </div>
        <div class="wonderfulCommon">
          <div class="title">精彩评论</div>
          <div class="commonList">
            <div class="item" v-for="i of 4" :key="i">
              <div class="icon"></div>
              <div class="rightContent">
                <div class="commonContent">
                  <span class="nickname">用户姓名用户姓名：</span>
                  来了来了，前奏旋律响起的同时就已经大爱了，听完整首歌，歌词非常的戳中我，王赛非常的温暖腔调，诠释为什么要拥抱，为什么需要拥抱它，为什么需要被拥抱，太鼓舞人心了。16岁.每次发歌都让我不断的刷新对她的认识，进步确实是留给努力的孩子，就如歌名一样——我们未输给过距离
                </div>
                <div class="otherInfo">
                  <div class="time">4月4日 10:22</div>
                  <div class="operate">
                    <div class="vote">
                      <i class="iconfont icon-dianzan1"></i>
                      200
                    </div>
                    <div class="share">
                      <i class="iconfont icon-fenxiang2"></i>
                    </div>
                    <div class="write">
                      <i class="iconfont icon-liuyan-duandian"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend">
        <div class="title">相似歌曲</div>
        <div class="recommendList">
          <div class="item" v-for="i of 5" :key="i">
            <div class="img">
              <img src="../assets/images/OIP-C.jpeg" alt="">
              <div class="icon">
                <i class="iconfont icon-bofang"></i>
              </div>
            </div>
            <div class="info">
              <div class="top">
                <span class="name">我们从未输给过距离</span>
                <span class="alias">(别名别名别名别名别名别名)</span>
              </div>
              <div class="songer">
                歌手姓名
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.musicPlayWrapper {
  background-color: #f8f8f8;
  padding-bottom: 220px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  overflow-y: scroll;
  .wrapper {
    width: 820px;
    margin: auto;
  }
  .musicInfoRel {
    height: 470px;
    // border: 1px solid red;
    height: 480px;
    @include flex(row, flex-start, center);
    .left {
      width: 330px;
      margin-right: 65px;
      height: 100%;
      // border: 1px solid black;
      position: relative;
      .niddle {
        position: absolute;
        height: 150px;
        width: 94px;
        left: 42%;
        top: -10px;
        // transform: translateX(-50%);
        background-size: 100% 100%;
        background-image: url('../assets/images/ic_needle.png');
      }
      .pan {
        width: 330px;
        margin-top: 75px;
        background-color: #e3e3e3;
        // background-image: url('../assets/images/ic_disc.png');
        border-radius: 50%;
        overflow: hidden;
        height: 330px;
        @include flex(row, center, center);
        .card {
          width: 315px;
          height: 315px;
          border-radius: 50%;
          background-size: 100% 100%;
          background-image: url('../assets/images/ic_disc.png');
          @include flex(row, center, center);
          .imageWrapper {
            @include flex(row, center, center);
            width: 220px;
            background-color: black;
            height: 220px;
            border-radius: 50%;
            .img {
              @include flex(row, center, center);
              width: 205px;
              height: 205px;
              border-radius: 50%;
              overflow: hidden;
              background-size: 100% 100%;
              background-image: url('../assets/images/OIP-C.jpeg');
            }
          }
        }
      }
      .operate {
        @include flex(row, space-around, center);
        position: absolute;
        width: 100%;
        padding-bottom: 5px;
        bottom: 0;
        div {
          @include flex(row, center, center);
          i {
            font-size: 20px;
            color: #696969;
          }
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f1f1f1;
          &:hover {
            background-color: #e1e1e1;
          }
        }
      }
    }
    .right {
      flex: 1;
      // border: 1px solid blue;
      height: 100%;
      overflow: hidden;
      .songinfoHead {
        margin-top: 35px;
        .nameWrapper {
          font-size: 24px;
          // font-weight: bold;
          color: #000;
          @include flex(row, flex-start, center);
          .quality {
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
            .arrow {
              position: absolute;
              width: 9px;
              height: 9px;
              top: -5px;
              background-color: white;
              left: 40%;

              @include flex(row, center, center);
              i {
                color: #d75248;
                font-size: 10px;
              }
            }
          }
        }
        .albumInfo {
          margin-top: 18px;
          width: 380px;

          @include flex(row, flex-start, center);
          .album,
          .songer,
          .source {
            @include flex(row, flex-start, center);
            margin-right: 5px;
            flex: 1;
            // margin-right: 4px;
            // width: 33.333%;
            .label-album {
              color: #9c9b9b;
              // margin-right: 4px;
              font-size: 12px;
              width: 38px;
            }
            .des {
              color: #7c9cc2;
              width: 85px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
      .lyricInfo {
        margin-top: 30px;
        @include flex(row, flex-start, center);
        height: 350px;

        .lyric {
          height: 100%;
          width: 380px;
          border-right: 1px solid #eaeaea;
          margin-right: 10px;
        }
        .acc {
          height: 350px;
          @include flex(column, space-between, center);
          .top {
            .up,
            .down {
              @include flex(row, center, center);
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: #e2e2e2;
              margin-bottom: 10px;
              &:hover {
                background-color: #d9d9d9;
              }
              i {
                color: white;
              }
            }
          }
          .bottom {
            width: 20px;
            border-radius: 50%;
            background-color: #e2e2e2;
            color: white;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
            margin-bottom: 5px;
            &:hover {
              background-color: #d9d9d9;
            }
          }
        }
      }
    }
  }
}
.commonAndOther {
  width: 880px;
  margin: auto;
  margin-top: 65px;
  // height: 500px;
  // border: 1px solid red;
  @include flex(row, flex-start, flex-start);
  .commonWrapper {
    margin-right: 40px;
    .common {
      .title {
        margin-bottom: 13px;
        span:nth-child(1) {
          color: #000;
          font-size: 18px;
          margin-right: 15px;
        }
        span:last-child {
          color: #9c9b9b;
        }
      }
      .ipt {
        width: 570px;
        height: 35px;
        background-color: white;
        border: 1px solid #dddddd;
        border-radius: 4px;
        padding: 0 5px;
        @include flex(row, flex-start, center);
        .pencile i {
          color: #ddd;
          font-size: 20px;
        }
        input {
          border: none;
          outline: none;
          margin-left: 5px;
          flex: 1;
        }
        input::placeholder {
          color: #dddddd;
        }
        .aite {
          margin-right: 2px;
          i {
            color: #686868;
            font-size: 18px;
          }
        }
      }
    }
    .wonderfulCommon {
      margin-top: 45px;

      .title {
        color: #000;
        font-size: 14px;
        margin-bottom: 20px;
      }
      .item {
        margin-bottom: 15px;
        width: 570px;
        @include flex(row, space-between);
        .icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: red;
          margin-right: 15px;
        }
        .rightContent {
          flex: 1;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e8e7;
          .commonContent {
            margin-bottom: 10px;
            font-size: 13px;
            color: #444;
            .nickname {
              color: #5983b2;
            }
          }
          .otherInfo {
            @include flex(row, space-between, center);
            .time {
              color: #a9a9a9;
            }
            .operate {
              @include flex(row, flex-start, center);
              color: #a9a9a9;
              .vote,
              .share {
                margin-right: 23px;
              }
              .vote i {
                font-size: 17px;
              }
              .share i {
                font-size: 14px;
              }
              .write {
                @include flex(row, center, center);
                i {
                  font-size: 17px;
                }
              }
            }
          }
        }
      }
    }
  }
  .recommend{
    .title{
      font-size: 18px;
      color: #000;
      margin-bottom: 15px;
    }
    .recommendList{
      .item{
        width: 270px;
        height: 60px;
        border-radius: 8px;
        padding: 5px;
        @include flex(row, flex-start, center);
        .img{
          width: 50px;
          height: 50px;
          border-radius:5px;
          overflow: hidden;
          // background-color: red;
          img{
            width: 100%;
            height: 100%;
          }
          margin-right: 10px;
          position: relative;
          .icon{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: rgba($color: #fff, $alpha: .6);
            i{
              @include btn_1(0.8);
            }
          }
        }
        &:hover{
          background-color: #e6e7e8;
        }
        .info{
          @include flex(column, center, flex-start);
          .top{
            // width: 195px;
            @include no-wrap(195px);
            margin-bottom: 5px;
            .name{
              color: #686868;
              font-size: 13px;
            }
            .alias{
              color: #acadad;
            }
          }
          .songer{
            color: #acadad;
          }
        }
      }
    }
  }
}

</style>
