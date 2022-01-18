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
        <view class="btn-settle">
            结算 ({{checkedCount}})
        </view>
    </view>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
        isFullCheck() {
            return this.checkedCount === this.total
        }
    },
    methods: {
        ...mapMutations('m_cart', ['updateAllGoodsState']),
        changeAllState() {
            this.updateAllGoodsState(!this.isFullCheck)
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