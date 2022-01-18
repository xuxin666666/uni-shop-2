<template>
    <view class="cart-container" v-if="cart.length">
        <my-address></my-address>
        <view class="cart-title">
            <uni-icons type="shop" size="18" />
            <text class="cart-title-text">购物车</text>
        </view>

        <uni-swipe-action>
            <block v-for="(goods, i) in cart" :key="i">
                <uni-swipe-action-item :rightOptions='options' @click="swipeItemClickHandler(goods)">
                    <my-goods
                        :goods="goods"
                        showRadio
                        showNum
                        @radio-change="radioChangeHandler"
                        @num-change="numberChangeHandler"
                    ></my-goods>
                </uni-swipe-action-item>
            </block>
        </uni-swipe-action>
        <my-settle></my-settle>
    </view>
    <view v-else class="empty-cart">
        <image src='/static/cart_empty@2x.png' class="empty-img" />
        <text class="tip-text">空空如也</text>
    </view>
</template>

<script>
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState, mapMutations } from "vuex";

export default {
    mixins: [badgeMix],
    computed: {
        ...mapState("m_cart", ["cart"]),
    },
    data() {
        return {
            options: [
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#c00000'
                    }
                }
            ]
        };
    },
    methods: {
        ...mapMutations("m_cart", ["updateGoodsState", "updateGoodsCount", 'removeGoodsById']),
        radioChangeHandler(e) {
            this.updateGoodsState(e);
        },
        numberChangeHandler(e) {
            // console.log(e)
            this.updateGoodsCount(e);
        },
        swipeItemClickHandler(goods) {
            // console.log(goods)
            this.removeGoodsById(goods.goods_id)
        }
    },
};
</script>

<style lang='scss'>
.cart-container {
    padding-bottom: 50px;
}
.cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    .cart-title-text {
        font-size: 14px;
        margin-left: 10px;
        border-bottom: 1px solid #efefef;
    }
}
.empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img {
        width: 90px;
        height: 90px;
    }
    .tip-text {
        color: gray;
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>