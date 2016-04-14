<template>
  <section class="preview-compare">
    <h1>Preview &amp; Compare</h1>
    <div class="choice">
      <input type="radio" id="translate" value="translate" v-model="picked">
      <label for="translate">translate</label>
      <input type="radio" id="rotate" value="rotate" v-model="picked">
      <label for="rotate">rotate</label>
      <input type="radio" id="scale" value="scale" v-model="picked">
      <label for="scale">scale</label>
    </div>
    <div class="duration">
      <button type="button" @click="run">Run</button>
      <label>Duration</label>
      <input type="range" min="0.1" max="10" step="0.1" v-model="duration" min="0" max="10">
      <span>{{duration}} {{duration | pluralize 'second'}}</span>
    </div>
    <div class="tile-wrapper current" :class="location" :style="getCurrentStyle()">
      <tile :info="{id: 'mine', w: 60, h: 60}"
          :parameters="currentParams">
      </tile>
    </div>
    <div class="tile-wrapper compare" :class="location" :style="getCompareStyle()">
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
      location: 'beginning',
      picked: 'translate',
    }
  },
  props: {
    duration: Number,
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
  watch: {
    picked: function () {
      if (this.picked==='scale') {
        document.querySelector('.current').style.marginTop = '40px'
        document.querySelector('.compare').style.marginTop = '-65px'
        document.querySelector('.current').style.marginLeft = '20px'
        document.querySelector('.compare').style.marginLeft = '220px'
      } else {
        document.querySelector('.current').style.marginTop = '20px'
        document.querySelector('.compare').style.marginTop = '20px'
        document.querySelector('.current').style.marginLeft = '0px'
        document.querySelector('.compare').style.marginLeft = '0px'
      }
      this.location = 'beginning'
    },
  },
  methods: {
    run() {
      if (this.location==='beginning') {
        this.location = this.picked
      } else {
        this.location = 'beginning'
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
  .beginning {
    transform: translateX(0px) rotate(0deg) scale(1);
  }
  .translate {
    transform: translateX(280px);
  }
  .rotate {
    transform: rotate(180deg);
  }
  .scale {
    transform: scale(2);
  }
</style>
