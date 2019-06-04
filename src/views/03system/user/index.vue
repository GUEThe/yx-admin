<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>用户管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditUser(0)">新增用户</el-button>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="用户名" align="center" prop="username"></el-table-column>
          <el-table-column label="密码" align="center" prop="password"></el-table-column>
          <el-table-column label="昵称" align="center" prop="nickname"></el-table-column>
          <el-table-column label="角色" align="center" prop="role"></el-table-column>
          <el-table-column label="学院代码" align="center" prop="collegeCode"></el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditUser(scope.row.id,1)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onDeleteAsync(scope.row.id)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20" :total="total"
            align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
    <UserDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getUserAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import UserDialog from '../components/UserDialog.vue';

/** 用户管理 */
@Component({
  components: {
    UserDialog
  }
})
export default class UserReport extends Vue {
  listLoading: boolean = false;
  listData: models.User[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    this.getUserAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getUserAsync(val);
  }

  async getUserAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetUserList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditUser(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该用户？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteUser({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.User) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
