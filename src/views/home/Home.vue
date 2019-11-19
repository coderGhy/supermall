<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <scroll class="center" ref="scroll" @scroll="scroll" :scroll="3" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="$refs.scroll.scrollTo(0,0,500)" v-show="isShow"></back-top>
    </div>
</template>
<script>

  import HomeSwiper from "./homeComps/HomeSwiper";
  import RecommendView from "./homeComps/RecommendView";
  import FeatureView from "./homeComps/FeatureView";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop"

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";



  import {getHomeMultidata,getHomeGoods} from "network/home";
  export default {
      data() {
        return {
            banners:[],//轮播图
            recommends:[],//十点抢卷....
            goods: {
                "pop": {
                  page: 0,
                  list: []
                },
                "new": {
                  page: 0,
                  list: []
                },
                "sell": {
                  page: 0,
                  list: []
                },

            },
            currentType: 'pop',
            isShow: false
        }
      },
    components: {
        TabControl,
        HomeSwiper,
        RecommendView,
        FeatureView,
        GoodsList,

        Scroll,
        NavBar,
        BackTop,

    },
    created() {
        this.getHomeMultidata();
        this.getHomeGoods("pop")
        this.getHomeGoods("new")
        this.getHomeGoods("sell")
    },
      mounted() {
          console.log()
      },

      computed:{
          showGoods() {
             return  this.goods[this.currentType].list
          }
      },
      methods: {

          /*
          * 子组建传值
          * */
          tabClick(index) {
              switch (index) {
                  case 0:
                      this.currentType = 'pop'
                      break
                  case 1:
                      this.currentType = 'new'
                      break
                  case 2:
                      this.currentType = 'sell'
                      break
              }
              // console.log(index);
          },
          /*
          * 网络请求函数
          * */
          getHomeMultidata() {
              getHomeMultidata().then(res =>{
                  this.banners = res.data.banner.list
                  this.recommends = res.data.recommend.list
              })
          },
          getHomeGoods(type) {
              const page = this.goods[type].page+1
              getHomeGoods(type,page).then(res=>{
                  this.goods[type].page+=1
                  this.goods[type].list.push(...res.data.list)
                  this.$refs.scroll.finishPullUp()
              })
          },
          scroll(position) {
              // console.log(position);
              this.isShow = -(position.y) > 1000
          },
          loadMore() {
              this.getHomeGoods(this.currentType)
          }
      }
}
</script>
<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
    z-index: 9;
  }
  .center{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
