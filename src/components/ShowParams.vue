<template>
  <header>
    <h1>
      <code>
        cubic-bezier(<span class="params"><span>{{currentParams[0]}}</span>,<span>{{currentParams[1]}}</span>,<span>{{currentParams[2]}}</span>,<span>{{currentParams[3]}}</span></span>)
      </code>
    </h1>
    <button type="button" @click="save">Save</button>
  </header>
</template>

<script>

import storage from '../lib/storage.js'

export default {
  props: {
    currentParams: Array,
  },
  methods: {
    save: function () {
      let name = prompt('name: ', this.currentParams.join(', '))
      if (name) {
        let tile = { name: name, params: this.currentParams }
        storage.saveTile(tile)
        this.$dispatch('save-current')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  header {
    width: 690px;
    overflow: hidden;
    position: relative;
    left: 50px;
    h1 {
      float: left;
    }
    button {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -13px;
    }
  }
  .params {
    span {
      color: #0ab;
    }
    span:nth-of-type(1) {
      color: #F08;
    }
    span:nth-of-type(2) {
      color: #F08;
    }
  }
</style>
