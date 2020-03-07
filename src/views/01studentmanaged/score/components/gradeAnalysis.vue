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
export default class gradeAnalysisDialog extends Vue {
  @Prop() stugradelist!: () => ({});
  gradedata: any = []
  @Watch('stugradelist')
  change(value: string, old: string) {
    this.createChart();
  }

  mounted() {
    this.createChart();
  }

  GetBJGradeList() {
    this.gradedata = this.stugradelist
    let BJGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (i.courseid.includes('BJ') && i.score >= 90 && i.score <= 100) {
        BJGradeList[0]++
      } else if (i.courseid.includes('BJ') && i.score >= 80 && i.score < 90) {
        BJGradeList[1]++
      } else if (i.courseid.includes('BJ') && i.score >= 70 && i.score < 80) {
        BJGradeList[2]++
      } else if (i.courseid.includes('BJ') && i.score >= 60 && i.score < 70) {
        BJGradeList[3]++
      } else if (i.courseid.includes('BJ') && i.score < 60) {
        BJGradeList[4]++
      }
    }
    return BJGradeList
  }

  GetBGGradeList() {
    this.gradedata = this.stugradelist
    let BGGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (i.courseid.includes('BG')) {
        if (i.score >= 90 && i.score <= 100) {
          BGGradeList[0]++
        } else if (i.score >= 80 && i.score < 90) {
          BGGradeList[1]++
        } else if (i.score >= 70 && i.score < 80) {
          BGGradeList[2]++
        } else if (i.score >= 60 && i.score < 70) {
          BGGradeList[3]++
        } else if (i.score < 60) {
          BGGradeList[4]++
        }
      }
    }
    return BGGradeList
  }

  GetBTGradeList() {
    this.gradedata = this.stugradelist
    let BTGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (i.courseid.includes('BT')) {
        if (i.score >= 90 && i.score <= 100) {
          BTGradeList[0]++
        } else if (i.score >= 80 && i.score < 90) {
          BTGradeList[1]++
        } else if (i.score >= 70 && i.score < 80) {
          BTGradeList[2]++
        } else if (i.score >= 60 && i.score < 70) {
          BTGradeList[3]++
        } else if (i.score < 60) {
          BTGradeList[4]++
        }
      }
    }
    return BTGradeList
  }

  GetBSGradeList() {
    this.gradedata = this.stugradelist
    let BSGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (i.courseid.includes('BS')) {
        if (i.score >= 90 && i.score <= 100) {
          BSGradeList[0]++
        } else if (i.score >= 80 && i.score < 90) {
          BSGradeList[1]++
        } else if (i.score >= 70 && i.score < 80) {
          BSGradeList[2]++
        } else if (i.score >= 60 && i.score < 70) {
          BSGradeList[3]++
        } else if (i.score < 60) {
          BSGradeList[4]++
        }
      }
    }
    return BSGradeList
  }

  GetXZGradeList() {
    this.gradedata = this.stugradelist
    let XZGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (i.courseid.includes('XZ')) {
        if (i.score >= 90 && i.score <= 100) {
          XZGradeList[0]++
        } else if (i.score >= 80 && i.score < 90) {
          XZGradeList[1]++
        } else if (i.score >= 70 && i.score < 80) {
          XZGradeList[2]++
        } else if (i.score >= 60 && i.score < 70) {
          XZGradeList[3]++
        } else if (i.score < 60) {
          XZGradeList[4]++
        }
      }
    }
    return XZGradeList
  }

  GetOtherGradeList() {
    this.gradedata = this.stugradelist
    let OtherGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (!i.courseid.includes('BJ') && !i.courseid.includes('BS') && !i.courseid.includes('BG') && !i.courseid.includes('BT') && !i.courseid.includes('XZ')) {
        if (i.score >= 90 && i.score <= 100) {
          OtherGradeList[0]++
        } else if (i.score >= 80 && i.score < 90) {
          OtherGradeList[1]++
        } else if (i.score >= 70 && i.score < 80) {
          OtherGradeList[2]++
        } else if (i.score >= 60 && i.score < 70) {
          OtherGradeList[3]++
        } else if (i.score < 60) {
          OtherGradeList[4]++
        }
      }
    }
    return OtherGradeList
  }

  async createChart() {
    this.gradedata = this.stugradelist
    let title = this.gradedata[0].name + '学生成绩'
    let excellent = 0
    let good = 0
    let middle = 0
    let pass = 0
    let fail = 0
    for (let i of this.gradedata) {
      if (i.score >= 90 && i.score <= 100) {
        excellent++
      } else if (i.score >= 80 && i.score < 90) {
        good++
      } else if (i.score >= 70 && i.score < 80) {
        middle++
      } else if (i.score >= 60 && i.score < 70) {
        pass++
      } else {
        fail++
      }
    }
    let BJGradeList = this.GetBJGradeList()
    let BGGradeList = this.GetBGGradeList()
    let BTGradeList = this.GetBTGradeList()
    let BSGradeList = this.GetBSGradeList()
    let XZGradeList = this.GetXZGradeList()
    let OtherGradeList = this.GetOtherGradeList()
    let chartData = [{
      value: excellent,
      name: '优秀',
      BJ: BJGradeList[0],
      BG: BGGradeList[0],
      BT: BTGradeList[0],
      BS: BSGradeList[0],
      XZ: XZGradeList[0],
      Other: OtherGradeList[0],
      itemStyle: { color: '#8d7fec' }
    }, {
      value: good,
      name: '良',
      BJ: BJGradeList[1],
      BG: BGGradeList[1],
      BT: BTGradeList[1],
      BS: BSGradeList[1],
      XZ: XZGradeList[1],
      Other: OtherGradeList[1],
      itemStyle: { color: '#5085f2' }
    }, {
      value: middle,
      name: '中等',
      BJ: BJGradeList[2],
      BG: BGGradeList[2],
      BT: BTGradeList[2],
      BS: BSGradeList[2],
      XZ: XZGradeList[2],
      Other: OtherGradeList[2],
      itemStyle: { color: '#e75fc3' }
    }, {
      value: pass,
      name: '及格',
      BJ: BJGradeList[3],
      BG: BGGradeList[3],
      BT: BTGradeList[3],
      BS: BSGradeList[3],
      XZ: XZGradeList[3],
      Other: OtherGradeList[3],
      itemStyle: { color: '#f87be2' }
    }, {
      value: fail,
      name: '不及格',
      BJ: BJGradeList[4],
      BG: BGGradeList[4],
      BT: BTGradeList[4],
      BS: BSGradeList[4],
      XZ: XZGradeList[4],
      Other: OtherGradeList[4],
      itemStyle: { color: '#f2719a' }
    }]
    const echart = echarts as any;
    const obj = document.getElementById('main')
    const myChart = echart.init(obj)
    const option = {
      title: [
        {
          text: title,
          textStyle: {
            fontSize: 15,
            color: 'black'
          },
          textAlign: 'center',
          x: '34.5%',
          y: '44%'
        }],
      tooltip: {
        trigger: 'item',
        formatter: function (parms: any) {
          var str = parms.marker + '' +
            parms.data.name + '</br>' +
            '课程数：' + parms.data.value + '</br>' +
            'BJ基础必修:' + parms.data.BJ + '</br>' +
            'BG公共必修:' + parms.data.BG + '</br>' +
            'BS实践必修:' + parms.data.BS + '</br>' +
            'BT专业基础必修:' + parms.data.BT + '</br>' +
            'XZ限选:' + parms.data.XZ + '</br>' +
            '其它通识课程:' + parms.data.Other + '</br>' +
            '占比：' + parms.percent + '%';
          return str;
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: '70%',
        align: 'left',
        top: 'middle',
        textStyle: {
          color: '#8C8C8C'
        },
        height: 250
      },
      series: [
        {
          name: '',
          type: 'pie',
          center: ['35%', '50%'],
          radius: ['40%', '65%'],
          clockwise: false,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (parms: any) {
                return parms.data.name
              }
            }
          },
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },
          data: chartData
        }
      ]
    }
    myChart.setOption(option);
  }
}
</script>

<style scoped>
#main {
  width: 400px;
  height: 300px;
  float: left;
  margin-top: 60px;
}
</style>
