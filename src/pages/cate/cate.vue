<template>
    <view>
        <view class="scroll-view-container">
            <scroll-view
                :scroll-y="true"
                class="left-scroll-view"
                :style="{height: wh + 'px'}"
            >
                <block v-for="(item, i) in cateList" :key="i">
                    <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChange(i)">
                        {{item.cat_name}}
                    </view>
                </block>
            </scroll-view>
            <scroll-view
                :scroll-y="true"
                class="right-scroll-view"
                :style="{height: wh + 'px'}"
                :scroll-top="scrollTop"
            >
                <block class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
                    <view class="cate-lv2-title">
                        / {{item2.cat_name}} /
                    </view>
                    <view class="cate-lv3-list">
                        <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                            <image :src="item3.cat_icon" />
                            <text>{{item3.cat_name}}</text>
                        </view>
                    </view>
                </block>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            wh: 0,
            cateList: [],
            active: 0,
            cateLevel2: [],
            scrollTop: 0
        };
    },
    onLoad() {
        const sysInfo = uni.getSystemInfoSync();
        // console.log(sysInfo)
        this.wh = sysInfo.windowHeight;

        this.getCateList();
    },
    methods: {
        async getCateList() {
            const { data: res } = await uni.$http.get(
                "/api/public/v1/categories"
            );
            if (res.meta.status !== 200) return uni.$showMsg();

            this.cateList = res.message;

            this.cateLevel2 = res.message[0].children
        },
        activeChange(i) {
            this.active = i

            this.cateLevel2 = this.cateList[i].children
            this.scrollTop = 0.1 - this.scrollTop
        },
        gotoGoodsList(item) {
            uni.navigateTo({
                url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
            })
        }
    },
};
</script>

<style lang='scss'>
.scroll-view-container {
    display: flex;
    // height: 100vh;

    .left-scroll-view {
        width: 120px;
        .left-scroll-view-item {
            background-color: #f7f7f7;
            line-height: 60px;
            text-align: center;
            &.active {
                background-color: #ffffff;
                position: relative;
                &::before {
                    content: "";
                    display: block;
                    width: 3px;
                    height: 30px;
                    background-color: #c00000;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .right-scroll-view {
        .cate-lv2-title {
            font-weight: bold;
            text-align: center;
            padding: 15px 0;
        }
        .cate-lv3-list {
            display: flex;
            flex-wrap: wrap;
            .cate-lv3-item {
                width: 33.3%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 10px;
                image {
                    width: 60px;
                    height: 60px;
                }
                text {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>