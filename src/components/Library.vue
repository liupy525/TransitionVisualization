<template>
  <section>

    <h1>Library</h1>
    <p>
      Click on a curve to compare it with the current one.
    </p>
    <div class="library-tile-wrapper" v-for="(index, tile) in tiles" :class="'tile-wrapper-'+index" @click="change" :transition>
      <tile class="library-tiles"
            :class="{active:index==compareIndex}"
            :info="{id: 'tile-'+index, w: 100, h: 100}"
            :parameters="tile.params">
      </tile>
      <span :title="tile.name">{{tile.name}}</span>
      <div class="remove" @click="remove">x</div>
    </div>
  </section>
</template>
<script>

import storage from '../lib/storage.js'
import Tile from './Tile.vue'

export default {
  data() {
    return {
      tiles: storage.getTiles(),
      compareIndex: 0,
    }
  },
  props: {
    compareParams: Array,
  },
  components: { Tile },
  methods: {
    remove: function (e) {
      let t = e.target
      let i = t.parentNode.className.indexOf('tile-wrapper-')
      let index = parseInt(t.parentNode.className.slice(i+13, i+15))
      storage.removeTile(index)
      this.tiles = storage.getTiles()
    },
    change: function (e) {
      let t = e.target
      let i = t.parentNode.className.indexOf('tile-wrapper-')
      let index = parseInt(t.parentNode.className.slice(i+13, i+15))
      this.compareParams = storage.getTiles()[index]['params']
      this.compareIndex = index
    },
  },
  events: {
    'saved-current': function () {
      this.tiles = storage.getTiles()
    }
  },
}
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
  }
  .library-tile-wrapper {
    position: relative;
    display: inline-block;
    width: 120px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    margin-top: 10px;
    .library-tiles {
      margin: 10px 10px 0 10px;
    }
    span {
      white-space: nowrap;
    }
    canvas{
      border-radius: 10px;
    }
    &:hover{
      .remove {
        display: block;
        background-color: #000000;
        &:hover {
          background-color: #f08;
          cursor: pointer;
        }
      }
      canvas {
        background-color: #ACD0D5;
      }
    }
  }
  .remove {
    display: none;
    color: #ffffff;
    width: 24px;
    height: 24px;
    position: absolute;
    top:0px;
    right: 0px;
    border-radius: 12px
  }
  .active {
    background-color: #0AB;
  }
</style>
