<template>
  <div>
    <el-container>
      <el-main>
        <div id="main3"></div>
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
export default class averageGradeChart extends Vue {
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
    return Array.from(new Set(termlist))
  }

  GetAverageGrade(term: any) {
    let termlist = this.GetTermList()
    let list = []
    let sum = 0
    let num = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.courseid.includes(term)) {
          sum += j.score
          num++
        }
      }
      list.push((sum / num).toFixed(2))
      sum = 0
      num = 0
    }
    return list
  }

  async createChart() {
    let termlist = this.GetTermList()
    let BJlist = this.GetAverageGrade('BJ')
    let BGlist = this.GetAverageGrade('BG')
    let BSlist = this.GetAverageGrade('BS')
    let BTlist = this.GetAverageGrade('BT')
    let XZlist = this.GetAverageGrade('XZ')
    const echart = echarts as any;
    const obj = document.getElementById('main3')
    const myChart = echart.init(obj)
    const fontColor = '#30eee9';
    const option = {
      backgroundColor: '#11183c',
      grid: {
        left: '5%',
        right: '10%',
        top: '20%',
        bottom: '15%',
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'item'
      },
      legend: {
        show: true,
        x: 'center',
        y: '35',
        icon: 'stack',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#1bb4f6'
        },
        data: ['BJ基础必修', 'BG公共必修', 'BS实践必修', 'BT专业基础必修', 'XZ限选']
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: fontColor
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#397cbc'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#195384'
            }
          },
          data: termlist
        }
      ],
      yAxis: [{
        type: 'value',
        name: '平均分',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#2ad1d2'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#27b4c2'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#11366e'
          }
        }
      }],
      series: [{
        name: 'BJ基础必修',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#0092f6',
            lineStyle: {
              color: '#0092f6',
              width: 4
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(0,146,246,0.9)'
              }])
            }
          }
        },
        data: BJlist
      }, {
        name: 'BG公共必修',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#00d4c7',
            lineStyle: {
              color: '#00d4c7',
              width: 4
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(0,212,199,0.9)'
              }])
            }
          }
        },
        data: BGlist
      }, {
        name: 'BS实践必修',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#aecb56',
            lineStyle: {
              color: '#aecb56',
              width: 4
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(114,144,89,0.9)'
              }])
            }
          }
        },
        data: BSlist
      }, {
        name: 'BT专业基础必修',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#FF00FF',
            lineStyle: {
              color: '#FF00FF',
              width: 4
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(114,144,89,0.9)'
              }])
            }
          }
        },
        data: BTlist
      }, {
        name: 'XZ限选',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#FFE4E1',
            lineStyle: {
              color: '#FFE4E1',
              width: 4
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(114,144,89,0.9)'
              }])
            }
          }
        },
        data: XZlist
      }]
    }
    myChart.setOption(option);
  }
}
</script>

<style scoped>
#main3 {
  height: 400px;
}
</style>
