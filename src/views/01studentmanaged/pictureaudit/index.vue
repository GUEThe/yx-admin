<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>新生照片审核</h3>
        <el-select v-model="listQuery.status" placeholder="审核状态" clearable @change="getStudentAsync()">
          <el-option :value="0" label="待审核"></el-option>
          <el-option :value="1" label="审核通过"></el-option>
          <el-option :value="2" label="审核不通过"></el-option>
        </el-select>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="身份证号" align="center" prop="idCardNo"></el-table-column>
          <el-table-column label="照片" align="center" prop="picture">
            <template slot-scope="scope">
              <el-image :src="'/v1/'+scope.row.picture"></el-image>
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
                <el-button type="primary" size="mini" @click="onSubmitAsync(scope.row,1)">审核通过</el-button>
                <el-button type="danger" size="mini" @click="onSubmitAsync(scope.row,2)">审核不通过</el-button>
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
      enum Studentstatus {
        待审核,
        审核通过,
        审核不通过
      }
      return Studentstatus[status]
    }
  }
})
export default class AuditPicture extends Vue {
  listLoading: boolean = false;
  listData: models.Student[] = [];
  search = '';
  page = 1;
  total = 0;
  listQuery = {
    page: 1,
    pageSize: 20,
    status: undefined,
    year: 0
  }

  mounted() {
    this.listQuery.year = new Date().getFullYear();
    this.getStudentAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getStudentAsync(val);
  }

  async getStudentAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetStudentImgList(this.listQuery);
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  async onSubmitAsync(row: models.Student, audit: number) {
    row.status = audit;
    const { data } = await api.PutStudent({ value: row })
    if (data) {
      this.$message.success('操作成功！');
    }
  }
}
</script>

<style scoped>
</style>
