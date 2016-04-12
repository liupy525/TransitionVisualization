<template>
  <canvas id="drawing" width="300px" height="600px"></canvas>
</template>

<script>
import Bezier from '../lib/bezier.js'

export default {
  data() {
    return {
      bezierDrawer: null,
    }
  },
  props: {
    rectInfo: Object,
    currentParams: Array,
  },
  ready: function () {
    this.bezierDrawer = new Bezier('#drawing',
                                  this.rectInfo.start.x,
                                  this.rectInfo.start.y,
                                  this.rectInfo.end.x,
                                  this.rectInfo.end.y,
                                  this.currentParams)
  },
  watch: {
    'currentParams': {
      handler: function (val) {
        this.bezierDrawer.draw(val)
      },
      deep: true,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#drawing {
  background: linear-gradient(-45deg, transparent 49%, rgba(0,0,0,.1) 49%, rgba(0,0,0,.1) 51%, transparent 51%) center no-repeat,
  		repeating-linear-gradient(white, white 20px, transparent 20px, transparent 40px) no-repeat,
  		linear-gradient(transparent, rgba(0,0,0,.06) 25%, rgba(0,0,0,.06) 75%, transparent);
	background-size: 100% 50%, 100% 50%, auto;
	background-position: 25%, 0, 0;
}
</style>
