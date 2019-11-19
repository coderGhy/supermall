<template>
    <div class="tab-control">
      <div class="tab-controlitem" v-for="(title,index) in titles" :key="index" @click="itemClick(index)"
           :class="{active: index === currentIndex}">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex:0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
  }
  .tab-controlitem{
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .tab-controlitem span {
    padding: 5px;
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
