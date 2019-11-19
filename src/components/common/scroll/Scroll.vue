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
            }
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
                pullDownRefresh: true

            });
            this.bscroll.on('scroll',(position)=>{
                // console.log(position);
                this.$emit('scroll',position)
            });
            this.bscroll.on('pullingUp',()=>{
                // console.log("上拉加载内容")
                // console.log(this.bscroll.finishPullUp)
                this.$emit('pullingUp')
            })
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.bscroll.scrollTo(x,y,time)
            },
            finishPullUp() {
                this.bscroll.finishPullUp()
                // console.log("成功")
            }
        }
    }
</script>

<style scoped>

</style>
