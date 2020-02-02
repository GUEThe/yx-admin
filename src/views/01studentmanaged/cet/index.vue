<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>四六级成绩查询</h3>
        <el-row type="flex">
          <el-input v-model="queryOptions.year" placeholder="年度" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.stid" placeholder="学号" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.name" placeholder="姓名" style="width:100px;"></el-input>
          <el-select v-model="queryOptions.type" placeholder="类型">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="info" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
        </el-row>
        <br>
        <el-table v-loading="listLoading" :data="listData" element-loading-text="正在加载..." border sortable fit
          highlight-current-row :default-sort="{prop: 'courseno', order: 'descending'}">
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="stid"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="学期" align="center" prop="term"></el-table-column>
          <el-table-column label="考试类型" align="center" prop="type"></el-table-column>
          <el-table-column label="总分" align="center" prop="score"></el-table-column>

          <el-table-column label="听力" align="center" prop="listen"></el-table-column>
          <el-table-column label="阅读" align="center" prop="reading"></el-table-column>
          <el-table-column label="写作" align="center" prop="writing"></el-table-column>
          <el-table-column label="综合" align="center" prop="others"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-container>
      <el-main>
        <CETchart :showDialog.sync="showcetchart" v-if="showcetchart" v-loading="listLoading"
          element-loading-text="正在加载..." :StuInfo.sync="queryOptions"></CETchart>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { UserModule } from '@/store/modules/user'
import { permission } from '@/directives/permission'
import CETchart from './components/charts.vue'
@Component({
  components: {
    CETchart
  },
  directives: {
    permission
  }
})
export default class cet extends Vue {
  num: number = 0;
  showcetchart: boolean = false;
  listLoading: boolean = false;
  listData: models.CET[] = [];
  search = '';
  showDialog = false;
  total = 0;
  queryOptions = {
    stid: '',
    name: '刘见凤',
    type: 4,
    year: undefined
  }
  typeList: object = [
    { value: undefined, label: '不限' },
    { value: 4, label: '四级' },
    { value: 6, label: '六级' }
  ];
  stuStatusValue: string = '';
  get token() {
    return UserModule.token;
  }
  mounted() { }

  async handleFilter() {
    console.log('父组件', this.num);
    this.showcetchart = true;
    if (this.queryOptions.year === null && this.queryOptions.stid === '' && this.queryOptions.name === '') {
      this.$message.error('请输入学号或姓名')
      return
    }
    this.listLoading = true;
    const { data, total } = await api.GetCetList(this.queryOptions);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }
}
</script>

<style>
</style>
