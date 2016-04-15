<template>
  <div class="bezier-draw-plane">
    <move-button v-for="pointerX in pointers"
                  :pointer.sync="pointerX"
                  :limit="limit"
                  @chang-current="handleChangeCurrent">
    </move-button>
    <tile :info.once="rect"
          :parameters="currentParams">
    </tile>
  </div>
</template>

<script>
import Tile from './Tile.vue'
import moveButton from './MoveButton.vue'
import storage from '../lib/storage.js'

export default {
  data() {
    let rect = {
      start: {x:0, y:450},
      end  : {x:300, y:150},
      id   : 'drawing',
      w    : 300,
      h    : 600,
      standard: true,
    }
    let limit = {w: 300, h: 600}
    let width = rect.end.x - rect.start.x
    let height = rect.start.y - rect.end.y
    let x1 = this.currentParams[0] * width + rect.start.x
    let y1 = rect.start.y - this.currentParams[1] * height
    let x2 = this.currentParams[2] * width + rect.start.x
    let y2 = rect.start.y - this.currentParams[3] * height
    return {
      rect,
      limit,
      pointers: [{name:'pointerA', x:x1, y:y1, allowDrag:true},
                {name:'pointerB', x:x2, y:y2, allowDrag:true},
                {x:rect.start.x, y:rect.start.y, allowDrag:false},
                {x:rect.end.x, y:rect.end.y, allowDrag:false}],
    }
  },
  props: {
    currentParams: Array,
  },
  watch: {
    pointers: {
      handler: function () {
        let rectW = this.rect.end.x - this.rect.start.x
        let rectH = this.rect.start.y - this.rect.end.y
        let x1 = this.pointers[0].x
        let y1 = this.pointers[0].y
        let x2 = this.pointers[1].x
        let y2 = this.pointers[1].y
        this.currentParams =  [Number(((x1-this.rect.start.x)/rectW).toFixed(2)),
                            Number(((this.rect.start.y-y1)/rectH).toFixed(2)),
                            Number(((x2-this.rect.start.x)/rectW).toFixed(2)),
                            Number(((this.rect.start.y-y2)/rectH).toFixed(2))]
      },
      deep: true,
    }
  },
  components: { Tile, moveButton },
  methods: {
    handleChangeCurrent: function () {
      storage.saveTile(this.currentParams, 'current')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bezier-draw-plane {
    position: relative;
  }
  #drawing {
    background: linear-gradient(-45deg, transparent 49%, rgba(0,0,0,.1) 49%, rgba(0,0,0,.1) 51%, transparent 51%) center no-repeat,
    		repeating-linear-gradient(white, white 20px, transparent 20px, transparent 40px) no-repeat,
    		linear-gradient(transparent, rgba(0,0,0,.06) 25%, rgba(0,0,0,.06) 75%, transparent);
  	background-size: 100% 50%, 100% 50%, auto;
  	background-position: 25%, 0, 0;
  }
</style>
