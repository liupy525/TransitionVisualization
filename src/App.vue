<template>
  <div class="app clearfix">
    <bezier-draw-plane :current-params.sync="currentParams" class="bezier-draw-plane"></bezier-draw-plane>
    <show-params :current-params="currentParams" class="show-params" @save-current="handleSaveCurrent"></show-params>
    <preview-compare class="show" :current-params="currentParams" :compare-params="compareParams"></preview-compare>
    <library class="library" :compare-params.sync="compareParams">
    </library>
  </div>
</template>

<script>
import BezierDrawPlane from './components/BezierDrawPlane.vue'
import ShowParams from './components/ShowParams.vue'
import PreviewCompare from './components/PreviewCompare.vue'
import Library from './components/Library.vue'
import storage from './lib/storage.js'

export default {
  data() {
    return {
      currentParams: storage.getTiles('current') || [0.67, 0.33, 0.33, 0.67],
      compareParams: storage.getTiles()[0]['params'] || [0.67, 0.33, 0.33, 0.67]
    }
  },
  components: { BezierDrawPlane, ShowParams, PreviewCompare, Library },
  methods: {
    handleSaveCurrent: function() {
      this.$broadcast('saved-current')
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
</style>
