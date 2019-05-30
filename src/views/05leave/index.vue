<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>请假列表</h3>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.type ? '普通请假类':'申请保留入学资格' }}
            </template>
          </el-table-column>
          <el-table-column label="预计到校时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.arrivalTime | timeFm }}
            </template>
          </el-table-column>
          <el-table-column label="请假原因" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reason" type="textarea" readonly :rows="3"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.status | stateFilter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onSubmitAsync(scope.row,2)">审核通过</el-button>
                <el-button type="danger" size="mini" @click="onSubmitAsync(scope.row,3)">审核不通过</el-button>
              </el-button-group>
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
import { parseTime } from '@/utils/index';

/** 请假管理 */
@Component({
  components: {},
  filters: {
    timeFm(val: number) {
      return parseTime(val);
    },
    stateFilter(status: number) {
      enum Leavestatus {
        保存 = 0,
        已提交待审核,
        通过,
        不通过
      }
      return Leavestatus[status]
    }
  }
})
export default class Leave extends Vue {
  listLoading: boolean = false;
  listData: models.Leave[] = [];
  search = '';
  page = 1;
  total = 0;

  mounted() {
    this.getLeaveAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getLeaveAsync(val);
  }

  async getLeaveAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetLeaveList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  async onSubmitAsync(row: models.Leave, audit: number) {
    row.status = audit;
    const { data } = await api.PutLeave({ id: row.id, model: row })
    if (data) {
      this.$message.success('操作成功！');
    }
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该请假项？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteLeave({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.Leave) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
