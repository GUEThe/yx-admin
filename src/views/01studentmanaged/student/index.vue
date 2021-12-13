<template>
  <el-dialog width="45%" title="图表" :visible="showDialog" destroy-on-close append-to-body :modal-append-to-body="false"
    @close="$emit('update:showDialog',false)">
    <el-button-group>
      <el-button type="primary" @click="createStatusEchart()">学籍状态</el-button>
      <el-button type="primary" @click="createSchoolStatusEchart()">在校状态</el-button>
      <el-button type="primary" @click="createCounselorEChart()">辅导员</el-button>
    </el-button-group>

    <StatusEchart :showinnerDialog.sync="showstatusEchart" :queryOptions="queryOptions"
      style="margin-top: -7vh;width:100%;">
    </StatusEchart>
    <SchoolStatusEchart :showinnerDialog.sync="showSchoolStatusEchart" :queryOptions="queryOptions"
      style="margin-top: -7vh;"></SchoolStatusEchart>
    <CounselorEchart :showinnerDialog.sync="showCounselorEchart" :queryOptions="queryOptions" style="margin-top: -7vh;"
      :counselor="counselor">
    </CounselorEchart>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { deepClone } from '@/utils/index'
import echarts from 'echarts';
import { stat } from 'fs';
import StatusEchart from './ChartsComponent/statusEchart.vue';
import SchoolStatusEchart from './ChartsComponent/SchoolStatusEchart.vue'
import CounselorEchart from './ChartsComponent/CounselorEchart.vue'
@Component({
  components: {
    StatusEchart,
    SchoolStatusEchart,
    CounselorEchart
  }
})
//  todo 学籍信息统计
export default class index extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() chartsData!: string[];
  @Prop() counselor!: string[];
  @Prop() queryOptions!: any;
  showstatusEchart: boolean = false;
  showSchoolStatusEchart: boolean = false;
  showCounselorEchart: boolean = false;
  @Watch('showDialog')
  async showDialogChange(val: boolean, old: boolean) {

  }

  createStatusEchart() {
    this.showstatusEchart = true;
  }

  createSchoolStatusEchart() {
    this.showSchoolStatusEchart = true;
  }

  createCounselorEChart() {
    this.showCounselorEchart = true;
    this.counselor = this.counselor
  }
}
</script>

<style scoped>
</style>
