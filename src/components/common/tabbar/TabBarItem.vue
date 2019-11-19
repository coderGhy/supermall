<template>
  <div class="tab-bar-items" @click="change">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name = "item-icon-active"></slot></div>
    <div :class="{active:isActive}"><slot name="item-text"></slot></div>

  </div>
</template>
<script>
export default {
  props: {
    path: String
  },
    data() {
      return {
        // isActive:false
      }
    },
    methods: {
      change () {
        // this.isActive = !this.isActive;
        if(this.$route.path != this.path)
        this.$router.replace(this.path)
      }
    },
   computed: {
       isActive() {
           // /home -> item1(/home) = true
           // /home -> item1(/category) = false
           // /home -> item1(/cart) = true
           // /home -> item1(/profile) = true
           return this.$route.path.indexOf(this.path) !== -1
       },
   }

}
</script>
<style>
  .tab-bar-items{
      flex:1;
      text-align: center;
      height: 49px;
      font-size: 12px;
    }
  .tab-bar-items img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: red
  }
</style>
