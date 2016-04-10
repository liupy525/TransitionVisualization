<template>
  <div class="app clearfix">
    <bezier-draw-plane :parameters.sync="parameters" class="bezier-draw-plane"></bezier-draw-plane>
    <show-params :parameters="parameters" class="show-params"></show-params>
    <preview-compare class="preview-compare" :timing-function="'cubic-bezier(' + parameters.join(',') + ')'"></preview-compare>
  </div>
</template>

<script>
import BezierDrawPlane from './components/BezierDrawPlane.vue'
import ShowParams from './components/ShowParams.vue'
import PreviewCompare from './components/PreviewCompare.vue'

export default {
  data() {
    return {
      parameters: [0.67, 0.33, 0.33, 0.67]
    }
  },
  components: { BezierDrawPlane, ShowParams, PreviewCompare }
}
</script>

<style>
  .bezier-draw-plane {
    float: left;
  }
  .show-params {
    float: left;
  }
  .preview-compare {
    margin-left: 40px;
    float: left;
  }
  .app {
    padding: 50px;
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
</style>
