<template>
    <view class="my-settle-container">
        <label class="radio">
            <radio color="#c00000" :checked="isFullCheck" @click="changeAllState" />
            <text>全选</text>
        </label>
        <view class="amount-box">
            合计：{{checkedGoodsAmount}}
            <text class="amount">￥</text>
        </view>
        <view class="btn-settle" @click="settlement">
            结算 ({{checkedCount}})
        </view>
    </view>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
    data() {
        return {
            seconds: 3,
            timer: null
        }
    },
    computed: {
        ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
        ...mapGetters('m_user', ['addStr']),
        ...mapState('m_user', ['token']),
        ...mapState('m_cart', ['cart']),
        isFullCheck() {
            return this.checkedCount === this.total
        }
    },
    methods: {
        ...mapMutations('m_cart', ['updateAllGoodsState']),
        changeAllState() {
            this.updateAllGoodsState(!this.isFullCheck)
        },
        settlement() {
            if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
            if(!this.addStr) return uni.$showMsg('请选择收货地址！')
            // if(!this.token) return uni.$showMsg('请先登录！')
            if(!this.token) return this.delayNavigate()

            this.payOrder()
        },
        async payOrder() {
            const orderInfo = {
                // order_price: this.checkedGoodsAmount,
                order_price: 0.01,
                consignee_addr: this.addStr,
                goods: this.cart
                    .filter(x => x.goods_state)
                    .map(x => ({
                        goods_id: x.goods_id,
                        goods_number: x.goods_count,
                        goods_price: x.goods_price
                    }))
            }

            const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
            if(res.meta.status !== 200)
                return uni.$showMsg()

            const orderNumber = res.message.order_number
            console.log(orderNumber)
        },
        delayNavigate() {
            this.seconds = 3
            this.showTips(this.seconds)
            this.timer = setInterval(() => {
                this.seconds--

                if(this.seconds === 0) {
                    clearInterval(this.timer)
                    uni.switchTab({
                        url: '/pages/my/my'
                    })
                    return
                }

                this.showTips(this.seconds)
            }, 1000)
        },
        showTips(n) {
            uni.showToast({
                icon: 'none',
                title: `请登录后再结算！${this.seconds}秒后自动跳转到登录页`,
                mask: true,
                duration: 1500
            })
        }
    }
}
</script>

<style lang='scss'>
.my-settle-container {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    font-size: 14px;
    padding-left: 5px;
    .radio {
        display: flex;
        align-items: center;
    }
    .amount-box {
        .amount {
            color: #c00000;
            font-weight: bold;
        }
    }
    .btn-settle {
        background-color: #c00000;
        height: 50px;
        color: white;
        line-height: 50px;
        padding: 0 10px;
        min-width: 100px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
}
</style>