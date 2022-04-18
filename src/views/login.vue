<template>
  <div class="loginWrapper">
    <div class="head">
        <div class="closeWrapper" @click="closeWindow">
            <i class="iconfont icon-guanbi close"></i>
        </div>
        <div class="acctountTipWrapper" v-if="isAccountLogin">
            <div class="topRight" @click="checkScanLogin">
                <!-- <img src="../assets/images/erweima.png" alt=""> -->
            </div>
            <div class="tip">扫码登录更安全</div>
        </div>
    </div>
    <div class="scanLogin" v-if="isScanLogin">
      <div class="title">扫码登录</div>
      <div class="qrcodeImg" :style="{backgroundImage: 'url(' + qrImg + ')'}" v-if="!isAuthing">
        <div class="invilidate" v-if="overdue">
          <div>二维码已失效</div>
          <div class="refreshBtn" @click="getQrcodeImg">点击刷新</div>
        </div>
      </div>
      <div class="authing" v-if="isAuthing">
        <div>扫描成功</div>
        <div>请在手机上确认登录</div>
      </div>
      <div class="des" v-if="!isAuthing">
        <span>使用</span>
        <span>网易云音乐app</span>
        <span>扫码登录</span>
      </div>
      <div class="otherWay" @click="selectOtherLoginWay" v-if="!isAuthing">选择其他登录模式 ></div>
    </div>
    <div class="accountLogin" v-if="isAccountLogin">
      <div class="logo">
        <i class="iconfont icon-wangyiyunyinle1"></i>
      </div>
      <div class="iptBox">
        <div class="account">
          <div class="area">
            <i class="iconfont icon-shouji" ></i>
            +86
            <i class="iconfont icon-xiangxia xiala"></i>
          </div>
          <div class="content">
            <input type="number"  placeholder="请输入手机号">
          </div>
        </div>
        <div class="pwd">
          <i class="iconfont icon-mima" style="font-size:18px"></i>
          <input type="password" placeholder="请输入密码">
          <div class="reset" style="color: #c4c4c4;">重设密码</div>
        </div>
      </div>
      <div class="loginBtn">登 录</div>
      <div class="registry" @click="goRegistry">注册</div>
      <div class="otherWay">
        <div>
           <i class="iconfont icon-weixinbg" style="color:#49de6c;font-size:30px"></i>
        </div>
        <div>
          <i class="iconfont icon-QQ" style="color:#2291ff;font-size:28px"></i>
        </div>
        <div>
          <i class="iconfont icon-weibo" style="color:#ed462f;font-size:28px"></i>
        </div>
        <div>
          <i class="iconfont icon-wangyi" style="color:#ed462f;font-size:28px"></i>
        </div>
      </div>
      <div class="protocal">
        <div class="checkbox" :class="isChecked?'checked':''" @click="isChecked = !isChecked">
          <i class="iconfont icon-gou-" style="color:white;font-size:12px" v-if="isChecked"></i>
        </div>
        同意
        <span>《服务条款》</span>
        <span> 《隐私政策》 </span>
        <span> 《儿童隐私政策》 </span>
      </div>
    </div>
    <registry v-if="isRegistry" @checkToAccountLogin='checkToAccountLogin'></registry>
    <div class="modal" v-if="isShowModal">请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》</div>
  </div>
</template>

<script>
import {getQrcodeKey, 
getQrImg,
 getQrcodeStatus,
 checkLoginStatus
} from '@/api/login'
import registry from '@/components/registry'
import {remote} from 'electron'
export default {
  name: 'Login',
  components:{
    registry
  },
  data() {
    return {
      overdue:false, // 二维码过期
      
      isScanLogin: true,
      isAccountLogin: false,
      isRegistry:false,
      isChecked:false,
      isShowModal:false,  // 提示框
      timer:null,
      qrImg:'',
      isAuthing: false, // 二维码登录授权中
    }
  },
  created() {
    this.getQrcodeImg()
  },
  methods:{
    async getQrcodeImg() {
      this.overdue = false
      this.isAuthing = false
      try {
        const keyResult = await getQrcodeKey()
        const key = keyResult.data.unikey
        console.log('二维码key========', key);
        const img = await getQrImg(key)
        this.qrImg = img.data.qrimg
        const time = setInterval(async () => {
          const result = await getQrcodeStatus(key)
          console.log(result, '登录授权情况');
          if(result.code == 800) {
            // 二维码不存在或已过期
            this.isAuthing = false
            this.overdue = true
          }
          if(result.code == 802) {
            // 授权中
            this.isAuthing = true
            this.overdue = false
          }
          if(result.code == 803) {
            //授权成功  查看登录状态
            const statusResult = await checkLoginStatus()
            const userInfo = {account: statusResult.data.account, profile: statusResult.data.profile}
            localStorage.setItem('user_info', JSON.stringify(userInfo))
            // const store = new Store()
            // store.set('user_info', userInfo)
            clearInterval(time)
            this.isAuthing = false
            // 通知窗口关闭
            remote.getCurrentWindow().close()
            
            
          }

        }, 4000);
      } catch (error) {
        console.log(error);
      }

    },
      checkToAccountLogin() {
        this.isAccountLogin = true
        this.isRegistry = false
      },
      checkScanLogin() {
          this.isScanLogin = true
          this.isAccountLogin = !this.isScanLogin
      },
      selectOtherLoginWay() {
          this.isScanLogin = false
          this.isAccountLogin = !this.isScanLogin
      },
      closeWindow() {

        remote.getCurrentWindow().close()
      },
      goRegistry() {
        if(this.timer) return;
        if(!this.isChecked) {
          this.isShowModal = true
          this.timer = setTimeout(() => {
            this.isShowModal = false
            clearTimeout(this.timer)
            this.timer = null
          }, 2000);
          return
        }
        this.isScanLogin = false
        this.isAccountLogin = false
        this.isRegistry = true
      }
  }
}
</script>

