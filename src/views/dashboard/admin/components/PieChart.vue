<template>
  <div :class="className" :style="{height: height,width: width}" />
</template>

<script lang="ts">
import echarts from 'echarts'
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/components/Charts/mixins/resize'

@Component
export default class PieChart extends mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: '100%' }) private width!: string
  @Prop({ default: '300px' }) private height!: string

  mounted() {
    this.initChart()
  }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['机电', '通信', '计算机', '商学院', '外国语', '艺术', '数学']
      },
      series: [
        {
          name: '报到情况',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: '机电' },
            { value: 240, name: '通信' },
            { value: 149, name: '计算机' },
            { value: 100, name: '商学院' },
            { value: 59, name: '外国语' },
            { value: 100, name: '艺术' },
            { value: 59, name: '数学' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    })
  }
}
</script>
