<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>学生鞋子统计</h3>
        <el-row type="flex">
          <CampusSelect />
          <CollegeSelect />
          <MajorSelect />
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onEditFee(0)">搜索</el-button>
        </el-row>
        <br>
        <el-table v-loading="listLoading" :data="listData" element-loading-text="正在加载..." border fit
          highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="校区" align="center" prop="campus"></el-table-column>
          <el-table-column label="学院" align="center" prop="college"></el-table-column>
          <el-table-column label="专业" align="center" prop="major"></el-table-column>
          <el-table-column label="男生" align="center" prop="boy"></el-table-column>
          <el-table-column label="女生" align="center" prop="girl"></el-table-column>
          <el-table-column label="总人数" align="center" prop="amount"></el-table-column>
        </el-table>
        <el-button type="primary" icon="el-icon-download">导出到excel</el-button>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20" :total="total"
            align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
    <div class="chart-wrapper">
      <pie-chart />
    </div>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import CampusSelect from '@/components/CampusSelect/index.vue';
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';
import PieChart from '../components/ShoePie.vue';

/** 报道统计 */
@Component({
  components: {
    CampusSelect, CollegeSelect, MajorSelect, PieChart
  }
})
export default class Shoe extends Vue {
  listLoading: boolean = false;
  listData: any[] = [
    { campus: '花江校区', college: '机电', major: '机电工程', boy: '200', girl: '120', amount: '320' },
    { campus: '花江校区', college: '通信', major: '通信工程', boy: '140', girl: '100', amount: '240' },
    { campus: '花江校区', college: '计算机', major: '计算机工程', boy: '100', girl: '49', amount: '149' },
    { campus: '花江校区', college: '商学院', major: '会计学', boy: '20', girl: '80', amount: '100' },
    { campus: '花江校区', college: '外国语', major: '外语专业', boy: '20', girl: '39', amount: '59' },
    { campus: '花江校区', college: '艺术学院', major: '艺术', boy: '30', girl: '70', amount: '100' },
    { campus: '花江校区', college: '数学', major: '数学', boy: '40', girl: '19', amount: '59' }
  ];

  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    // this.getPayAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getPayAsync(val);
  }

  async getPayAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetFeeList({ page, pageSize: 20, keyword: '' });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }
}
</script>

<style scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
