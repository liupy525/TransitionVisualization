<template>
  <div class="bezier-draw-plane">
    <move-button v-for="pointerX in pointers"
                  :pointer.sync="pointerX"
                  :limit="{w: 300, h: 600}">
    </move-button>
    <bezier-drawer :rect-info.once="{startX:pointers[2].x, startY:pointers[2].y, endX:pointers[3].x, endY:pointers[3].y}"
                    :pointers="{a:pointers[0], b:pointers[1]}"
                    :parameters.sync="parameters">
    </bezier-drawer>
  </div>
</template>

<script>
import bezierDrawer from './BezierDrawer.vue'
import moveButton from './MoveButton.vue'

export default {
  data() {
    return {
      // pointers: [this.pointerA, this.pointerB],
      // pointerA: {name:'pointerA', x:250, y:250},
      // pointerB: {name:'pointerB', x:110, y:110},
      pointers: [{name:'pointerA', x:200, y:350, allowDrag:true},
                {name:'pointerB', x:100, y:250, allowDrag:true},
                {x:0, y:450, allowDrag:false},
                {x:300, y:150, allowDrag:false}],
    }
  },
  props: {
    parameters: Array
  },
  components: { bezierDrawer, moveButton },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bezier-draw-plane {
    position: relative;
  }
</style>
