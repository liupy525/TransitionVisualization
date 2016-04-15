<template>
  <canvas :id="info.id" :width="info.w"
          :height="info.h" class="tile">
  </canvas>
</template>

<script>

import Bezier from '../lib/bezier.js'

export default {
  data() {
    return {
      bezier: null
    }
  },
  props: {
    info: Object,
    parameters: Array,
  },
  ready: function () {
    this.bezier = new Bezier('#'+this.info.id, this.info.start.x, this.info.start.y, this.info.end.x, this.info.end.y, this.parameters, this.info.standard || false)
  },
  watch: {
    'parameters': function () {
      this.bezier.draw(this.parameters)
    },
  },
}
</script>

<style scoped>
  .tile {
    background-color: #E5E5E5;
  }
</style>
