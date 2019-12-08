<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>学生管理</h3>
        <el-row type="flex">
          <CollegeSelect v-permission="['admin']" :collegeId.sync="listQuery.college" />
          <el-input v-model="listQuery.year" placeholder="年级" style="width:150px;"></el-input>
          <MajorSelect :majorId.sync="listQuery.major" />
          <el-input v-model="listQuery.stid" placeholder="学号" style="width:150px;"></el-input>
          <el-input v-model="listQuery.name" placeholder="姓名" style="width:100px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getStuAsync()">搜索</el-button>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getAllStu()">显示图表</el-button>
        </el-row>
        <br>
        <el-table v-loading="listLoading"
          :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="showDetails(scope.$index)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center" prop="gender"></el-table-column>
          <el-table-column label="学院" align="center">
            <template slot-scope="scope">
              {{ scope.row.college }}
            </template>
          </el-table-column>
          <el-table-column label="专业" align="center">
            <template slot-scope="scope">
              {{ scope.row.major }}
            </template>
          </el-table-column>
          <el-table-column label="电话" align="center" prop="hostelphone"></el-table-column>
          <el-table-column label="宿舍" align="center" prop="hostel"></el-table-column>
          <el-table-column align="center" width="100">
            <template slot="header">
              操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditStudent(scope.row.id)">编辑</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header">
              日志操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onAddStudentLog(scope.row.id)">添加</el-button>
                <el-button type="primary" size="mini" @click="onGetStudentLog(scope.row.id)">获取</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header">
              备注信息操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onAddStudentNote(scope.row.studentId)">添加</el-button>
                <el-button type="primary" size="mini" @click="onGetStudentNote(scope.row.studentId)">获取</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20"
            :total="total" align="center" />
        </div>
        <br>
      </el-main>
    </el-container>

    <!-- 修改学生信息的Dialog对话框 -->
    <el-dialog width="40%" :visible="showDialog" title="修改学生信息" @close="showDialog=false">
      <el-form ref="studentInfo" :model="studentInfo" :inline="true">
        <!-- 电话字段 -->
        <el-form-item label="电话">
          <el-input v-model="studentInfo.hostelphone" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 宿舍字段 -->
        <el-form-item label="宿舍">
          <el-input v-model="studentInfo.hostel" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 是否在校字段 -->
        <el-form-item label="是否在校">
          <el-select v-model="studentInfo.changetype" placeholder="选择是否在校">
            <el-option label="在校" value="在校"></el-option>
            <el-option label="离校" value="离校"></el-option>
          </el-select>
        </el-form-item>
        <!-- 学籍状态 -->
        <el-form-item label="学籍状态">
          <el-select v-model="studentInfo.stustatus" placeholder="选择学籍状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="留级" value="留级"></el-option>
            <el-option label="续读" value="续读"></el-option>
            <el-option label="退学" value="退学"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="transmitFormInfo(id)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加学生备注信息的Dialog对话框 -->
    <el-dialog width="40%" :visible="addStuLogDialog" title="添加操作日志信息" @close="addStuLogDialog=false">
      <el-form ref="addStuLogForm" :model="addStuLogForm" :inline="true">
        <!-- id字段 -->
        <el-form-item label="ID">
          <el-input v-model="addStuLogForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 学号字段 -->
        <el-form-item label="学生类型">
          <el-input v-model="addStuLogForm.xh" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 类型字段 -->
        <el-form-item label="类型">
          <el-input v-model="addStuLogForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 处理办法字段 -->
        <el-form-item label="操作人">
          <el-input v-model="addStuLogForm.handler" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStuLogDialog = false">取 消</el-button>
        <el-button type="primary" @click="AddLogInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改学生备注信息的Dialog对话框 -->
    <el-dialog width="40%" :visible="updateStuLogDialog" title="修改操作日志信息" @close="updateStuLogDialog=false">
      <el-form ref="updateStuLogForm" :model="updateStuLogForm" :inline="true">
        <!-- id字段 -->
        <el-form-item label="ID">
          <el-input v-model="updateStuLogForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 学号字段 -->
        <el-form-item label="学生类型">
          <el-input v-model="updateStuLogForm.xh" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 类型字段 -->
        <el-form-item label="类型">
          <el-input v-model="updateStuLogForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 处理办法字段 -->
        <el-form-item label="操作人">
          <el-input v-model="updateStuLogForm.handler" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateStuLogDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateLogInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加学生备注信息的Dialog字段 -->
    <el-dialog width="40%" :visible="addNoteDialog" title="添加备注" @close="addNoteDialog=false">
      <el-form ref="addNoteForm" :model="addNoteForm" :inline="true">
        <!-- 学号字段 -->
        <el-form-item label="学生类型">
          <el-input v-model="addNoteForm.xh" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 备注字段 -->
        <el-form-item label="备注">
          <el-input v-model="addNoteForm.mark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNoteDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFormInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 获取备注表格的Dialog -->
    <el-dialog width="40%" :visible="getNoteDialog" title="获取备注" @close="getNoteDialog=false">
      <el-table :data="NoteData">
        <el-table-column property="id" label="id" width="100"></el-table-column>
        <el-table-column property="xh" label="学生类型" width="100"></el-table-column>
        <el-table-column property="type" label="日志类型" width="100"></el-table-column>
        <el-table-column property="mark" label="备注" width="100"></el-table-column>
        <el-table-column property="handler" label="操作人" width="100"></el-table-column>
        <el-table-column align="center" width="100">
          <template slot="header">
            删除备注
          </template>
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="danger" size="mini" @click="DelNote(scope.row.id)" icon="el-icon-delete">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getNoteDialog = false">退出</el-button>
      </div>
    </el-dialog>

    <!-- 获取日志表格的Dialog -->
    <el-dialog width="40%" :visible="getLogDialog" title="获取日志" @close="getLogDialog=false">
      <el-table :data="LogData">
        <el-table-column property="id" label="id" width="100"></el-table-column>
        <el-table-column property="xh" label="学生类型" width="100"></el-table-column>
        <el-table-column property="type" label="日志类型" width="100"></el-table-column>
        <el-table-column property="handler" label="操作人" width="100"></el-table-column>
        <el-table-column align="center" width="100">
          <template slot="header">
            删除日志
          </template>
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="danger" size="mini" @click="DelLog(scope.row.id)" icon="el-icon-delete">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100">
          <template slot="header">
            修改日志
          </template>
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="danger" size="mini" @click="onUpdateStudentLog(scope.row.id)" icon="el-icon-edit">修改
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getLogDialog = false">退出</el-button>
      </div>
    </el-dialog>

    <el-container>
      <el-main>
        <div id="chart" style="width:40%;height:400px;float:left;" v-loading="chartloading"></div>
        <div id="chart2" style="width:40%;height:400px;float:right;" v-loading="chartloading"></div>
      </el-main>
    </el-container>
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

