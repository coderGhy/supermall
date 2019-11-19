<template>
    <div class="goood-list">
        <goods-list-item v-for="(item,index) in goods" :key="index" :item="item"></goods-list-item>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
        name: "Goods",
        props: {
            goods: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        components: {
            GoodsListItem
        }
    }
</script>

<style scoped>
  .goood-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
