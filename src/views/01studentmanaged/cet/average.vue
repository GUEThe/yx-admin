<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>四六级平均分统计查询</h3>
        <el-row type="flex">
          <el-input v-model="queryOptions.grade" placeholder="年级" style="width:150px;"></el-input>
          <CollegeSelect :collegeId.sync="queryOptions.college" />
          <CetTermSelect :term.sync="queryOptions.term" />

          <el-select v-model="queryOptions.name" placeholder="统计方式">
            <el-option v-for="item in nameList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryOptions.type" placeholder="CET类型">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="info" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
        </el-row>
        <br>
        <el-table v-loading="loading" :data="data" element-loading-text="正在加载..." border sortable fit
          highlight-current-row>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>

          <el-table-column label="名称" align="center" prop="name"></el-table-column>
          <el-table-column label="学期" align="center" prop="term"></el-table-column>
          <el-table-column label="考试类型" align="center" prop="type"></el-table-column>
          <el-table-column label="状态" align="center" prop="isPass"></el-table-column>
          <el-table-column label="人数" align="center" prop="stuCount"></el-table-column>
          <el-table-column label="总分" align="center" prop="score"></el-table-column>
          <el-table-column label="听力" align="center" prop="listen"></el-table-column>
          <el-table-column label="阅读" align="center" prop="reading"></el-table-column>
          <el-table-column label="写作" align="center" prop="writing"></el-table-column>
          <el-table-column label="综合" align="center" prop="others"></el-table-column>
        </el-table>
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
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import CetTermSelect from '@/components/CetTermSelect/index.vue';
@Component({
  components: {
    CollegeSelect,
    CetTermSelect
  },
  directives: {
    permission
  }
})
export default class cetAverage extends Vue {
  loading: boolean = false;
  data: models.CETAverage[] = [];
  total = 0;
  queryOptions = {
    grade: new Date().getFullYear() - 1,
    college: '',
    term: '',
    type: 4,
    name: '专业'
  }
  typeList: object = [
    { value: 4, label: '四级' },
    { value: 6, label: '六级' }
  ];
  nameList: object = [
    { value: '专业', label: '按专业统计' },
    { value: '班级', label: '按班级统计' }
  ];

  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  async handleFilter() {
    this.loading = true;
    const resp = await api.GetAverageScore(this.queryOptions)
    if (resp.code === 0) {
      this.data = resp.data!
      this.total = resp.total
    }
    this.loading = false;
  }
}
</script>

<style>
</style>
