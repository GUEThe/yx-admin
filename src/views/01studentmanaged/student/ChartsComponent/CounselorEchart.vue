<template>
  <el-dialog width="39%" title="辅导员图表" :visible="showinnerDialog" destroy-on-close :modal-append-to-body="false"
    :close-on-click-modal="false" @close="$emit('update:showinnerDialog',false)">
    <div id="main3" style="width:100%;height:500px"></div>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { deepClone } from '@/utils/index'
import echarts from 'echarts';
@Component({
  components: {
  }
})
export default class CounselorEchart extends Vue {
  @Prop() showinnerDialog!: boolean;
  @Prop() chartsData!: any
  @Prop() counselor!: string
  queryOptions: models.IQueryStuOptions = {
    year: undefined,
    bj: '',
    stid: '',
    name: '',
    college: '',
    major: '',
    type: '',
    counselor: '',
    stustatus: '',
    page: 1,
    pageSize: 20
  }
  CounselorList: number[] = [];
  colorList: any = []
  @Watch('showinnerDialog')
  async showinnerDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.createChart()
    }
  }

  createColor(colornum: number) {
    let colorList: any = []
    for (let i = 0; i < colornum; i++) {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
      colorList.push(color)
    }
    return colorList;
  }

  mounted() {
    this.colorList = this.createColor(this.counselor.length)
  }
  async createChart() {
    let counselor: any = this.counselor;
    // let colorList = this.createColor(counselor.length)
    for (let i in counselor) {
      this.queryOptions.counselor = counselor[i]
      const resp = await api.GetStudentList(this.queryOptions)
      let counselorObj: any = { 'value': resp.total, 'name': counselor[i] }
      this.CounselorList.push(counselorObj);
    }

    if (this.CounselorList.length > counselor.length) {
      this.CounselorList.splice(counselor.length, this.CounselorList.length - counselor.length);
    }
    var data = this.CounselorList;
    const echart = echarts as any;
    var obj = document.getElementById('main3')
    var myChart = echart.init(obj);
    var option = {
      backgroundColor: '#fff',
      title: {
        text: '辅导员',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '0%',
        data: counselor
      },
      series: [{
        type: 'pie',
        selectedMode: 'single',
        radius: ['25%', '58%'],
        color: this.colorList,

        label: {
          normal: {
            position: 'inner',
            formatter: '{d}%',

            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data
      }, {
        type: 'pie',
        radius: ['58%', '83%'],
        itemStyle: {
          normal: {
            color: '#F2F2F2'
          },
          emphasis: {
            color: '#ADADAD'
          }
        },
        label: {
          normal: {
            position: 'inner',
            formatter: '{c}人',
            textStyle: {
              color: '#777777',
              fontWeight: 'bold',
              fontSize: 14
            }
          }
        },
        data: data
      }]
    };
    myChart.setOption(option);
  }
}
</script>
