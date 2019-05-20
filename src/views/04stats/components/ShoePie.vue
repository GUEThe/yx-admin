<template>
  <div :class="className" :style="{height: height,width: width}" />
</template>

<script lang="ts">
import echarts from 'echarts'
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/components/Charts/mixins/resize'

@Component
export default class ShowPie extends mixins(ResizeMixin) {
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
        data: ['机电男生', '机电女生', '通信男生', '通信女生', '计算机男生', '计算机女生', '商学院男生', '商学院女生', '外国语男生', '外国语女生', '艺术男生', '艺术女生', '数学男生', '数学女生']
      },
      series: [
        {
          name: '报到情况',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 200, name: '机电男生' },
            { value: 120, name: '机电女生' },
            { value: 140, name: '通信男生' },
            { value: 100, name: '通信女生' },
            { value: 100, name: '计算机男生' },
            { value: 49, name: '计算机女生' },
            { value: 20, name: '商学院男生' },
            { value: 80, name: '商学院女生' },
            { value: 20, name: '外国语男生' },
            { value: 39, name: '外国语女生' },
            { value: 30, name: '艺术男生' },
            { value: 70, name: '艺术女生' },
            { value: 40, name: '数学男生' },
            { value: 19, name: '数学女生' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    })
  }
}
</script>
