<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>学生成绩查询</h3>
        <el-row type="flex">
          <el-input v-model="listQuery.stid" placeholder="学号" style="width:150px;"></el-input>
          <el-input v-model="listQuery.name" placeholder="姓名" style="width:100px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getStuAsync()">搜索</el-button>
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
          <el-table-column label="课号" align="center" prop="courseno"></el-table-column>
          <el-table-column label="课程名称" align="center" prop="cname"></el-table-column>
          <el-table-column label="成绩" align="center" prop="score"></el-table-column>
          <el-table-column label="考试类型" align="center" prop="ttype"></el-table-column>
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

@Component({
  components: {

  },
  directives: {
    permission
  }
})
export default class StuReport extends Vue {
  listLoading: boolean = false;
  listData: models.GDscore[] = [];

  search = '';
  showDialog = false;
  total = 0;
  listQuery = {
    stid: ''
  }

  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  async getStuAsync() {
    this.listLoading = true;
    const { data, total } = await api.GetGuetStudentScore(this.listQuery);
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }
}
</script>

<style>
</style>
