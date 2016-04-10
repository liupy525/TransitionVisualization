<template>
  <section class="preview-compare">
    <h2>Preview &amp; Compare</h2>
    <button type="button" @click="run"></button>
    <label>Duration</label>
    <input type="range" v-model="duration" min="0" max="10">
    <span>{{duration}} {{duration | pluralize 'second'}}</span>
    <tile :location="location" :duration="duration" :timing-function="timingFunction"></tile>
    <tile :location="location" :duration="duration" :timing-function="timingFunction"></tile>
  </section>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    return {
      duration: 1,
      location: 'left'
    }
  },
  props: {
    timingFunction: String,
  },
  components: { Tile },
  methods: {
    run() {
      if (this.location==='left') {
        this.location = 'right'
      } else {
        this.location = 'left'
      }
    }
  }
}
</script>

<style>
  button {
    width: 30px;
    height: 30px;
  }
</style>
