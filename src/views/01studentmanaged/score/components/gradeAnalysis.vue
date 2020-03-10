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

  getList(courseNature: String) {
    this.gradedata = this.stugradelist
    let list: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (i.courseid.includes(courseNature)) {
        if (i.score >= 90 && i.score <= 100) {
          list[0]++
        } else if (i.score >= 80 && i.score < 90) {
          list[1]++
        } else if (i.score >= 70 && i.score < 80) {
          list[2]++
        } else if (i.score >= 60 && i.score < 70) {
          list[3]++
        } else if (i.score < 60) {
          list[4]++
        }
      }
    }
    return list
  }

  GetOtherGradeList() {
    this.gradedata = this.stugradelist
    let OtherGradeList: any = [0, 0, 0, 0, 0]
    for (let i of this.gradedata) {
      if (!i.courseid.includes('BJ') &&
        !i.courseid.includes('BS') &&
        !i.courseid.includes('BG') &&
        !i.courseid.includes('BT') &&
        !i.courseid.includes('XZ') &&
        !i.courseid.includes('RZ')) {
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

  getTotalCredithour() {
    let totalCredit = 0
    for (let i of this.gradedata) {
      if (i.score >= 60) {
        totalCredit += i.credithour
      }
    }
    return totalCredit
  }

  async createChart() {
    this.gradedata = this.stugradelist
    let title = '成绩分布'
    let subtext = '学分：' + this.getTotalCredithour()
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
    let OtherGradeList = this.GetOtherGradeList()
    let chartData = [{
      value: excellent,
      name: '优秀',
      BJ: this.getList('BJ')[0],
      BG: this.getList('BG')[0],
      BT: this.getList('BT')[0],
      BS: this.getList('BS')[0],
      XZ: this.getList('XZ')[0],
      RZ: this.getList('RZ')[0],
      Other: OtherGradeList[0],
      itemStyle: { color: '#8d7fec' }
    }, {
      value: good,
      name: '良',
      BJ: this.getList('BJ')[1],
      BG: this.getList('BG')[1],
      BT: this.getList('BT')[1],
      BS: this.getList('BS')[1],
      XZ: this.getList('XZ')[1],
      RZ: this.getList('RZ')[1],
      Other: OtherGradeList[1],
      itemStyle: { color: '#5085f2' }
    }, {
      value: middle,
      name: '中等',
      BJ: this.getList('BJ')[2],
      BG: this.getList('BG')[2],
      BT: this.getList('BT')[2],
      BS: this.getList('BS')[2],
      XZ: this.getList('XZ')[2],
      RZ: this.getList('RZ')[2],
      Other: OtherGradeList[2],
      itemStyle: { color: '#e75fc3' }
    }, {
      value: pass,
      name: '及格',
      BJ: this.getList('BJ')[3],
      BG: this.getList('BG')[3],
      BT: this.getList('BT')[3],
      BS: this.getList('BS')[3],
      XZ: this.getList('XZ')[3],
      RZ: this.getList('RZ')[3],
      Other: OtherGradeList[3],
      itemStyle: { color: '#f87be2' }
    }, {
      value: fail,
      name: '不及格',
      BJ: this.getList('BJ')[4],
      BG: this.getList('BG')[4],
      BT: this.getList('BT')[4],
      BS: this.getList('BS')[4],
      XZ: this.getList('XZ')[4],
      RZ: this.getList('RZ')[4],
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
          subtext: subtext,
          textStyle: {
            fontSize: 20,
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
            'RZ任选:' + parms.data.RZ + '</br>' +
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
      series: [{
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
      }, {
        name: '',
        type: 'pie',
        center: ['35%', '50%'],
        radius: ['40%', '65%'],
        clockwise: false,
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'inner',
            formatter: function (parms: any) {
              return parms.data.value
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
      }]
    }
    myChart.setOption(option);
  }
}
</script>

<style scoped>
#main {
  width: 400px;
  height: 400px;
  float: left;
}
</style>