/** 学生信息管理 */
@Component({
  components: {
    StudentDialog,
    CollegeSelect,
    MajorSelect
  },
  directives: {
    permission
  }
})
export default class StuReport extends Vue {
  @Prop() id!: number;
  listLoading: boolean = false;
  chartloading: boolean = false;
  listData: models.Newstudent[] = [];
  stuDetails: models.Newstudent | null = null;
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false; // 修改学生信息的Dialog对话框是否隐藏的变量
  showUpoad = false;
  page = 1;
  total = 0;
  ID = 0;
  addStuLogDialog: boolean = false; // 添加学生日志信息的Dialog对话框是否隐藏的变量
  updateStuLogDialog: boolean = false;// 修改学生日志信息的Dialog对话框是否隐藏的变量
  addNoteDialog: boolean = false;  //添加学生备注的信息的Dialog
  getNoteDialog: boolean = false;  //获取学生备注信息Dialog
  getLogDialog: boolean = false; //获取学生日志信息Dialog
  pickerOptions = { // 时间变量
    shortcuts: [{
      text: '今天',
      onClick(picker: any) {
        picker.$emit('pick', new Date());
      }
    }]
  };
  addTime = '';
  updateTime = '';
  listQuery = {
    page: 1,
    pageSize: 20,
    college: '',
    major: '',
    name: '',
    type: '',
    stid: '1700301329',
    year: null
  };
  numberAtSchool: number = 0; // 在校学生数量
  numberNotAtSchool: number = 0; // 离校学生数量
  normal: number = 0;   //学籍状态正常
  repeater: number = 0;  //学籍状态留级
  continueReading: number = 0;//学籍状态续读
  leaveSchool: number = 0;//学籍状态退学

