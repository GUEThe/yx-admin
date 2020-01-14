<template>
  <div style="padding:5px" class="StuList-class">
    <el-container>
      <el-main>
        <h3>学生列表</h3>
        <el-row type="flex">
          <CollegeSelect v-permission="['admin']" :collegeId.sync="queryOptions.college" />
          <MajorSelect :majorId.sync="queryOptions.major" />
          <el-input v-model="queryOptions.year" placeholder="年级" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.name" placeholder="姓名" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.stid" placeholder="学号" style="width:100px;"></el-input>

          <el-button type="info" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addStu()">新增</el-button>

          <el-button :disabled="selectId.length===0" type="info" @click="counselorVisible = true">设置辅导员</el-button>
          <el-button :disabled="selectId.length===0" type="info">更改学籍</el-button>
        </el-row>
        <br>

        <el-row>
          <el-select v-model="stuStatusValue" placeholder="学籍状态" @change="getStatusValue" clearable>
            <el-option v-for="item in stuStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="SchoolStatus" placeholder="在校状态" @change="getSchoolStatusValue" clearable>
            <el-option v-for="item in SchoolStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="counselorValue" placeholder="选择辅导员" @change="getcounselorValue" clearable>
            <el-option v-for="item in counselorList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-button @click="onShowCharts()">查看图表</el-button>
        </el-row>
        <br>

        <el-table v-loading="loading" :data="data" element-loading-text="正在加载..." border fit highlight-current-row
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ (queryOptions.page-1)*queryOptions.pageSize+scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学号" width="120" align="center" prop="studentId"></el-table-column>
          <el-table-column label="姓名" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="showDetails(scope.$index)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="50" align="center" prop="gender"></el-table-column>
          <el-table-column label="学院" align="center">
            <template slot-scope="scope">
              {{ scope.row.college }}
            </template>
          </el-table-column>

          <el-table-column label="辅导员" width="120" align="center" prop="counselor"></el-table-column>
          <el-table-column label="专业" align="center">
            <template slot-scope="scope">
              {{ scope.row.major }}
            </template>
          </el-table-column>
          <el-table-column label="电话" width="120" align="center" prop="phoneno"></el-table-column>
          <el-table-column label="宿舍" width="100" align="center" prop="hostel"></el-table-column>
          <el-table-column label="是否离校" width="50" align="center" prop="changetype"></el-table-column>
          <el-table-column label="学籍状态" width="50" align="center" prop="stustatus"></el-table-column>
          <el-table-column width="200" align="center">
            <template slot="header">
              操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditStudent(scope.row)">编辑</el-button>
                <el-button type="warning" size="mini" @click="onEditStuStatus(scope.row)">学籍</el-button>
                <el-button type="info" size="mini" @click="onEditStuMark(scope.row)">备注</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,sizes,prev, pager, next" :current-page.sync="queryOptions.page"
            :page-sizes="[20, 50, 100, 200]" :page-size.sync="queryOptions.pageSize" :total="total" align="center"
            @size-change="handleFilter" @current-change="requestData" />
        </div>
        <br>
      </el-main>
    </el-container>
    <stu-detail :stuId="stuInfo.id" :showDialog.sync="showStuDetail" />
    <stu-status :stuInfo="stuInfo" :showDialog.sync="showStuStatus" />
    <stu-mark :stuInfo="stuInfo" :showDialog.sync="showStuMark">
    </stu-mark>
    <stu-charts :showDialog.sync="showStuCharts" :chartsData="chartsData"></stu-charts>
    <el-dialog title="批量设置辅导员" width="300px" :visible.sync="counselorVisible">
      <el-form>
        <el-form-item label="辅导员" :label-width="formLabelWidth">
          <el-input v-model="counselor" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="counselorVisible = false">取 消</el-button>
        <el-button :loading="saving" type="primary" @click="handleUpdateCounselor">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import StudentDialog from '../components/StudentDialog.vue';
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';
import { UserModule } from '@/store/modules/user'
import { permission } from '@/directives/permission'
import { valid } from 'mockjs';
import * as echarts from 'echarts';
import StuDetail from './stuDetail.vue'
import StuStatus from './stuStatus.vue'
import StuMark from './stuMark.vue'
import StuCharts from './index.vue'
/** 学生信息管理 */
@Component({
  components: {
    StuMark,
    StuStatus,
    StuDetail,
    StudentDialog,
    CollegeSelect,
    MajorSelect,
    StuCharts
  },
  directives: {
    permission
  }
})
export default class StuList extends Vue {
  stuStatusList: object = [
    { value: '正常', label: '正常' },
    { value: '留级', label: '留级' },
    { value: '续读', label: '续读' },
    { value: '退学', label: '退学' },
  ];
  stuStatusValue: string = '';
  SchoolStatusList: object = [
    { value: '在校', label: '在校' },
    { value: '离校', label: '离校' },
  ];
  SchoolStatus: string = '';
  counselorList: object = [
    { value: '梁海', label: '梁海' },
    { value: '韦松磊', label: '韦松磊' },
    { value: '王子民', label: '王子民' },
    { value: '杜华巍', label: '杜华巍' },
  ];
  counselorValue: string = '';
  chartsData: number[] = [];
  @Prop() id!: number;
  stuInfo: models.StuInfo | Object = {};
  showStuMark: boolean = false;
  showStuDetail: boolean = false;
  showStuStatus: boolean = false;
  showStuCharts: boolean = false;
  data: models.StuInfo[] = [];
  total: number = 0;
  queryOptions: models.IQueryStuOptions = {
    year: undefined,
    bj: '',
    stid: '',
    name: '',
    college: '',
    major: '',
    type: '',
    counselor: '',
    stustatus: '',
    page: 1,
    pageSize: 20
  }
  loading: boolean = false
  selectId: string[] = []
  counselor: string = ''
  counselorVisible = false
  saving = false

  mounted() {
    this.init()
  }

  async init() {
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1;
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const resp = await api.GetStudentList(this.queryOptions)
    if (resp.code === 0) {
      this.data = resp.data!
      this.total = resp.total
    }
    this.loading = false
  }

  addStu() {
    this.stuInfo = {}
    this.showStuDetail = true
  }

  onShowCharts() {
    this.showStuCharts = true;
  }

  onEditStudent(stuInfo: models.StuInfo) {
    this.stuInfo = stuInfo
    this.showStuDetail = true
  }

  onEditStuStatus(stuInfo: models.StuInfo) {
    this.showStuStatus = true
    this.stuInfo = stuInfo
  }

  onEditStuMark(stuInfo: models.StuInfo) {
    this.showStuMark = true
    this.stuInfo = stuInfo
  }

  handleSelectionChange(selectList: models.StuInfo[]) {
    this.selectId = selectList.map((item) => {
      return item.studentId
    })
  }

  async handleUpdateCounselor() {
    this.saving = true
    const resp = await api.UpdateCounselor({ groupstid: this.selectId, counselor: this.counselor })
    if (resp.code === 0) {
      this.$message.success('更改成功')
      this.counselorVisible = false
      this.requestData()
    }
    this.saving = false
  }

  async getStatusValue() {
    this.queryOptions.stustatus = this.stuStatusValue;
    this.requestData();
  }

  async getSchoolStatusValue() {
    this.queryOptions.type = this.SchoolStatus;
    this.requestData();
  }

  async getcounselorValue() {
    this.queryOptions.counselor = this.counselorValue;
    this.requestData();
  }

}
</script>

<style>
.StuList-class .el-input {
  width: 200px;
}
</style>
