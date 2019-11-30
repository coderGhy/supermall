<template>
    <div class="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-images-info :detailInfo="detailInfo"></detail-images-info>
        <detail-params-info :paramInfo="paramInfo" />
        <detail-commont-info :commentInfo="commentInfo" />
        <goods-list :goods="recommends"/>
      </scroll>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailImagesInfo from "./childComps/DetailImagesInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommontInfo from "./childComps/DetailCommontInfo";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
  import {itemListenerMixin} from "common/mixin"
  import GoodsList from "components/content/goods/GoodsList";

  import Scroll from "components/common/scroll/Scroll";

  export default {
        name: "Detail",
        data() {
            return {
              iid: null,
              topImages: [],
              goods: {},
              shop: {},
              detailInfo: {},
              paramInfo : {},
              commentInfo: {},
              recommends: [],

            }
        },
      components: {
          DetailShopInfo,
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailImagesInfo,
          DetailParamsInfo,
          DetailCommontInfo,
          Scroll,

          GoodsList
      },
      created() {
            //1.进行获取点击路由的iid
            this.iid = this.$route.params.iid
            //2.发送网络请求获取数据
            getDetail(this.iid).then(res=>{
                const data = res.result
                //存储轮播图图片
                this.topImages = res.result.itemInfo.topImages
                // 存储商品基础信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //存储店铺信息
                this.shop = new Shop(data.shopInfo)
                //存储商品详细信息
                this.detailInfo = data.detailInfo
                //获取商品参数
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                //获取评论信息
                if(data.rate.cRate){
                    this.commentInfo = data.rate.list[0]
                }


            })
            getRecommend().then(res=>{
              this.recommends = res.data.list
            })
        },
      mixins: [itemListenerMixin],
      destroyed() {
            this.$bus.$off('itemImageLoad',this.itemImageListener)
      }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
