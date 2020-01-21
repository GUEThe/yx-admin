<template>
  <el-dialog width="39%" title="学籍状态图表" :visible="showinnerDialog" destroy-on-close
    @close="$emit('update:showinnerDialog',false)" :modal-append-to-body="false">
    <div id="main" style="width:500px;height:500px"></div>
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
export default class statusEchart extends Vue {
  @Prop() showinnerDialog!: boolean;
  @Prop() StuStatusData!: Array<number>
  StatusList: number[] = []
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
    pageSize: 20,
  }
  @Watch('showinnerDialog')
  async showinnerDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.createChart()
    }
  }

  async createChart() {
    let status = ['正常', '留级', '续读', '退学']
    for (let i in status) {
      this.queryOptions.stustatus = status[i]
      const resp = await api.GetStudentList(this.queryOptions)
      this.StatusList.push(resp.total);
    }
    console.log("statusList", this.StatusList)
    if (this.StatusList.length > 4) {
      this.StatusList.splice(4, this.StatusList.length - 4);
    }
    console.log("statusList", this.StatusList)
    const echart = echarts as any;
    var obj = document.getElementById('main')
    var myChart = echart.init(obj);
    var option = {
      title: {
        text: '学籍状态数据图',
        textStyle: {
          align: 'center',
          color: '#fff',
          fontSize: 20,
        },
        top: '3%',
        left: '10%',
      },
      backgroundColor: '#0f375f',
      grid: {
        top: "25%",
        bottom: "10%"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: {
            show: true
          }
        }
      },
      legend: {
        data: ["学籍状态"],
        top: "15%",
        textStyle: {
          color: "#ffffff"
        }
      },
      xAxis: {
        data: [
          "正常",
          "留级",
          "续读",
          "退学",
        ],
        axisLine: {
          show: true //隐藏X轴轴线
        },
        axisTick: {
          show: true //隐藏X轴刻度
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#ebf8ac" //X轴文字颜色
          }
        },
      },
      yAxis: [{
        type: "value",
        name: "人数",
        nameTextStyle: {
          color: "#ebf8ac"
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#ebf8ac"
          }
        },
      },
      {
        type: "value",
        gridIndex: 0,
        min: 50,
        max: 100,
        splitNumber: 8,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
          }
        }
      }
      ],
      series: [
        {
          name: "学籍状态",
          type: "bar",
          barWidth: 15,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#00FFE3"
              },
              {
                offset: 1,
                color: "#4693EC"
              }
              ])
            }
          },
          data: this.StatusList
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
}
</script>

<style scoped>
</style>
