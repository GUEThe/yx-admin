<template>
  <div>
    <el-container>
      <el-main>
        <div id="main"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import echarts from 'echarts';
@Component({
  components: {
  }
})
export default class charts extends Vue {
  @Prop() StuInfo!: any;
  charttitle: string = '';
  queryOptions: any = {
    stid: '',
    name: '',
    type: 0,
    year: 0
  }
  listData: models.CET[] = [];


  mounted() {
    this.getChartTitle();
    this.createChart();
  }

  @Watch("StuInfo.type")
  async changetype(val: any, old: any) {
    console.log('change', val, old);
    if (val != old) {
      this.getChartTitle();
      this.createChart();
    }
  }

  @Watch("StuInfo.stid")
  async changestid(val: any, old: any) {
    if (val != old) {
      this.getChartTitle();
      this.createChart();
    }
  }

  @Watch("StuInfo.name")
  async changename(val: any, old: any) {
    if (val != old) {
      this.getChartTitle();
      this.createChart();
    }
  }

  @Watch("StuInfo.year")
  async change(val: any, old: any) {
    if (val != old) {
      this.getChartTitle();
      this.createChart();
    }
  }

  getChartTitle() {
    if (this.StuInfo.type == 4) {
      this.charttitle = "CET4成绩趋势"
    } else if (this.StuInfo.type == 6) {
      this.charttitle = "CET6成绩趋势"
    } else {
      this.charttitle = "CET4/6成绩趋势"
    }
  }

  async createChart() {
    let xAxisData = [];
    let legendData = ['总分', '听力', '阅读', '写作', '综合'];
    let title = this.charttitle;
    let metaDate: any = [[], [], [], [], []]
    this.queryOptions = this.StuInfo;
    const { data, total } = await api.GetCetList(this.queryOptions);
    this.listData = data!;
    for (let i = 0; i < this.listData.length; i++) {
      xAxisData.push(this.listData[i].term);
      metaDate[0].push(this.listData[i].score);
      metaDate[1].push(this.listData[i].listen);
      metaDate[2].push(this.listData[i].reading);
      metaDate[3].push(this.listData[i].writing);
      metaDate[4].push(this.listData[i].others);
    }
    const echart = echarts as any;
    let obj = document.getElementById('main')
    let myChart = echart.init(obj);
    let serieData = [];
    for (var v = 0; v < legendData.length; v++) {
      var serie = {
        name: legendData[v],
        type: 'line',
        symbol: "circle",
        symbolSize: 10,
        data: metaDate[v]
      };
      serieData.push(serie)
    }
    var colors = ["#036BC8", "#4A95FF", "#5EBEFC", "#2EF7F3", "#FFFFFF"];
    var option = {
      backgroundColor: '#0f375f',
      title: { text: title, textAlign: 'left', textStyle: { color: "#fff", fontSize: "16", fontWeight: "normal" } },
      legend: {
        show: true, left: "right", data: legendData, y: "5%",
        itemWidth: 18, itemHeight: 12, textStyle: { color: "#fff", fontSize: 14 },
      },
      color: colors,
      grid: { left: '2%', top: "12%", bottom: "5%", right: "5%", containLabel: true },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: [
        {
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#6173A3' } },
          axisLabel: { interval: 0, textStyle: { color: '#9ea7c4', fontSize: 14 } },
          axisTick: { show: false },
          data: xAxisData,
        },
      ],
      yAxis: [
        {
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { textStyle: { color: '#9ea7c4', fontSize: 14 } },
          axisLine: { show: true, lineStyle: { color: '#6173A3' } },
        },
      ],
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
