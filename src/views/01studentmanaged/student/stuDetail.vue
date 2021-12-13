<template>
  <el-dialog width="900px" :title="dialogTitle" :visible="showDialog" destroy-on-close
    @close="$emit('update:showDialog',false)">
    <el-form :model="stuDetail" label-width="80px" :disabled="loading">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="stuDetail.name" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-radio-group v-model="stuDetail.gender" :disabled="isDisabled">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期">
            <el-date-picker v-model="stuDetail.birthday" :readonly="isDisabled" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input v-model="stuDetail.idCardNo" :readonly="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学号">
            <el-input v-model="stuDetail.studentId" :readonly="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考生号">
            <el-input v-model="stuDetail.examineeNo" :readonly="isDisabled"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="学院">
            <CollegeSelect :collegeId.sync="stuDetail.college" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业">
            <MajorSelect :name.sync="stuDetail.major" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年级">
            <el-input v-model="stuDetail.grade"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班级">
            <el-input v-model="stuDetail.class"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="宿舍">
            <el-input v-model="stuDetail.hostel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-input v-model="stuDetail.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="籍贯">
            <el-input v-model="stuDetail.nativePlace"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input v-model="stuDetail.phoneno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ号">
            <el-input v-model="stuDetail.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家长名字">
            <el-input v-model="stuDetail.familyheader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家长号码">
            <el-input v-model="stuDetail.parentphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭地址">
            <el-input v-model="stuDetail.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮编">
            <el-input v-model="stuDetail.postcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱">
            <el-input v-model="stuDetail.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="辅导员">
            <el-select v-model="stuDetail.counselor">
              <el-option v-for="item in counselor" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="button" @click="$emit('update:showDialog',false)">
          取消
        </el-button>
        <el-button :loading="saving" type="primary" @click="handleSave()">{{ okText }}</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';

@Component({
  components: {
    CollegeSelect,
    MajorSelect
  }
})
export default class StudentDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() type!: number;
  @Prop() stuId!: string;
  @Prop() counselor!: any;
  dialogTitle: string = '新增学生';
  okText: string = '新增';
  isDisabled: boolean = false;
  loading = false;
  stuDetail: models.StuInfo | Object = {};
  editable: boolean = false;
  saving: boolean = false;

  @Watch('showDialog')
  async showDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.init()
    }
  }

  init() {
    if (this.stuId) {
      this.isDisabled = true
      this.getStuInfo(this.stuId)
      this.dialogTitle = '编辑学生信息'
      this.okText = '保存'
    }
  }

  async getStuInfo(stuId: string) {
    this.loading = true
    const resp = await api.GetStudentInfo({ stid: stuId })
    console.log(resp);
    if (resp.code === 0) {
      this.stuDetail = resp.data as models.StuInfo
    }
    this.loading = false
  }

  async handleSave() {
    this.saving = true
    if (this.stuId) {
      const resp = await api.PutStudent({ value: this.stuDetail as models.StuInfo })
      if (resp.code === 0) {
        this.$message.success('修改成功');
        this.showDialog = false;
      }
    }
    //  else {
    //   const resp = await api.PostStudent({student:this.stuDetail as models.StuInfo  })
    //   console.log(resp);
    //   this.$message.success('添加成功');
    // }
    this.saving = false
  }
}
</script>

<style scoped>
</style>
