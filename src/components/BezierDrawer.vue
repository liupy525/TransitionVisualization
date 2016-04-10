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
    parameters: Array,
  },
  ready: function () {
    this.bezierDrawer = new Bezier('#drawing',
                                  this.rectInfo.start.x,
                                  this.rectInfo.start.y,
                                  this.rectInfo.end.x,
                                  this.rectInfo.end.y,
                                  this.parameters)
  },
  watch: {
    'parameters': {
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

</style>
