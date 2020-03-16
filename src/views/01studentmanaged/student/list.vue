<template>
  <div style="padding:5px" class="StuList-class">
    <el-container>
      <el-main>
        <h3>学生列表</h3>
        <el-row type="flex">
          <CollegeSelect v-permission="['admin']" :collegeId.sync="queryOptions.college" />
          <MajorSelect :name.sync="queryOptions.major" />
          <el-input v-model="queryOptions.grade" placeholder="年级" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.name" placeholder="姓名" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.stid" placeholder="学号" style="width:100px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="addStu()">新增</el-button> -->
          <el-button :disabled="selectId.length===0" type="info" @click="counselorDialogVisable = true">
            批量修改辅导员
          </el-button>

          <el-button :disabled="selectId.length===0" type="info" @click="stustatusDialogVisable = true">
            批量修改学籍
          </el-button>

          <el-button type="primary" class="el-icon-download" @click="exportExcel">导出学生数据</el-button>
        </el-row>
        <br>
        <el-row>
          <el-select v-model="stuStatusValue" placeholder="学籍状态" @change="getstuStatusValue">
            <el-option v-for="item in stuStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="typeValue" placeholder="在校状态" @change="getTypeValue">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryOptions.counselor" placeholder="辅导员" :multiple-limit="10" clearable>
            <el-option v-for="item in counselorSelect" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-button @click="onShowCharts()">查看图表</el-button>
        </el-row>
        <br>

        <el-table id="exportexcel" ref="multipleTable" v-loading="loading" :data="data" element-loading-text="正在加载..."
          border fit highlight-current-row @selection-change="handleSelectionChange">
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
          <el-table-column label="辅导员" width="120" align="center" prop="counselor">
          </el-table-column>
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
    <stu-detail :stuId="stuInfo.studentId" :showDialog.sync="showStuDetail" :counselor="counselorSelect" />
    <stu-status :stuInfo="stuInfo" :showDialog.sync="showStuStatus" />
    <stu-mark :stuInfo="stuInfo" :showDialog.sync="showStuMark">
    </stu-mark>
    <stu-charts :showDialog.sync="showStuCharts" :chartsData="chartsData" :counselor="counselorSelect"
      :queryOptions="queryOptions">
    </stu-charts>

    <el-dialog title="批量设置辅导员" width="300px" :visible.sync="counselorDialogVisable">
      <el-form>
        <el-form-item label="辅导员">
          <el-select v-model="counselor" autocomplete="off">
            <el-option v-for="item in counselorSelect" :key="item" :value="item" :label="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="counselorDialogVisable = false">取 消</el-button>
        <el-button :loading="saving" type="primary" @click="handleUpdateCounselor">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量修改学籍" width="300px" :visible.sync="stustatusDialogVisable">
      <el-form>
        <el-form-item label="学籍">
          <el-select v-model="stustatus" autocomplete="off">
            <el-option v-for="item in stuStatusList" :key="item.label" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stustatusDialogVisable = false">取 消</el-button>
        <el-button :loading="saving" type="primary" @click="handleUpdateStuStatus">确 定</el-button>
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
import exportJson2Excel from '@/utils/excel'
import { formatJson } from '@/utils'
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
    { value: '', label: '不限' }
  ];
  stuStatusValue: string = '';
  // 在校状态
  typeList: object = [
    { value: '在校', label: '在校' },
    { value: '离校', label: '离校' },
    { value: '', label: '不限' }
  ];
  typeValue: string = '';
  counselorValue: string = '';
  counselorSelect: any = ['梁海老师', '杜华巍老师', '王宇英老师', '李老师', '林湘老师'];
  chartsData: any = [];
  @Prop() id!: number;
  stuInfo: models.StuInfo | Object = {};
  showStuMark: boolean = false;
  showStuDetail: boolean = false;
  showStuStatus: boolean = false;
  showStuCharts: boolean = false;
  data: models.StuInfo[] = [];
  total: number = 0;
  queryOptions = {
    grade: undefined,
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
  stustatus: string = ''
  counselorDialogVisable = false
  stustatusDialogVisable = false
  saving = false
  filename = '学生列表'
  mounted() {
    this.init()
  }

  @Watch('showStuDetail')
  rechangeByStuDetail(val: boolean, old: boolean) {
    if (!val) {
      this.init()
    }
  }

  @Watch('showStuStatus')
  rechangeByStuStatus(val: boolean, old: boolean) {
    if (!val) {
      this.init()
    }
  }

  async init() {
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1;
    this.queryOptions.pageSize = 20
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const resp = await api.GetStudentList(this.queryOptions)
    if (resp.code === 0) {
      this.data = resp.data!
      this.total = resp.total
    }
    console.log(this.data[0]);

    this.loading = false
  }

  addStu() {
    this.stuInfo = {}
    this.showStuDetail = true
  }

  async onShowCharts() {
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
      this.counselorDialogVisable = false
      this.requestData()
    }
    this.saving = false
  }

  async handleUpdateStuStatus() {
    this.saving = true
    const resp = await api.UpdateStustatus({ groupstid: this.selectId, stustatus: this.stustatus })
    if (resp.code === 0) {
      this.$message.success('更改成功')
      this.stustatusDialogVisable = false
      this.requestData()
    }
    this.saving = false
  }

  async getstuStatusValue() {
    this.queryOptions.stustatus = this.stuStatusValue;
  }

  async getTypeValue() {
    this.queryOptions.type = this.typeValue;
  }

  async getcounselorValue() {
    this.queryOptions.counselor = this.counselorValue;
  }

  async exportExcel() {
    let query = JSON.parse(JSON.stringify(this.queryOptions))
    query.pageSize = this.total
    const resp = await api.GetStudentList(query)
    let list = resp.data
    const tHeader = [
      '序号', '姓名', '性别', '学号', '考生号',
      '身份证号', '学院名称', '专业名称', '班级', '入学年份',
      '类型（本科，专科）', '生源所在省份', '年级', '专业代码', '民族',
      '生日', '注册时间', '宿舍', '宿舍电话', '邮编',
      '家庭地址', '手机', '家长', '学生状态（在校，离校，休学）', '辅导员姓名',
      '家长电话', '家庭地址', 'QQ', 'Email', '学籍状态（正常，留级，续读，退学,毕业）']
    const filterVal = [
      'id', 'name', 'gender', 'studentId', 'examineeNo',
      'idCardNo', 'college', 'major', 'class', 'year',
      'type', 'nativePlace', 'grade', 'spno', 'nation',
      'birthday', 'enrolldate', 'hostel', 'hostelphone', 'postcode',
      'address', 'phoneno', 'familyheader', 'changetype', 'counselor',
      'parentphone', 'familyaddress', 'qq', 'email', 'stustatus']
    const data = formatJson(filterVal, list)
    exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined, undefined, undefined, true, 'xlsx')
  }
}
</script>

<style>
.StuList-class .el-input {
  width: 200px;
}
</style>
