<template>
    <view class="my-search-container" :style="{'background-color': bgColor}">
        <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
            <uni-icons type="search" size="18"></uni-icons>
            <text class="placeholder">搜索</text>
        </view>
    </view>
</template>

<script>

export default {
    props: {
        bgColor: {
            type: String,
            default: '#c00000'
        },
        radius: {
            type: Number,
            default: 18
        }
    },
    data() {
        return {};
    },
};
</script>

<style lang='scss'>
.my-search-container {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .my-search-box {
        height: 36px;
        background-color: #ffffff;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .placeholder {
            margin-left: 5px;
        }
    }
}
</style>