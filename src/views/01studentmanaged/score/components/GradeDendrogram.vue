<template>
  <div>
    <el-container>
      <el-main>
        <div id="main2"></div>
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
export default class GradeDendrogram extends Vue {
  @Prop() stugradelist!: () => ({});
  gradedata: any = []

  @Watch('stugradelist')
  change(value: string, old: string) {
    this.createChart();
  }

  mounted() {
    this.createChart();
  }

  GetTermList() {
    this.gradedata = this.stugradelist
    let termlist = []
    for (let i of this.gradedata) {
      termlist.push(i.term)
    }
    return termlist
  }

  GetExcellentList() {
    let termlist = Array.from(new Set(this.GetTermList()))
    this.gradedata = this.stugradelist
    let excellentList = []
    let excellent = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.score >= 90 && j.score <= 100) {
          excellent++;
        }
      }
      excellentList.push(excellent)
      excellent = 0
    }
    return excellentList;
  }

  GetGoodList() {
    let termlist = Array.from(new Set(this.GetTermList()))
    this.gradedata = this.stugradelist
    let GoodList = []
    let Good = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.score >= 80 && j.score < 90) {
          Good++;
        }
      }
      GoodList.push(Good)
      Good = 0
    }
    return GoodList;
  }

  GetMiddleList() {
    let termlist = Array.from(new Set(this.GetTermList()))
    this.gradedata = this.stugradelist
    let MiddleList = []
    let Middle = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.score >= 70 && j.score < 80) {
          Middle++;
        }
      }
      MiddleList.push(Middle)
      Middle = 0
    }
    return MiddleList;
  }

  GetPassList() {
    let termlist = Array.from(new Set(this.GetTermList()))
    this.gradedata = this.stugradelist
    let PassList = []
    let Pass = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.score >= 60 && j.score < 70) {
          Pass++;
        }
      }
      PassList.push(Pass)
      Pass = 0
    }
    return PassList;
  }

  GetFailList() {
    let termlist = Array.from(new Set(this.GetTermList()))
    this.gradedata = this.stugradelist
    let FailList = []
    let Fail = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.score < 60) {
          Fail++;
        }
      }
      FailList.push(Fail)
      Fail = 0
    }
    return FailList;
  }

  async createChart() {
    let termlist = Array.from(new Set(this.GetTermList()))
    let excellentList = this.GetExcellentList()
    let GoodList = this.GetGoodList()
    let MiddleList = this.GetMiddleList()
    let PassList = this.GetPassList()
    let FailList = this.GetFailList()
    let title = this.gradedata[0].name + '同学每学期成绩分布'
    const echart = echarts as any;
    const obj = document.getElementById('main2')
    const myChart = echart.init(obj)
    const option = {
      title: [
        {
          text: title,
          textStyle: {
            fontSize: 15,
            color: '#8A2BE2'
          }
        }],
      backgroundColor: '#00265f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['优秀', '良好', '中等', '及格', '不及格'],
        align: 'right',
        right: 10,
        textStyle: {
          color: '#fff'
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 35
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: termlist,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#063374',
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#00c7ff'
          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value}门 '
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#063374'
          }
        }
      }],
      series: [{
        name: '优秀',
        type: 'bar',
        data: excellentList,
        barWidth: 10,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#008cff'
            }, {
              offset: 1,
              color: '#005193'
            }]),
            opacity: 1
          }
        }
      }, {
        name: '良好',
        type: 'bar',
        data: GoodList,
        barWidth: 10,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00da9c'
            }, {
              offset: 1,
              color: '#007a55'
            }]),
            opacity: 1
          }
        }
      }, {
        name: '中等',
        type: 'bar',
        data: MiddleList,
        barWidth: 10,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#c4e300'
            }, {
              offset: 1,
              color: '#728400'
            }]),
            opacity: 1
          }
        }
      }, {
        name: '及格',
        type: 'bar',
        data: PassList,
        barWidth: 10,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#8A2BE2'
            }, {
              offset: 1,
              color: '#7B68EE'
            }]),
            opacity: 1
          }
        }
      }, {
        name: '不及格',
        type: 'bar',
        data: FailList,
        barWidth: 10,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#F5DEB3'
            }, {
              offset: 1,
              color: '#FFEFD5'
            }]),
            opacity: 1
          }
        }
      }]
    }
    myChart.setOption(option);
  }
}
</script>

<style scoped>
#main2 {
  width: 730px;
  height: 400px;
  margin-left: 50px;
}
</style>
