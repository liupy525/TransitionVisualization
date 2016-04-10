<template>
  <div class="bezier-draw-plane">
    <move-button v-for="pointerX in pointers"
                  :pointer.sync="pointerX"
                  :limit="{w: 300, h: 600}">
    </move-button>
    <bezier-drawer :rect-info.once="rect"
                    :parameters="parameters">
    </bezier-drawer>
  </div>
</template>

<script>
import bezierDrawer from './BezierDrawer.vue'
import moveButton from './MoveButton.vue'

export default {
  data() {
    let rect = {
      start: {x:0, y:450},
      end  : {x:300, y:150},
    }
    return {
      rect,
      pointers: [{name:'pointerA', x:200, y:350, allowDrag:true},
                {name:'pointerB', x:100, y:250, allowDrag:true},
                {x:rect.start.x, y:rect.start.y, allowDrag:false},
                {x:rect.end.x, y:rect.end.y, allowDrag:false}],
    }
  },
  props: {
    parameters: Array
  },
  watch: {
    pointers: {
      handler: function () {
        let rectW = this.rect.end.x - this.rect.start.x
        let rectH = this.rect.start.y - this.rect.end.y
        console.log(rectW, rectH)
        let x1 = this.pointers[0].x
        let y1 = this.pointers[0].y
        let x2 = this.pointers[1].x
        let y2 = this.pointers[1].y
        this.parameters =  [Number(((x1-this.rect.start.x)/rectW).toFixed(2)),
                            Number(((this.rect.start.y-y1)/rectH).toFixed(2)),
                            Number(((x2-this.rect.start.x)/rectW).toFixed(2)),
                            Number(((this.rect.start.y-y2)/rectH).toFixed(2))]
      },
      deep: true,
    }
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
