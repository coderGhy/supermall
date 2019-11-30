<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScorll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
          scroll: {
              type: Number,
              default: 0
          },
            pullUpLoad: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                bscroll: null
            }
        },
        mounted() {
            this.bscroll = new BScorll(this.$refs.wrapper,{
                probeType: this.scroll,
                click: true,
                pullUpLoad: this.pullUpLoad,

            });
            if(this.scroll == 3 || this.scroll == 2){
                this.bscroll.on('scroll',(position)=>{
                     this.$emit('scroll',position)
                });
            }
            if(this.pullUpLoad){
                this.bscroll.on('pullingUp',()=>{
                    this.$emit('pullingUp')
                })
            }

        },
        methods: {
            scrollTo(x,y, time = 300) {
                this.scroll && this.bscroll.scrollTo(x,y,time)

            },
            refresh() {
                this.scroll && this.bscroll.refresh()   //重新判断滑动高度
            },
            finishPullUp() {
                this.scroll && this.bscroll.finishPullUp() //重置滑动动作
            },
            getScrollY() {
                return this.bscroll? this.bscroll.y:0
            }
        }
    }
</script>

<style scoped>

</style>