<style lang="scss" scoped>
.loginWrapper {
  padding: 10px;
  position: relative;
  .head {
      width: 100%;
    height: 40px;
    -webkit-app-region: drag;
    // @include flex(row, space-between, flex-start);
    
   .closeWrapper{
       @include flex(row, flex-start, flex-start);
      //  width: 30px;
      //  height: 30px;
       &:hover{
         cursor: pointer;
       }
      i:hover{
            
            color: red;
        }
   }
    .acctountTipWrapper{
        position: relative;
        .topRight{
        
        position: absolute;
        top: -20px;
        right:-5px;
        // padding: 5px;
        // border: 1px solid red;
        width: 50px;
        height: 50px;
        background-image: url('../assets/images/erweima.png');
        background-size: 100% 100%;
        &:hover{
                cursor: pointer;
            }
        
    }
    .tip{
        position: absolute;
        width: 110px;
        background-color: #a3a3a3;
        // border-radius: 4px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        right: 45px;
        top: -12px;
        color: white;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        &::after{
            content: '';
            display: block;
            position: absolute;
            // width: 5px;
            // height: 5px;
            top: 0;
            right: -6px;
            // background-color: red;
            width: 0;
            height: 0;
            border-top: 5px solid #a3a3a3;
            border-right: 5px solid transparent;
        }
    }
    }
  }
  .scanLogin {
    margin-top: 28px;
    @include flex(column, center, center);
    .title {
      color: #333;
      font-size: 28px;
      margin-bottom: 35px;
    }
    .qrcodeImg {
      width: 180px;
      height: 180px;
      // border: 1px solid red;
      margin-bottom: 20px;
      background-size: 100% 100%;
      .invilidate{
        background-color: rgba($color: #000, $alpha: .7);
        width: 100%;
        height: 100%;
        @include flex(column, center, center);
        div:nth-child(1) {
          color: white;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .refreshBtn{
          width: 80px;
          height: 30px;
          color: white;
          background-color: #d33b31;
          text-align: center;
          line-height: 30px;
          border-radius: 15px;
        }
      }
    }
    .des {
      font-size: 14px;
      color: #555;
      span:nth-child(2) {
        color: #4892cf;
      }
    }
    .otherWay {
      margin-top: 90px;
      color: #858484;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .accountLogin {
    @include flex(column, flex-start, center);
    .logo{
      margin-top: 30px;
      margin-bottom: 55px;
      // text-align: center;
      i{
        color: #f63a3a;
        font-size: 60px;
      }
    }
    .iptBox{
      width: 260px;
      height: 80px;
      border: 1px solid #dfddde;
      border-radius: 8px;
      @include flex(column, flex-start, flex-start);
      .account{
        flex:1;
        width: 100%;
        border-bottom: 1px solid #dfddde;
        @include flex(row, flex-start,center);
        .area{
          width: 90px;
          height: 100%;
          border-right: 1px solid #dfddde;
          padding: 0 5px;
          
           @include flex(row, space-between,center);
          i{
            font-size: 20px;
            color: #999;
          }
          .xiala{
            color: #999;
            font-size: 12px;
            padding-top: 1px
          }

        }
        .content{
          @include flex(row, flex-start,center);
          padding: 0 5px;
          input{
            outline: none;
            border: none;
          }
          input::placeholder{
            color:#c4c4c4;
            font-size:12px;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
              -webkit-appearance: none;
          }
        }
      }
      .pwd{
        padding: 0 8px;
        flex:1;
        width: 100%;
        i{
          color: #999;
        }
        @include flex(row, flex-start, center);
        input{
          flex:1;
          border: none;
          outline: none;
          margin-left: 5px;
        }
        input::placeholder{
            color:#c4c4c4;
            font-size:12px;
          }
      }
    }
    .loginBtn{
      margin-top: 40px;
      width: 260px;
      height: 40px;
      color: white;
      background-color: #f63a3a;
      border-radius: 6px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
    }
    .loginBtn:hover{
      background-color: rgba($color: #f63a3a, $alpha: .6);
    }
    .registry{
      margin-top: 14px;
      font-size: 14px;
      text-decoration: underline;
      &:hover{
        cursor: pointer;
      }
    }
    .otherWay{
      width: 260px;
      padding: 0 8px;
      margin-top: 20px;
      @include flex(row, space-between, center);
      div:hover{
        cursor: pointer;
      }
    }
    .protocal{
      margin-top: 45px;
      width: 260px;
      padding: 0 8px;
      color: #999;
      font-size: 10px;
      @include flex(row, flex-start, center);
      .checkbox{
        width: 10px;
        height: 10px;
        border-radius: 2px;
        border: 1px solid #999;
        @include flex(row, center, center);
        margin-right: 5px;
      }
      .checked{
        border: none;
        background-color: #d33b31;
      }
      span:first-of-type{
        margin-left:5px;
      }
      span{
        color: #7799c0;
        font-size: 10px;
        margin-right: 1px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
   .modal{
    width: 270px;
    border-radius: 8px;
    height: 72px;
    background-color: rgba($color: #464646, $alpha: .6);
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    padding: 0 5px;
    transform: translate(-50%, -50%);
  }
}
</style>
