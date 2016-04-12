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
    this.bezier = new Bezier('#'+this.info.id, 10, this.info.w-10, this.info.h-10, 10, this.parameters, false)
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
