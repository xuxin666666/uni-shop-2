<template>
    <view class="login-container">
        <uni-icons type='contact-filled' size='100' color='#afafaf'></uni-icons>
        <button type="primary" class="btn-login" @click="getUserInfo" >
            一键登录
        </button>
        <text class="tips-text">
            登录后尽享更多权益
        </text>
    </view>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
        async getUserInfo() {
            const [err, res] = await uni.getUserProfile({
                desc: 'weixin'
            })

            if(err && err.errMsg === 'getUserProfile:fail auth deny')
                return uni.$showMsg('你取消了登录授权！')

            this.updateUserInfo(res.userInfo)

            this.getToken(res)
        },
        async getToken(info) {
            const [err, res] = await uni.login().catch(err => err)

            if(err || res.errMsg !== 'login:ok')
                return uni.$showMsg('登录失败!')


            this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o')

            const query = {
                code: res.code,
                encrypteData: info.encrypteData,
                iv: info.iv,
                rawData: info.rawData,
                signature: info.signature
            }
            const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
            if(loginResult.meta.status !== 200) {
                return uni.$showMsg('登录失败')
            }
            uni.$showMsg('登录成功')
        }
    }
}
</script>

<style lang='scss'>
.login-container {
    height: 750upx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 40px;
        background-color: white;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 100%;
        transform: translateY(50%);
    }
    .btn-login {
        width: 90%;
        border-radius: 100px;
        margin: 15px 0;
        background-color: #c00000;
    }
    .tips-text {
        font-size: 12px;
    }
}
</style>