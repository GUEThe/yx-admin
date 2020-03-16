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

  GetAverageGrade(course: any) {
    let termlist = this.GetTermList()
    let list = []
    let sum = 0
    let num = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i && j.courseid.includes(course)) {
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

  getCreditScore() {
    let termlist = this.GetTermList()
    let list = []
    let sum = 0
    let credit = 0
    for (let i of termlist) {
      for (let j of this.gradedata) {
        if (j.term === i &&
          (j.courseid.includes('BJ') ||
            j.courseid.includes('BG') ||
            j.courseid.includes('BS') ||
            j.courseid.includes('BT') ||
            j.courseid.includes('XZ') ||
            j.courseid.includes('RZ'))) {
          sum += j.score * j.credithour
          credit += j.credithour
        }
      }
      list.push((sum / credit).toFixed(2))
    }
    return list
  }

  async createChart() {
    let termlist = this.GetTermList()
    const echart = echarts as any;
    const obj = document.getElementById('main3')
    const myChart = echart.init(obj)
    const fontColor = '#000000';
    const option = {
      backgroundColor: '#FFFFFF',
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
        icon: 'circle',
        itemWidth: 15,
        itemHeight: 15,
        textStyle: {
          color: '#1bb4f6'
        },
        data: ['BJ基础必修', 'BG公共必修', 'BS实践必修', 'BT专业基础必修', 'XZ限选', 'RZ任选', '学分绩']
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
              // color: '#397cbc'
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
        name: '平均分/学分绩',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}'
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
        symbolSize: 4,
        itemStyle: {
          normal: {
            color: '#0092f6',
            lineStyle: {
              color: '#0092f6',
              width: 2
            }
          }
        },
        data: this.GetAverageGrade('BJ')
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
              width: 2
            }
          }
        },
        data: this.GetAverageGrade('BG')
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
              width: 2
            }
          }
        },
        data: this.GetAverageGrade('BS')
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
              width: 2
            }
          }
        },
        data: this.GetAverageGrade('BT')
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
              width: 2
            }
          }
        },
        data: this.GetAverageGrade('XZ')
      }, {
        name: 'RZ任选',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#A0522D',
            lineStyle: {
              color: '#A0522D',
              width: 2
            }
          }
        },
        data: this.GetAverageGrade('RZ')
      }, {
        name: '学分绩',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#FF0000',
            lineStyle: {
              color: '#FF0000',
              width: 2
            }
          }
        },
        data: this.getCreditScore()
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
