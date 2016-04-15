<template>
  <div class="app clearfix">
    <bezier-draw-plane :current-params.sync="currentParams" class="bezier-draw-plane"></bezier-draw-plane>
    <show-params :current-params="currentParams" class="show-params" @save-current="handleSaveCurrent" @show-export="handleShowExport"></show-params>
    <p v-show="hint" transition="expand"><strong>This curve contains values out of range.</strong> But fear not young padawan! Just use <code style="font-weight: bold;">cubic-bezier({{fixedParams}})</code> as well for Webkit until the <a href="https://bugs.webkit.org/show_bug.cgi?id=45761" tabindex="0">bug #45761</a> fix propagates to Safari.</p>
    <preview-compare class="show" :current-params="currentParams" :compare-params="compareParams" :duration.sync="duration" :transition></preview-compare>
    <library class="library" :compare-params.sync="compareParams"></library>
    <modal :show.sync="showExport" class="modal">
      <h1 slot="header">Copy the code and save to a file to export</h1>
      <textarea slot="body" name="bezier" rows="8" cols="50">div {\n
    transition: all {{duration*1000}}ms cubic-bezier({{currentParams}});\n
}</textarea>
    </modal>
  </div>
</template>

<script>
import BezierDrawPlane from './BezierDrawPlane.vue'
import ShowParams from './ShowParams.vue'
import PreviewCompare from './PreviewCompare.vue'
import Library from './Library.vue'
import Modal from './Modal.vue'
import storage from '../lib/storage.js'

export default {
  data() {
    return {
      currentParams: storage.getTiles('current') || [0.67, 0.33, 0.33, 0.67],
      compareParams: (storage.getTiles()[0] && storage.getTiles()[0]['params']) || [0.67, 0.33, 0.33, 0.67],
      showExport: false,
      duration: 1
    }
  },
  computed: {
    hint: function () {
      if (this.currentParams[1] > 1 ||
          this.currentParams[1] < 0 ||
          this.currentParams[3] > 1 ||
          this.currentParams[3] < 0) {
        return true
      } else {
        return false
      }
    },
    fixedParams: function () {
      let a = Array.from(this.currentParams)
      if (a[1] > 1) {
        a[1] = 1
      }
      if (a[1] < 0){
        a[1] = 0
      }
      if (a[3] > 1) {
        a[3] = 1
      }
      if (a[3] < 0) {
        a[3] = 0
      }
      return a
    }
  },
  components: { BezierDrawPlane, ShowParams, PreviewCompare, Library, Modal },
  methods: {
    handleSaveCurrent: function() {
      this.$broadcast('saved-current')
    },
    handleShowExport: function () {
      this.showExport = true
    }
  }
}
</script>

<style>
  .bezier-draw-plane {
    float: left;
  }
  .show {
    margin-left: 50px;
    float: left;
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .library {
    float: left;
    margin-left: 50px;
    max-width: 710px;
  }
  .expand-transition {
  transition: all 1s ease;
  height: 45px;
  margin: 0;
  position: relative;
  left: 50px;
  overflow: hidden;
}
  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter, .expand-leave {
    height: 0;
    opacity: 0;
  }
</style>
