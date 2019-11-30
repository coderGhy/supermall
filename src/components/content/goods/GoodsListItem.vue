<template>
  <div class="goods-list-item" @click="itemclick">
    <img :src="showImage" alt="" @load="itemImageLoad">
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
        },
        computed: {
            showImage() {
                return this.item.image || this.item.show.img
                // return this.item.show.img || this.item.image

            }
        },
        methods:{
            itemImageLoad() {
                //方法一 ，定义两个自定义事件，分别刷新，通过路由地址判断
                // if(this.$route.path.indexOf('/home') !== -1){
                //     this.$bus.$emit('homeImageLoad')
                //
                // }else if(this.$route.path.indexOf('/detail') !== -1){
                //     this.$bus.$emit('detailImageLoad')
                //
                // }
                //方法二，通过离开路由进行取消事件
              this.$bus.$emit('itemImageLoad')
                // console.log(this.item.iid);
            },
            itemclick() {
              this.$router.push('/detail/' + this.item.iid)
            }
        },
        mounted() {

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
