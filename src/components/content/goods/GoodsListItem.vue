<template>
  <div class="goods-list-item">
    <img :src="item.show.img" alt="">
    <div class="goods-info">
      <p class="item-title">{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            item:{
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
  .goods-list-item{
    position: relative;
    padding-bottom: 44px;
    width: 48%;
  }
  .goods-info{
    position: absolute;
    font-size: 12px;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-list-item img{
    width:100%;
    border-radius: 5px;
  }
  .item-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .collect{
       position: relative;
     }
  .collect::after{
    content: '';
    position: absolute;
    left: -15px;
    bottom: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
