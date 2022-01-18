<template>
    <view>
        <view class="search-box">
            <my-search @click.native="gotoSearch"></my-search>
        </view>
        <swiper indicator-dots autoplay :interval="3000" :duration="1000" circular>
            <swiper-item v-for="(item, i) in swiperList" :key="i">
                <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
                    <image :src="item.image_src" />
                </navigator>
            </swiper-item>
        </swiper>
        <view class="nav-list">
            <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
                <image :src='item.image_src' class="nav-img" />
            </view>
        </view>
        <view class="floor-list">
            <view class="floor-item" v-for="(item, i) in floorList" :key="i">
                <image :src="item.floor_title.image_src" class="floor-title" />
                <view class="floor-img-box">
                    <navigator class="left-box" :url="item.product_list[0].url">
                        <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix" />
                    </navigator>
                    <view class="right-box">
                        <template v-for="(item2, i2) in item.product_list">
                            <navigator v-if="i2 !== 0" :key="i2" :url="item2.url">
                                <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
                            </navigator>
                        </template>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'

export default {
    mixins: [badgeMix],
    data() {
        return {
            swiperList: [],
            navList: [],
            floorList: []
        };
    },
    // computed: {
    //     rightImgs: function() {
    //         return this.floorList.filter
    //     }
    // },
    onLoad() {
        this.getSwiperList();
        this.getNavList()
        this.getFloorList()
    },
    methods: {
        async getSwiperList() {
            const { data: res } = await uni.$http.get(
                "/api/public/v1/home/swiperdata"
            );
            if (res.meta.status !== 200) 
                return uni.$showMsg()
            this.swiperList = res.message;
        },
        async getNavList() {
            const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
            if(res.meta.status !== 200)
                return uni.$showMsg()
            this.navList = res.message
        },
        navClickHandler(item) {
            if(item.name === '分类') {
                uni.switchTab({
                    url: '/pages/cate/cate'
                })
            }
        },
        async getFloorList() {
            const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
            if(res.meta.status !== 200)
                return uni.$showMsg()

            res.message.forEach(floor => {
                floor.product_list.forEach(prod => {
                    prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
                })
            })
            this.floorList = res.message
        },
        gotoSearch() {
            uni.navigateTo({
                url: '/subpkg/search/search'
            })
        }
    },
};
</script>

<style lang='scss'>
.search-box {
    position: sticky;
    top: 0;
    z-index: 999;
}
swiper {
    height: 330upx;
    .swiper-item,
    image {
        width: 100%;
        height: 100%;
    }
}
.nav-list {
    display: flex;
    justify-content: space-around;
    margin: 30upx 0;
    .nav-img {
        width: 128upx;
        height: 140upx;
    }
}
.floor-list{
    .floor-title {
        width: 100%;
        height: 60upx;
    }
    .floor-img-box {
        display: flex;
        padding-left: 10upx;
        .right-img-item {
            width: 0;
            /* height: 0; */
        }
        .right-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
    }
}
</style>