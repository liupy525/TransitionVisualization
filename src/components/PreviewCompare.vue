<template>
  <section class="preview-compare">
    <h1>Preview &amp; Compare</h1>
    <div class="duration">
      <button type="button" @click="run">Run</button>
      <label>Duration</label>
      <input type="range" min="0.1" max="10" step="0.1" v-model="duration" min="0" max="10">
      <span>{{duration}} {{duration | pluralize 'second'}}</span>
    </div>
    <div class="tile-wrapper" :class="location" :style="getCurrentStyle()" >
      <tile :info="{id: 'mine', w: 60, h: 60}"
          :parameters="currentParams">
      </tile>
    </div>
    <div class="tile-wrapper" :class="location" :style="getCompareStyle()" :transition>
      <tile :info="{id: 'comparison', w: 60, h: 60}"
          :parameters="compareParams">
      </tile>
    </div>
  </section>
</template>

<script>
import Tile from './Tile.vue'

export default {
  data() {
    return {
      duration: 1,
      location: 'left',
    }
  },
  props: {
    currentParams: Array,
    compareParams: Array,
  },
  computed: {
    currentTimingFunction: function () {
      return 'cubic-bezier(' + this.currentParams.join(',') + ')'
    },
    compareTimingFunction: function () {
      return 'cubic-bezier(' + this.compareParams.join(',') + ')'
    }
  },
  components: { Tile },
  methods: {
    run() {
      if (this.location==='left') {
        this.location = 'right'
      } else {
        this.location = 'left'
      }
    },
    getCurrentStyle() {
      let transitionDuration = 'transition-duration: ' + this.duration + 's;'
      let transitionTimingFunction = 'transition-timing-function: ' + this.currentTimingFunction + ';'
      return transitionTimingFunction + transitionDuration
    },
    getCompareStyle() {
      let transitionDuration = 'transition-duration: ' + this.duration + 's;'
      let transitionTimingFunction = 'transition-timing-function: ' + this.compareTimingFunction + ';'
      return transitionTimingFunction + transitionDuration
    },
  },
}
</script>

<style lang="scss" scoped>
  .preview-compare {
    width: 340px;
  }
  .duration {
    overflow: hidden;
    button {
      float: right;
    }
    input {
      width: 125px;
    }
    &>* {
      vertical-align: middle;
    }
  }
  #mine {
    background-color: #F08;
  }
  #comparison {
    background-color: #0AB;
  }
  .tile-wrapper {
    transition-property: all;
    margin-right: 280px;
    margin-top: 20px;
    canvas {
      border-radius: 5px;
    }
  }
  .left {
    transform: translateX(0px);
  }
  .right {
    transform: translateX(280px);
  }
</style>
