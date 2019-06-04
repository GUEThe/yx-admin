<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>校区管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditCampus(0)">新增校区</el-button>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="校区名称" align="center" prop="name"></el-table-column>
          <el-table-column label="校区地址" align="center" prop="address"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditCampus(scope.row.id,1)">编辑</el-button>
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
    <CampusDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getCampusAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import CampusDialog from '../components/CampusDialog.vue';

/** 校区管理 */
@Component({
  components: {
    CampusDialog
  }
})
export default class Campus extends Vue {
  listLoading: boolean = false;
  listData: models.Campus[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    this.getCampusAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getCampusAsync(val);
  }

  async getCampusAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetCampusList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditCampus(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该校区？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteCampus({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.Campus) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
