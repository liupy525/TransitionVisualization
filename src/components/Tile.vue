<template>
  <canvas class="tile" width="60" height="60" :class="location" :style="getStyle()"></canvas>
</template>

<script>
export default {
  props: {
    location: String,
    duration: Number,
    timingFunction: String,
  },
  methods: {
    getStyle() {
      let transitionDuration = 'transition-duration: ' + this.duration + 's;'
      let transitionTimingFunction = 'transition-timing-function: ' + this.timingFunction + ';'
      return transitionTimingFunction + transitionDuration
    }
  }
}
</script>

<style>
  .tile {
    transition-property: all;
    background-color: red;
    margin-right: 200px;
  }
  .left {
    transform: translateX(0px);
  }
  .right {
    transform: translateX(200px);
  }
</style>
