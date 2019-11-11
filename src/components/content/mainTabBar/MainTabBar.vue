<template>
    <div>
        <tabbar>
       <tabbaritem path="/home">
         <img slot="item-icon" src="~assets/img/tarbar/svghome.svg" alt="">
         <img slot="item-icon-active" src="~assets/img/tarbar/svghome1.svg" alt="">
         <div slot="item-text">首页</div>
       </tabbaritem>
       <tabbaritem path="/category">
         <img slot="item-icon" src="~assets/img/tarbar/fenleisvg.svg" alt="">
         <img slot="item-icon-active" src="~assets/img/tarbar/fenleisvg1.svg" alt="">
         <div slot="item-text">分类</div>
       </tabbaritem>
       <tabbaritem path="/cart">
         <img slot="item-icon" src="~assets/img/tarbar/svgshoppingcart.svg" alt="">
         <img slot="item-icon-active" src="~assets/img/tarbar/svgshoppingcart1.svg" alt="">
         <div slot="item-text">购物车</div>
       </tabbaritem>
      <tabbaritem path="/profile">
         <img slot="item-icon" src="~assets/img/tarbar/svgman.svg" alt="">
         <img slot="item-icon-active" src="~assets/img/tarbar/svgman1.svg" alt="">
         <div slot="item-text">我的</div>
       </tabbaritem>
    </tabbar>
    </div>
</template>
<script>
import tabbar from '../../common/tabbar/TabBar'
import tabbaritem from '../../common/tabbar/TabBarItem'
export default {
    name: "MainTabBar",
    components: {
        tabbar,
        tabbaritem
  }
}
</script>
<style lang="">

</style>
