<template>
  <button v-if="pointer.allowDrag"
          class="pointer move-pointer" :class="pointer.name"
          :style="{left: pointer.x+'px', top: pointer.y+'px', zIndex: buttonZIndex}"
          @mousedown="startDrag"
  </button>
  <button v-if="!pointer.allowDrag"
          class="pointer fixed-pointer"
          :style="{left: pointer.x+'px', top: pointer.y+'px', zIndex: zIndex}">
  </button>
</template>

<script>

import eventUtil from '../lib/eventUtil.js'

export default {
  data() {
    return {
      dragging: false,
      offset: {x:0, y:0}
    }
  },
  props: {
    pointer: Object,
    limit: Object,
  },
  computed: {
    buttonZIndex: function () {
      if (this.dragging) {
        return 10
      } else {
        return 2
      }
    }
  },
  ready: function () {
    let self = this
    let getParentOffset = function () {
      let el = self.$parent.$el
      self.offset = {x: el.offsetLeft, y: el.offsetTop}
    }
    setTimeout(getParentOffset, 100)
  },
  methods: {
    startDrag: function (e) {
      this.pointer.x = e.pageX - this.offset.x
      this.pointer.y = e.pageY - this.offset.y
      this.dragging = true

      let body = document.querySelector('body')
      eventUtil.addHandler(body, 'mousemove', this.onDrag)
      eventUtil.addHandler(body, 'mouseup', this.stopDrag)
    },
    onDrag: function (e) {
      if (this.dragging) {
        let pageX = e.pageX-this.offset.x
        if (pageX > this.limit.w) {
          this.pointer.x = this.limit.w
        } else if (pageX < 0) {
          this.pointer.x = 0
        } else {
          this.pointer.x = pageX
        }

        let pageY = e.pageY-this.offset.y
        if (pageY > this.limit.h) {
          this.pointer.y = this.limit.h
        } else if (pageY < 0) {
          this.pointer.y = 0
        } else {
          this.pointer.y = pageY
        }
      }
    },
    stopDrag: function (e) {
      if (this.dragging) {
        this.dragging = false

        let pageX = e.pageX-this.offset.x
        if (pageX > this.limit.w) {
          this.pointer.x = this.limit.w
        } else if (pageX < 0) {
          this.pointer.x = 0
        } else {
          this.pointer.x = pageX
        }

        let pageY = e.pageY-this.offset.y
        if (pageY > this.limit.h) {
          this.pointer.y = this.limit.h
        } else if (pageY < 0) {
          this.pointer.y = 0
        } else {
          this.pointer.y = pageY
        }

        let body = document.querySelector('body')
        eventUtil.removeHandler(body, 'mousemove', this.onDrag)
        eventUtil.removeHandler(body, 'mouseup', this.stopDrag)

        this.$dispatch('chang-current')
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pointer {
    position: absolute;
    z-index: 1;
    height: 20px;
    width: 20px;
    border: 1px solid rgba(0,0,0,.3);
    margin: -10px 0 0 -10px;
    outline: none;

    box-sizing: border-box;
    border-radius: 10px;
  }
  .move-pointer {
    background-color: #00AABB;
  }
  .fixed-pointer {
    background-color: #FFF;
  }
</style>
