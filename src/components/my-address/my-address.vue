<template>
    <view>
        <view class="address-choose-box" v-if="!address.userName">
            <button
                type="primary"
                size="mini"
                class="btnChooseAddress"
                @click="chooseAddress"
            >请选择收货地址+</button>
        </view>
        <view class="address-info-box" v-else @click="chooseAddress">
            <view class="row1">
                <view class="row1-left">
                    <view class="username">收货人：{{address.userName}}</view>
                </view>
                <view class="row2-right">
                    <view class="phone">电话：{{address.telNumber}}</view>
                    <uni-icons type="arrowright" size="16"></uni-icons>
                </view>
            </view>
            <view class="row2">
                <view class="row2-left">收货地址：</view>
                <view class="row2-right">{{addStr}}</view>
            </view>
        </view>
        <image src="/static/cart_border@2x.png" class="address-border" />
    </view>
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex'

export default {
    data() {
        return {
            // address: {},
            
        };
    },
    computed: {
        ...mapState('m_user', ['address']),
        ...mapGetters('m_user', ['addStr'])
    },
    methods: {
        ...mapMutations('m_user', ['updateAddress']),
        async chooseAddress() {
            const [err, succ] = await uni.chooseAddress().catch((err) => err);

            if (!err && succ.errMsg === "chooseAddress:ok") {
                // console.log(succ)
                // this.address = succ;
                this.updateAddress(succ)
            }
        },
    },
};
</script>

<style lang='scss'>
.address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.address-info-box {
    font-size: 14px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    .row1 {
        display: flex;
        justify-content: space-between;
        .row1-left {
            .username {
            }
        }
        .row2-right {
            display: flex;
            justify-content: space-between;
            .phone {
            }
        }
    }
    .row2 {
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        margin-top: 10px;
        .row2-left {
            white-space: nowrap;
        }
        .row2-right {
        }
    }
}
.address-border {
    display: block;
    width: 100%;
    height: 5px;
}
</style>