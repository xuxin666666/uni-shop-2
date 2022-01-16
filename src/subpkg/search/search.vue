<template>
    <view>
        <view class="search-box">
            <uni-search-bar @input="input" :radius='100' cancelButton='none' placeholder="请输入搜索内容" focus></uni-search-bar>
        </view>
        <view class="sugg-list" v-if="searchResults.length !== 0">
            <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
                <view class="goods-name">
                    {{item.goods_name}}
                </view>
                <uni-icons type='arrowright' size='16'></uni-icons>
            </view>
        </view>
        <view class="history-box" v-else>
            <view class="history-title">
                <text>搜索历史</text>
                <uni-icons type='trash' size='18' @click="clear" />
            </view>
            <view class="history-list">
                <uni-tag v-for="(item, i) in historyList" :key="i" :text='item' @click="gotoGoodsList(item)"></uni-tag>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            kw: '',
            searchResults: [],
            historyList: []
        }
    },
    onLoad() {
        this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
        input(e) {
            clearTimeout(this.timer)
            // console.log(e)
            this.timer = setTimeout(() => {
                this.kw = e.value.trim()
                this.getSearchList()
            }, 500)
        },
        async getSearchList() {
            if(this.kw.length === 0) {
                this.searchResults = []
                return
            }
            const {data: res} = await uni.$http.get(
                '/api/public/v1/goods/qsearch', 
                {query: this.kw}
            )
            if(res.meta.status !== 200) {
                return uni.$showMsg()
            }
            this.searchResults = res.message

            this.saveSearchHistory()
        },
        gotoDetail(item) {
            uni.navigateTo({
                url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
            })
        },
        saveSearchHistory() {
            var set
            this.historyList.unshift(this.kw)
            set = new Set(this.historyList)
            this.historyList = [...set]

            uni.setStorageSync('kw', JSON.stringify(this.historyList))
        },
        clear() {
            this.historyList = []
            uni.setStorageSync('kw', '[]')
        },
        gotoGoodsList(kw) {
            uni.navigateTo({
                url: '/subpkg/goods_list/goods_list?query=' + kw
            })
        }
    }
}
</script>

<style lang='scss'>
.search-box {
    position: sticky;
    top: 0;
    z-index: 999;
}
.sugg-list {
    padding: 0 5px;
    .sugg-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font: 14px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
        .goods-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
.history-box {
    padding: 0 5px;
    .history-title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        border-bottom: 1px solid #efefef;
    }
    .history-list {
        display: flex;
        flex-wrap: wrap;
        .uni-tag {
            margin: 5px 5px 0 0;
        }
    }
}
</style>