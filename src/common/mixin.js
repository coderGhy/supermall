import {debounce} from "./util";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)

    this.itemImageListener = ()=>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
    console.log('hellow');
  },
}