  // 第一张表单的数据存储
  selectedPersonData = {
    id: 0,
    name: '',
    gender: '',
    studentId: '',
    examineeNo: '',
    idCardNo: '',
    college: '',
    major: '',
    class: '',
    year: 0,
    type: '',
    nativePlace: '',
    grade: 0,
    spno: '',
    nation: '',
    birthday: '',
    enrolldate: '',
    hostel: '',
    hostelphone: '',
    postcode: '',
    address: '',
    phoneno: '',
    familyheader: '',
    changetype: '',
    counselor: '',
    parentphone: '',
    familyaddress: '',
    qq: '',
    email: '',
    stustatus: ''
  };
  private studentInfo: models.StuInfo = {
    id: 0,
    name: '',
    gender: '',
    studentId: '',
    examineeNo: '',
    idCardNo: '',
    college: '',
    major: '',
    class: '',
    year: 0,
    type: '',
    nativePlace: '',
    grade: 0,
    spno: '',
    nation: '',
    birthday: '',
    enrolldate: '',
    hostel: '',
    hostelphone: '',
    postcode: '',
    address: '',
    phoneno: '',
    familyheader: '',
    changetype: '',
    counselor: '',
    parentphone: '',
    familyaddress: '',
    qq: '',
    email: '',
    stustatus: ''
  };

  // 添加学生日志信息的Dialog字段
  Log = {
    id: 0,
    xh: '',
    type: 0,
    time: '',
    mark: '',
    handler: ''
  };
  private addStuLogForm: models.OperateLog = {
    id: 0,
    xh: '',
    type: 0,
    time: new Date().toLocaleString(),
    mark: '',
    handler: ''
  };

  // 修改日志信息的Dialog字段
  updateLog = {
    id: 0,
    xh: '',
    type: 0,
    time: '',
    mark: '',
    handler: ''
  };
  private updateStuLogForm: models.OperateLog = {
    id: 0,
    xh: '',
    type: 0,
    time: new Date().toLocaleString(),
    mark: '',
    handler: ''
  }

  //添加备注变量
  private addNoteForm: models.OperateLog = {
    id: 0,
    xh: '',
    type: 0,
    time: '',
    mark: '',
    handler: 'xuegong'
  }

