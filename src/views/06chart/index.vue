<template>
  <div>
    <div class="header">
      <h1 class="header-title">大屏数据可视化模板</h1>
    </div>
    <div class="wrapper">
      <div class="content">
        <div class="col col-l">
          <div class="xpanel-wrapper xpanel-wrapper-40">
            <div class="xpanel xpanel-l-t">
              <div class="title"></div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-60">
            <div class="xpanel xpanel-l-b">
              <div class="title"></div>
            </div>
          </div>
        </div>
        <div class="col col-c">
          <div class="xpanel-wrapper xpanel-wrapper-75">
            <div class="xpanel no-bg">
              <map-chart />
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-25">
            <div class="xpanel xpanel-c-b">
              <div class="title title-long"></div>
            </div>
          </div>
        </div>
        <div class="col col-r">
          <div class="xpanel-wrapper xpanel-wrapper-25">
            <div class="xpanel xpanel-r-t">
              <div class="title"></div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-30">
            <div class="xpanel xpanel-r-m">
              <div class="title"></div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-45">
            <div class="xpanel xpanel-r-b">
              <div class="title"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MapChart from './components/MapChart.vue'

@Component({
  components: {
    MapChart
  }
})
export default class Chart extends Vue { }
</script>
<style lang="css">
/********** Global **********/
html,
body {
  width: 100%;
  height: 100%;
  font-family: 'microsoft yahei', arial, sans-serif;
  background-color: #0b0f34;
  overflow-x: hidden;
  overflow-y: auto;
}
body {
  margin: 0 auto;
  min-width: 375px;
  max-width: 1920px;
}

/********** Layout **********/
.header {
  position: relative;
  height: 42px;
  box-sizing: border-box;
}
.header-title {
  margin: 0;
  padding: 0;
  line-height: 64px;
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  color: #e9c29d;
}
.wrapper {
  position: absolute;
  top: 36px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 10px 10px 0 10px;
  min-height: 500px;
  background: url('./img/wrapper-bg.png') no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
/* PC */
@media (max-width: 1919px) {
  .header {
    height: 36px;
  }
  .header-title {
    line-height: 42px;
    font-size: 22px;
  }
  .wrapper {
    top: 22px;
  }
}
/* Mobile */
@media (max-width: 1279px) {
  .header-title {
    max-width: 96%;
  }
  .wrapper {
    background: none;
  }
}

/********** Content **********/
.content {
  display: flex;
  padding: 25px 15px;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.col {
  margin: 0 10px;
  height: 100%;
}
.col-l {
  -webkit-flex: 2;
  -ms-flex: 2;
  flex: 2;
}
.col-c {
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
}
.col-r {
  -webkit-flex: 2;
  -ms-flex: 2;
  flex: 2;
}
/* PC */
@media (max-width: 1919px) {
  .content {
    padding: 5px 0;
  }
}
/* Mobile */
@media (max-width: 1279px) {
  .content {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .col {
    margin: 5px 0;
  }
  .col-l,
  .col-c,
  .col-r {
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
  }
}
.xpanel-wrapper {
  padding-bottom: 10px;
  box-sizing: border-box;
}
.xpanel-wrapper {
  height: 100%;
}
.xpanel-wrapper-25 {
  height: 25%;
}
.xpanel-wrapper-30 {
  height: 30%;
}
.xpanel-wrapper-40 {
  height: 40%;
}
.xpanel-wrapper-45 {
  height: 45%;
}
.xpanel-wrapper-60 {
  height: 60%;
}
.xpanel-wrapper-75 {
  height: 75%;
}
.xpanel {
  height: 100%;
  min-height: 100px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.xpanel-l-t {
  background-image: url('./img/panel-l-t.png');
}
.xpanel-l-b {
  background-image: url('./img/panel-l-b.png');
}
.xpanel-c-b {
  background-image: url('./img/panel-c-b.png');
}
.xpanel-r-t {
  background-image: url('./img/panel-r-t.png');
}
.xpanel-r-m {
  background-image: url('./img/panel-r-m.png');
}
.xpanel-r-b {
  background-image: url('./img/panel-r-b.png');
}
.xpanel .title {
  padding-left: 24px;
  height: 44px;
  line-height: 44px;
  font-size: 24px;
  font-weight: normal;
  color: #fff;
  background-image: url('./img/title-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.xpanel .title-long {
  background-image: url('./img/title-bg-long.png');
}
/* PC */
@media (max-width: 1919px) {
  .xpanel .title {
    padding-left: 20px;
    height: 36px;
    line-height: 36px;
    font-size: 20px;
  }
}

/* tool */
.fill-h {
  height: 100% !important;
  min-height: 100% !important;
}
.no-margin {
  margin: 0 !important;
}
.no-padding {
  padding: 0 !important;
}
.no-bg {
  background: none !important;
}
.no-border {
  border: 0 !important;
}

/* scrollbar */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
