<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '查询商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div @click="searchAll" class="sort-item">综合</div>
      <div @click="searchBySale" class="sort-item">销量</div>
      <div @click="searchByPrice" class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/apis/product'
export default {
  name: 'ListIndex',
  components: {
    GoodsItem
  },
  computed: {
    // 查询参数
    querySearch () {
      return this.$route.query.search
    },
    paramsData () {
      return {
        sortType: this.sortType,
        sortPrice: this.sortPrice,
        categoryId: this.categoryId,
        goodsName: this.querySearch,
        page: this.page
      }
    }
  },
  data () {
    return {
      sortType: 'all',
      sortPrice: 0,
      categoryId: this.$route.query.categoryId,
      page: 1,
      proList: []
    }
  },
  async created () {
    this.getListData()
  },
  methods: {
    async getListData () {
      const { data: { list } } = await getProList(this.paramsData)
      this.proList = list.data
      // console.log(this.proList)
    },
    // 获取所有相关数据
    searchAll () {
      this.sortType = 'all'
      this.getListData()
    },
    // 通过销量获取
    searchBySale () {
      this.sortType = 'sales'
      this.getListData()
    },
    // 通过价格升序降序
    searchByPrice () {
      this.sortType = 'price'
      this.sortPrice = this.sortPrice ? 0 : 1
      this.getListData()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
