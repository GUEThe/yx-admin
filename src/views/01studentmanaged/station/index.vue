<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>新生到站统计</h3>
        <el-select v-model="listQuery.station" placeholder="站点" @change="getGetStudentStation()">
          <el-option :value="undefined" label="全部"></el-option>
          <el-option value="桂林站"></el-option>
          <el-option value="桂林北站"></el-option>
          <el-option value="桂林西站"></el-option>
          <el-option value="两江机场"></el-option>
        </el-select>
        <el-select v-model="listQuery.isNeed" clearable placeholder="是否需要接待" @change="getGetStudentStation()">
          <el-option :value="0" label="否"></el-option>
          <el-option :value="1" label="是"></el-option>
        </el-select>
        &nbsp; 抵达时间段:<el-date-picker v-model="listQuery.time" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学院code" align="center" prop="collegeCode"></el-table-column>
          <el-table-column label="专业code" align="center" prop="majorCode"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="性别" align="center" prop="gender"></el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="到站" align="center" prop="station"></el-table-column>
          <el-table-column label="人数" align="center" prop="peopleNum"></el-table-column>
          <el-table-column label="行李数" align="center" prop="baggageNum"></el-table-column>
          <el-table-column label="到达时间" align="center" prop="arriveTime"></el-table-column>
          <el-table-column label="是否需要接待" align="center" prop="picture">
            <template slot-scope="scope">
              {{ scope.row.isNeed?'是':'否' }}
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="20" :total="total"
            align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

/** 请假管理 */
@Component({})
export default class AuditPicture extends Vue {
  listLoading: boolean = false;
  listData: models.StudentStationView[] = [];
  search = '';
  page = 1;
  total = 0;
  value1 = '';
  listQuery = {
    page: 1,
    pageSize: 20,
    station: undefined,
    isNeed: undefined,
    time: [''],
    year: 0
  }

  mounted() {
    this.listQuery.year = new Date().getFullYear();
    this.getGetStudentStation();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getGetStudentStation(val);
  }

  async getGetStudentStation(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetStudentStationList(this.listQuery);
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }
}
</script>

<style scoped>
</style>
