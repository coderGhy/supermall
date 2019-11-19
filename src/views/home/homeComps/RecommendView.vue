<template>
    <div class="recommend">
     <div class="recommend_item" v-for="(item,index) in recommends" :key="index">
       <a :href="item.link">
         <img :src="item.image" alt="">
         <div>{{item.title}}</div>
       </a>
     </div>
    </div>
</template>

<script>
    export default {
        name: "recommendView",
        props: {
            recommends: {
                type: Array,
                default() {
                    return [];
                }
            }
        }
    }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    width: 100%;
    border-bottom: 10px solid #eee;
    padding: 10px 0 10px;
    font-size: 12px;
  }
  .recommend_item{
    flex: 1;

  }
  .recommend img{
    flex: 1;
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
