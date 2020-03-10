<template>
  <div>
    <el-container>
      <el-main>
        <div id="main"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import echarts from 'echarts';
@Component({
  components: {
  }
})
export default class charts extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: []
  }) chartData!: any;

  mounted() {
    this.createChart();
  }

  @Watch('chartData')
  async changeChartData(val: any, old: any) {
    this.createChart();
  }

  createChart() {
    let title = '';
    let type = [];
    let legendData = ['总分', '听力', '阅读', '写作', '综合'];
    let xAxisData = [];
    let serieData = [];
    let metaDate: any = [[], [], [], [], []]
    for (let i = 0; i < this.chartData.length; i++) {
      xAxisData.push(this.chartData[i].term);
      metaDate[0].push(this.chartData[i].score);
      metaDate[1].push(this.chartData[i].listen);
      metaDate[2].push(this.chartData[i].reading);
      metaDate[3].push(this.chartData[i].writing);
      metaDate[4].push(this.chartData[i].others);
      type.push(this.chartData[i].type);
    }
    for (let i = 0; i < type.length; i++) {
      if (type[0] === 4 && type[i] === type[0]) {
        title = 'CET4成绩趋势';
      } else if (type[0] === 6 && type[i] === type[0]) {
        title = 'CET6成绩趋势';
      } else {
        title = 'CET成绩趋势';
      }
    }
    const echart = echarts as any;
    let obj = document.getElementById('main')
    let myChart = echart.init(obj);
    for (var v = 0; v < legendData.length; v++) {
      var serie = {
        name: legendData[v],
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        data: metaDate[v]
      };
      serieData.push(serie)
    }
    let colors = ['#036BC8', '#4A95FF', '#5EBEFC', '#2EF7F3', '#FFFFFF'];
    let option = {
      backgroundColor: '#0f375f',
      title: {
        text: title,
        textAlign: 'left',
        textStyle: {
          color: '#fff',
          fontSize: '16',
          fontWeight: 'normal'
        }
      },
      legend: {
        show: true,
        left: 'right',
        data: legendData,
        y: '5%',
        itemWidth: 18,
        itemHeight: 12,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      color: colors,
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: [{
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#6173A3'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#9ea7c4',
            fontSize: 14
          }
        },
        axisTick: {
          show: false
        },
        data: xAxisData
      }],
      yAxis: [{
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#9ea7c4',
            fontSize: 14
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#6173A3'
          }
        }
      }],
      series: serieData
    };
    myChart.setOption(option, true);
  }
}
</script>

<style scoped>
#main {
  width: 80%;
  height: 400px;
  margin-left: 10%;
}
</style>
