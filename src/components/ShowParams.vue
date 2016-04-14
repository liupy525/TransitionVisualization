<template>
  <header>
    <h1>
      <code>
        cubic-bezier(<span class="params"><span>{{currentParams[0]}}</span>,<span>{{currentParams[1]}}</span>,<span>{{currentParams[2]}}</span>,<span>{{currentParams[3]}}</span></span>)
      </code>
      <div class="buttons">
        <button type="button" @click="save">Save</button>
        <button type="button" @click="export">Export</button>
      </div>
    </h1>

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
    export: function () {
      this.$dispatch('show-export')
    },
  },
}
</script>

<style lang="scss" scoped>
  .buttons {
    display: inline-block;
  }
  button[type="button"] {
    font-size: 16px;
    vertical-align: middle;
    margin: 0 10px;
  }
  header {
    overflow: hidden;
    position: relative;
    left: 50px;
    h1 {
      float: left;
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
