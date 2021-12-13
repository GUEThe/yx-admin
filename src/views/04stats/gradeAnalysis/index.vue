<template>
  <div id="app">
    <Screening @funScreen="getMessageFromScreen"></Screening>
    <DataSheet :datasheetData="sheetData"></DataSheet>
    <DetailChart></DetailChart>
    <ChartDisplay :ChartData="sheetData"></ChartDisplay>
  </div>
</template>

<script>
import Screening from './component/Screening'
import DataSheet from './component/DataSheet'
import ChartDisplay from './component/ChartDisplay'
import DetailChart from './component/DetailChart'
export default {
  name: 'App',
  components: {
    'Screening': Screening,
    'DataSheet': DataSheet,
    'ChartDisplay': ChartDisplay,
    'DetailChart': DetailChart
  },
  data() {
    return {
      ScreenData: '',
      sheetData: ''
    }
  },
  methods: {
    getMessageFromScreen(data) {
      this.ScreenData = data;
      console.log('父组件接收值', this.ScreenData);
      this.sheetData = data;
    }
  }
}
</script>
