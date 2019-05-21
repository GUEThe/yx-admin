<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>绿色通道管理</h3>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId">
            <template slot-scope="scope">
              <el-button type="text" @click="onEditGreenChannel(scope.row.studentId)">{{ scope.row.studentId }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="申请缓缴金额" align="center" prop="amount"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.status | stateFilter }}
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
    <GreenChannelDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getGreenChannelAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import GreenChannelDialog from '../components/GreenChannelDialog.vue';

/** 绿色通道管理 */
@Component({
  components: {
    GreenChannelDialog
  },
  filters: {
    stateFilter(status: number) {
      enum greenchannelstatus {
        保存 = 0,
        已提交待审核,
        通过,
        不通过
      }
      return greenchannelstatus[status]
    }
  }
})
export default class GreenChannel extends Vue {
  listLoading: boolean = false;
  listData: models.GreenChannel[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    this.getGreenChannelAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getGreenChannelAsync(val);
  }

  async getGreenChannelAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetGreenChannelList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditGreenChannel(id: number = 0) {
    this.editId = id;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该校区？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteGreenChannel({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.GreenChannel) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
