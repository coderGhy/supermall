<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行', '新款', '精选']" ref="tabcontrol1"
                   class="tabControl"
                   @tabClick="tabClick"
                   v-show="this.tabControlShow"></tab-control>

      <scroll class="center" ref="scroll" @scroll="scroll" :scroll="3" :pull-up-load="true" @pullingUp="loadMore" >
        <home-swiper :banners="banners" @SwiperImageLoad="SwiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选']" ref="tabcontrol2" @tabClick="tabClick"></tab-control>
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

  import {itemListenerMixin} from "common/mixin";
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
            isShow: false,
            tabControl: 0,
            tabControlShow: null,
            saveY: 0,
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
      /*
      * 切换views保持位置
      * 可能有的butter-scroll不好用
      * 使用路由回调函数进行设置
      * */
      destroyed() {
          console.log('home destroyed');

      },
      mixins:[itemListenerMixin],
      activated() {

          /*
          * 因为轮播图的问题 具体问题不知道
          * */
          this.$refs.scroll.refresh()  //进行重新计算页面滑动高度 减少误差

          this.$refs.scroll.scrollTo(0, this.saveY,0)

      },
      deactivated() {
        // this.saveY = this.$refs.scroll.bscroll.y
          this.saveY = this.$refs.scroll.getScrollY()
          this.$bus.$off('itemImageLoad',this.itemImageLoad)
      },

      /*----------------------------------------*/
      created() {
        this.getHomeMultidata();
        this.getHomeGoods("pop")
        this.getHomeGoods("new")
        this.getHomeGoods("sell")

    },


      computed:{
          showGoods() {
             return  this.goods[this.currentType].list
          }
      },
      methods: {

          //获取tabcontrol的距离顶部高度
          SwiperImageLoad(){
              this.tabControl = this.$refs.tabcontrol2.$el.offsetTop
          },

          /*
          * 加载更多
          * */
          loadMore() {
              this.getHomeGoods(this.currentType)
              this.$refs.scroll.finishPullUp()
          },
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
              this.$refs.tabcontrol2.currentIndex = index
              this.$refs.tabcontrol1.currentIndex = index

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
                  // this.$refs.scroll.finishPullUp()
              })
          },
          scroll(position) {
              // console.log(position);
              this.isShow = -(position.y) > 1000
              this.tabControlShow = -(position.y) > this.tabControl
          },
          // loadMore() {
          //     this.getHomeGoods(this.currentType)
          // }
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

  }

.tabControl{
  position: relative;
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