  NoteID = []; //删除日志时需要的id
  NoteData = []; //获取备注的Dialog的表格绑定的数据
  LogData = [];  //日志的表格绑定的数据

  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getStuAsync(val);
  }

  // 点击搜索显示20条数据
  async getStuAsync(page: number = 1) {
    this.listQuery.pageSize = 20;
    this.listLoading = true;
    this.listQuery.page = page;
    const { data, total } = await api.GetStudentList(this.listQuery);
    console.log('打印出data数据', data, total);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
    // 属性赋值
    this.selectedPersonData.id = data[0].id;
    this.selectedPersonData.name = data[0].name;
    this.selectedPersonData.gender = data[0].gender;
    this.selectedPersonData.studentId = data[0].studentId;
    this.selectedPersonData.examineeNo = data[0].examineeNo;
    this.selectedPersonData.idCardNo = data[0].idCardNo;
    this.selectedPersonData.college = data[0].college;
    this.selectedPersonData.major = data[0].major;
    this.selectedPersonData.class = data[0].class;
    this.selectedPersonData.year = data[0].year;
    this.selectedPersonData.type = data[0].type;
    this.selectedPersonData.nativePlace = data[0].nativePlace;
    this.selectedPersonData.grade = data[0].grade;
    this.selectedPersonData.spno = data[0].spno;
    this.selectedPersonData.nation = data[0].nation;
    this.selectedPersonData.birthday = data[0].birthday;
    this.selectedPersonData.enrolldate = data[0].enrolldate;
    this.selectedPersonData.postcode = data[0].postcode;
    this.selectedPersonData.address = data[0].address;
    this.selectedPersonData.phoneno = data[0].phoneno;
    this.selectedPersonData.familyheader = data[0].familyheader;
    this.selectedPersonData.counselor = data[0].counselor;
    this.selectedPersonData.parentphone = data[0].parentphone;
    this.selectedPersonData.familyaddress = data[0].familyaddress;
    this.selectedPersonData.qq = data[0].qq;
    this.selectedPersonData.email = data[0].email;

    this.Log.id = data[0].id;
    this.Log.xh = data[0].studentId;
  }

  // 编辑按钮点击
  onEditStudent(index: number) {
    console.log('onEditStudent', index)
    this.ID = index;
    this.stuDetails = this.listData[index - 1];
    this.showDialog = true;
    this.studentInfo.hostelphone = '';
    this.studentInfo.hostel = '';
    this.studentInfo.changetype = '';
    this.studentInfo.stustatus = '';
  }

  showDetails(index: number) {
    console.log(index)
    this.stuDetails = this.listData[index];
    this.showDialog = true;
  }

  // dialog下的确认按钮点击
  async transmitFormInfo() {
    this.studentInfo.id = this.selectedPersonData.id;
    this.studentInfo.name = this.selectedPersonData.name;
    this.studentInfo.gender = this.selectedPersonData.gender;
    this.studentInfo.studentId = this.selectedPersonData.studentId;
    this.studentInfo.examineeNo = this.selectedPersonData.examineeNo;
    this.studentInfo.idCardNo = this.selectedPersonData.idCardNo;
    this.studentInfo.college = this.selectedPersonData.college;
    this.studentInfo.major = this.selectedPersonData.major;
    this.studentInfo.class = this.selectedPersonData.class;
    this.studentInfo.year = this.selectedPersonData.year;
    this.studentInfo.type = this.selectedPersonData.type
    this.studentInfo.nativePlace = this.selectedPersonData.nativePlace;
    this.studentInfo.grade = this.selectedPersonData.grade;
    this.studentInfo.spno = this.selectedPersonData.spno;
    this.studentInfo.nation = this.selectedPersonData.nation;
    this.studentInfo.birthday = this.selectedPersonData.birthday;
    this.studentInfo.enrolldate = this.selectedPersonData.enrolldate;
    this.studentInfo.postcode = this.selectedPersonData.postcode;
    this.studentInfo.address = this.selectedPersonData.address;
    this.studentInfo.phoneno = this.selectedPersonData.phoneno;
    this.studentInfo.familyheader = this.selectedPersonData.familyheader;
    this.studentInfo.counselor = this.selectedPersonData.counselor;
    this.studentInfo.parentphone = this.selectedPersonData.parentphone;
    this.studentInfo.familyaddress = this.selectedPersonData.familyaddress;
    this.studentInfo.qq = this.selectedPersonData.qq;
    this.studentInfo.email = this.selectedPersonData.email;

    console.log('显示form表单的信息', this.studentInfo);
    console.log('打印出selectedPersondata2', this.selectedPersonData);
    const { data } = await api.PutStudent({ value: this.studentInfo });
    if (data) {
      this.$message.success('修改成功');
      this.showDialog = false;
      this.getStuAsync();
    } else {
      console.log('修改失败');
    }
  }

  // 时间传值
  transmitToForm(val: any) {
    if (this.addStuLogDialog == true) {
      this.addStuLogForm.time = val;
    } else if (this.updateStuLogDialog == true) {
      this.updateStuLogForm.time = val;
    }
  }

  // 打开添加日志
  onAddStudentLog(index: number) {
    this.addStuLogDialog = true;
    this.addStuLogForm.xh = this.Log.xh;
  }

  // 打开修改日志
  onUpdateStudentLog(index: number) {
    this.updateStuLogDialog = true;
    this.ID = this.Log.id;
    this.updateStuLogForm.xh = this.Log.xh;
    console.log('LOG', this.Log, this.ID);
  }

  //打开添加备注
  onAddStudentNote(index: string) {
    this.addNoteDialog = true;
    this.addNoteForm.xh = index;
  }

  // 日志提交
  async AddLogInfo() {
    this.addStuLogForm.xh = this.Log.xh;
    const { data } = await api.PostOperateLog({ model: this.addStuLogForm });
    if (data) {
      this.$message.success('添加日志成功');
      this.addStuLogDialog = false;
      this.getStuAsync();
    } else {
      console.log('提交失败');
    }
    console.log('提交后', this.addStuLogForm);
    // this.LogData.push(this.addStuLogForm);
    var comment = this.addStuLogForm;
    var list = JSON.parse(localStorage.getItem("cmts") || '[]');
    list.unshift(comment);
    localStorage.setItem('cmts', JSON.stringify(list));
  }

  // 日志修改
  async updateLogInfo() {
    this.updateStuLogForm.xh = this.Log.xh;
    const { data } = await api.PutOperateLog({ id: this.id, model: this.updateStuLogForm });
    console.log(this.ID, data);

    var cmts = JSON.parse(localStorage.getItem('cmts'));
    for (let i = 0; i < cmts.length; i++) {
      if (cmts[i].id == this.updateStuLogForm.id) {
        cmts[i].xh = this.updateStuLogForm.xh;
        cmts[i].type = this.updateStuLogForm.type;
        cmts[i].handler = this.updateStuLogForm.handler;
        localStorage.setItem('cmts', JSON.stringify(cmts));
      }
    }
    //本地获取日志
    var list = JSON.parse(localStorage.getItem("cmts") || '[]');
    this.LogData = list;

    if (!data) {
      this.$message.success('修改日志成功');
      this.updateStuLogDialog = false;
      this.getStuAsync();
    } else {
      console.log('修改失败');
    }
    console.log('更新后', this.updateStuLogForm);
  }

  // 日志获取
  onGetStudentLog(id: number) {
    this.getLogDialog = true;
    var list = JSON.parse(localStorage.getItem("cmts") || '[]');
    this.LogData = list;
  }

  //日志删除
  async DelLog(index: number) {
    console.log("显示删除的id", index);
    let id = index;
    this.$confirm('确定删除该条日志？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteOperateLog({ id })
      console.log('del', data, index);
      //本地删除日志
      var cmts = JSON.parse(localStorage.getItem('cmts'));
      for (let i = 0; i < cmts.length; i++) {
        if (cmts[i].id == index) {
          cmts.splice(i, 1);
          localStorage.setItem('cmts', JSON.stringify(cmts));
        }
      }
      //本地获取日志
      var list = JSON.parse(localStorage.getItem("cmts") || '[]');
      this.LogData = list;

      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.NoteData = this.NoteData.filter((e: models.OperateLog) => e.id !== id);
    }).catch(() => {
      //
    });
  }

  //备注提交
  async addFormInfo() {
    this.addNoteForm.time = new Date().toLocaleString();
    const { data } = await api.PostStudentMark({ xh: this.addNoteForm.xh, mark: this.addNoteForm.mark });
    // console.log("返回数据", typeof (data), data);
    this.NoteID.push(data);
    // console.log("this.NoteID", this.NoteID);
    if (data) {
      this.$message.success('添加备注成功');
      this.addNoteDialog = false;
      this.getStuAsync();
      console.log("返回数据", data);
    } else {
      console.log('提交失败');
    }
  }

  //备注获取
  async onGetStudentNote(index: number) {
    const { data } = await api.GetStudentMark({ stid: index });
    console.log("返回获取的data", data);
    if (data) {
      this.getNoteDialog = true;
      this.NoteData = data;
    } else {
      console.log("获取失败或者没有记录");
    }
  }

  //备注删除
  async DelNote(index: number) {
    console.log("该ID值为：", index);
    let id = index;
    this.$confirm('确定删除该条备注？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteStudentMark({ id })
      console.log('del', data, index);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.NoteData = this.NoteData.filter((e: models.Newstudent) => e.id !== id);
    }).catch(() => {
      //
    });
  }

  // 获取在校学生总数
  async getAllStu() {
    this.listQuery.pageSize = 8000;
    this.chartloading = true;
    const { data, total } = await api.GetStudentList(this.listQuery);
    console.log('打印出全部data数据', data, total);
    this.chartloading = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].changetype == '在校') {
        this.numberAtSchool++;
      } else {
        this.numberNotAtSchool++;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].stustatus == '正常') {
        this.normal++;
      } else if (data[i].stustats == '留级') {
        this.repeater++;
      } else if (data[i].stustats == '续读') {
        this.continueReading++;
      } else if (data[i].stustatus == '退学') {
        this.leaveSchool++;
      }
    }
    console.log('在校学生数量', this.numberAtSchool);
    this.createChart();
    this.createChart2();
  }

  // 渲染离校在校数据图表
  createChart() {
    const echart = echarts as any;
    const chart = echart.init(document.getElementById('chart'));
    const chartData = [{
      name: '在校',
      value: this.numberAtSchool
    },
    {
      name: '离校',
      value: this.numberNotAtSchool
    }];
    chart.setOption({
      backgroundColor: '#05274C',
      grid: {
        left: '20%'
      },
      color: ['#2AC9FD', '#76FBC0', '#35C96E', '#FCC708', '#48B188', '#5957C2', '#4A5D73'],
      series: [
        {
          color: ['#2AC9FD', '#76FBC0', '#35C96E', '#FCC708', '#48B188', '#5957C2'],
          type: 'pie',
          radius: ['62', '100'],
          labelLine: {
            normal: {
              length: 25,
              length2: 120,
              lineStyle: {
                type: 'solid'
              }
            }

          },
          label: {
            normal: {
              formatter: (params: any) => {
                console.log(params);
                return '{b| ' + params.name + '}  ' + '{c|' + params.percent.toFixed(0) + '%}'
              },
              borderWidth: 0,
              borderRadius: 4,
              padding: [0, -86],
              height: 70,
              fontSize: 13,
              align: 'center',
              color: '#3494BD',
              rich: {
                b: {
                  fontSize: 12,
                  lineHeight: 20,
                  color: '#41B3DC',
                  padding: [0, 0, 5, 0]
                },
                c: {
                  fontSize: 20,
                  lineHeight: 20,
                  color: 'orange'
                }

              }
            }
          },
          data: chartData
        },
        {
          type: 'pie',
          radius: ['110', '111'],
          data: [100],
          label: {
            show: false
          }
        },
        {
          type: 'pie',
          radius: ['50', '51'],
          data: [100],
          label: {
            show: false
          }
        }
      ]
    }, true);
  }

  //渲染学籍状态图标
  createChart2() {
    const echart = echarts as any;
    const chart2 = echart.init(document.getElementById('chart2'));
    chart2.setOption({
      backgroundColor: "#0B1837",
      color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
      grid: {
        left: -100,
        top: 50,
        bottom: 10,
        right: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vartical",
        // x: "right",
        top: "center",
        right: "15",
        // bottom: "0%",
        itemWidth: 16,
        itemHeight: 8,
        itemGap: 16,
        textStyle: {
          color: '#A3E2F4',
          fontSize: 12,
          fontWeight: 0
        },
        data: ['正常', '留级', '续读', '退学']
      },
      polar: {},
      angleAxis: {
        interval: 1,
        type: 'category',
        data: [],
        z: 10,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#0B4A6B",
            width: 1,
            type: "solid"
          },
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: "#0B4A6B",
          margin: 8,
          fontSize: 16
        },
      },
      radiusAxis: {
        min: 40,
        max: 120,
        interval: 20,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#0B3E5E",
            width: 1,
            type: "solid"
          },
        },
        axisLabel: {
          formatter: '{value} %',
          show: false,
          padding: [0, 0, 20, 0],
          color: "#0B3E5E",
          fontSize: 16
        },
        splitLine: {
          lineStyle: {
            color: "#0B3E5E",
            width: 2,
            type: "solid"
          }
        }
      },
      calculable: true,
      series: [{
        type: 'pie',
        radius: ["5%", "10%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        data: [{
          name: '',
          value: 0,
          itemStyle: {
            normal: {
              color: "#0B4A6B"
            }
          }
        }]
      }, {
        type: 'pie',
        radius: ["90%", "95%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        name: "",
        data: [{
          name: '',
          value: 0,
          itemStyle: {
            normal: {
              color: "#0B4A6B"
            }
          }
        }]
      }, {
        stack: 'a',
        type: 'pie',
        radius: ['20%', '80%'],
        roseType: 'area',
        zlevel: 10,
        label: {
          normal: {
            show: true,
            formatter: "{c}",
            textStyle: {
              fontSize: 12,
            },
            position: 'outside'
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 20,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        data: [{
          value: this.normal,
          name: '正常'
        },
        {
          value: this.repeater,
          name: '留级'
        },
        {
          value: this.continueReading,
          name: '续读'
        },
        {
          value: this.leaveSchool,
          name: '退学'
        },
        ]
      },]
    }, true);
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
