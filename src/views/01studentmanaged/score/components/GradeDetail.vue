<template>
  <div>
    <el-container>
      <el-main>
        <div id="detailbox"></div>
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
export default class GradeDetail extends Vue {
  @Prop() stugradelist!: () => ({});
  gradedata: any = []

  @Watch('stugradelist')
  change(value: string, old: string) {
    this.createChart();
  }

  mounted() {
    this.createChart();
  }

  getEachCourseNum(course: String) {
    this.gradedata = this.stugradelist
    let courseNum = 0
    let courseTotalScore = 0
    let courselist: any = []
    if (course === 'other') {
      for (let i of this.gradedata) {
        if (!i.courseid.includes('BJ') &&
          !i.courseid.includes('BG') &&
          !i.courseid.includes('BS') &&
          !i.courseid.includes('BT') &&
          !i.courseid.includes('XZ') &&
          !i.courseid.includes('RZ')) {
          courseNum++
          courseTotalScore += i.score
          courselist.push(i)
        }
      }
    } else {
      this.gradedata.filter((item: any) => {
        if (item.courseid.includes(course)) {
          courseNum++
          courseTotalScore += item.score
          courselist.push(item)
        }
      })
    }
    return { 'num': courseNum, 'average': (courseTotalScore / courseNum).toFixed(2) }
  }

  async createChart() {
    let plantCap = [{
      name: 'BJ基础必修',
      value: this.getEachCourseNum('BJ').num,
      average: this.getEachCourseNum('BJ').average
    }, {
      name: 'BG公共必修',
      value: this.getEachCourseNum('BG').num,
      average: this.getEachCourseNum('BG').average
    }, {
      name: 'BS实践必修',
      value: this.getEachCourseNum('BS').num,
      average: this.getEachCourseNum('BS').average
    }, {
      name: 'BT专业基础必修',
      value: this.getEachCourseNum('BT').num,
      average: this.getEachCourseNum('BT').average
    }, {
      name: 'XZ限选',
      value: this.getEachCourseNum('XZ').num,
      average: this.getEachCourseNum('XZ').average
    }, {
      name: 'RZ任选',
      value: this.getEachCourseNum('RZ').num,
      average: this.getEachCourseNum('RZ').average
    }, {
      name: '其它选修课',
      value: this.getEachCourseNum('other').num,
      average: this.getEachCourseNum('other').average
    }];
    let datalist = [{
      offset: [56, 48],
      symbolSize: 120,
      opacity: 0.95,
      color: '#f467ce'
    }, {
      offset: [45, 80],
      symbolSize: 95,
      opacity: 0.88,
      color: '#7aabe2'
    }, {
      offset: [20, 43],
      symbolSize: 90,
      opacity: 0.84,
      color: '#ff7123'
    }, {
      offset: [83, 60],
      symbolSize: 100,
      opacity: 0.8,
      color: '#ffc400'
    }, {
      offset: [36, 20],
      symbolSize: 90,
      opacity: 0.75,
      color: '#00BFFF'
    }, {
      offset: [65, 88],
      symbolSize: 90,
      opacity: 0.9,
      color: '#00FF7F'
    }, {
      offset: [74, 10],
      symbolSize: 90,
      opacity: 0.7,
      color: '#8A2BE2'
    }];
    let datas = [];
    for (let i = 0; i < plantCap.length; i++) {
      let item = plantCap[i];
      let itemToStyle = datalist[i];
      datas.push({
        name: item.name + '\n' + '总共：' + item.value + '\n' + '平均分：' + item.average,
        value: itemToStyle.offset,
        symbolSize: itemToStyle.symbolSize,
        label: {
          normal: {
            textStyle: {
              fontSize: 13
            }
          }
        },
        itemStyle: {
          normal: {
            color: itemToStyle.color,
            opacity: itemToStyle.opacity
          }
        }
      })
    }
    const echart = echarts as any;
    const obj = document.getElementById('detailbox')
    const myChart = echart.init(obj)
    myChart.on('click', (params: any) => {
      console.log(params)
    })
    const option = {
      grid: {
        show: false,
        top: 10,
        bottom: 10
      },
      xAxis: [{
        gridIndex: 0,
        type: 'value',
        show: false,
        min: 0,
        max: 100,
        nameLocation: 'middle',
        nameGap: 5
      }],
      yAxis: [{
        gridIndex: 0,
        min: 0,
        show: false,
        max: 100,
        nameLocation: 'middle',
        nameGap: 30
      }],
      series: [{
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 120,
        label: {
          normal: {
            show: true,
            formatter: '{b}',
            color: '#fff',
            textStyle: {
              fontSize: '20'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#00acea'
          }
        },
        data: datas
      }]
    }
    myChart.setOption(option);
  }
}
</script>

<style scoped>
#detailbox {
  width: 100%;
  height: 400px;
  float: right;
}
</style>
