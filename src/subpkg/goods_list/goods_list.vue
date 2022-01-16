<template>
    <view>
        <view class="goods-list">
            <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
                <my-goods :goods="goods"></my-goods>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            queryObj: {
                query: "",
                cid: "",
                pagenum: 1,
                pagesize: 10,
            },
            goodsList: [],
            total: 0,
            isLoading: false
        };
    },
    onLoad(optinos) {
        this.queryObj.query = optinos.query || "";
        this.queryObj.cid = optinos.cid || "";

        this.getGoodsList();
    },
    methods: {
        async getGoodsList(callback) {
            if(this.isLoading) return

            this.isLoading = true
            if(this.total !== 0 && this.queryObj.pagesize > this.total - this.goodsList.length) {
                this.queryObj.pagesize = this.total - this.goodsList.length
            }
            const { data: res } = await uni.$http.get(
                "/api/public/v1/goods/search",
                this.queryObj
            );
            if (res.meta.status !== 200) {
                return uni.$showMsg();
            }

            this.goodsList = [...this.goodsList, ...res.message.goods];
            this.total = res.message.total;
            this.queryObj.pagenum++
            callback && callback()
            
            if(this.goodsList.length < this.total) {
                this.isLoading = false
            } else {
                uni.$showMsg('数据加载完毕')
            }
        },
        gotoDetail(goods) {
            uni.navigateTo({
                url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
            })
        }
    },
    onReachBottom() {
        this.getGoodsList()
    },
    onPullDownRefresh() {
        this.queryObj.pagenum = 1
        this.queryObj.pagesize = 10
        this.total = 0
        this.isLoading = false
        this.goodsList = []

        this.getGoodsList(uni.stopPullDownRefresh)
    }
};
</script>

<style lang='scss'>
</style>