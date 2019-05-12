<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" fullscreen @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="100px" :disabled="loading">
        <el-form-item label="姓名">
          <el-input v-model="formData.name" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio :value="0" label="男" />
            <el-radio :value="1" label="女" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出生日期">
          <el-date-picker v-model="formData.birthDay" type="date" placeholder="选择日期" :readonly="!editdisable">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="学号">
          <el-input v-model="formData.studentId" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="考生号">
          <el-input v-model="formData.examineeNo" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="formData.idCardNo" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="学院代码">
          <el-input v-model="formData.collegeCode" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="专业代码">
          <el-input v-model="formData.majorCode" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="班级">
          <el-input v-model="formData.class" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="年度">
          <el-input v-model="formData.year" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-input v-model="formData.type" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="衣服尺寸">
          <el-input v-model="formData.clothesSize" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="鞋码">
          <el-input v-model="formData.shoesSize" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-input v-model="formData.picture" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="政治面貌">
          <el-input v-model="formData.politicalStatus" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="婚否">
          <el-radio-group v-model="formData.marriage">
            <el-radio :value="0" label="是" />
            <el-radio :value="1" label="否" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="籍贯">
          <el-input v-model="formData.nativePlace" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="出生地">
          <el-input v-model="formData.birthPlace" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="国家">
          <el-input v-model="formData.nation" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="formData.phone" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="QQ号">
          <el-input v-model="formData.qqNo" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="formData.mailingAddress" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="家长名字">
          <el-input v-model="formData.parentName" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="家长号码">
          <el-input v-model="formData.parentPhone" :readonly="!editdisable"></el-input>
        </el-form-item>

        <el-form-item label="是否来校报道">
          <el-radio-group v-model="formData.isCome">
            <el-radio :value="0" label="是" />
            <el-radio :value="1" label="否" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="报道时间">
          <el-date-picker v-model="formData.birthDay" type="dateTime" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button-group>
          <el-button v-if="editdisable" type="button" icon="el-icon-close" @click="$emit('update:showDialog',false)">取消</el-button>
          <el-button v-if="editdisable" type="primary" icon="el-icon-check" @click="onSubmitAsync()">提交</el-button>
        </el-button-group>
      </div>
    </el-dialog>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

@Component({})
export default class StudentDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() type!: number;
  @Prop() id!: number;

  private dialogTitle: string = '';

  private loading = false;
  private formData: models.Student = {
    id: 0,
    name: '',
    gender: 0,
    birthDay: 0,
    birthPlace: '',
    studentId: '',
    examineeNo: '',
    idCardNo: '',
    collegeCode: '',
    majorCode: '',
    class: '',
    year: 0,
    type: '',
    clothesSize: '',
    shoesSize: '',
    picture: 0,
    politicalStatus: '',
    marriage: 0,
    nativePlace: '',
    nation: '',
    phone: '',
    qqNo: '',
    mailingAddress: '',
    parentName: '',
    parentPhone: '',
    isCome: 0,
    time: 0
  }

  mounted() {
    //
  }

  get editdisable() {
    return this.type !== 3;
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    if (this.type) {
      this.type === 3 ? this.dialogTitle = '查看学生信息' : this.dialogTitle = '编辑学生信息';
      const { data } = await api.GetStudent({ id: this.id });
      this.formData = data!;
    } else {
      this.dialogTitle = '增加学生';
    }
    if (!val) {
      this.formData = {
        id: 0,
        name: '',
        gender: 0,
        birthDay: 0,
        birthPlace: '',
        studentId: '',
        examineeNo: '',
        idCardNo: '',
        collegeCode: '',
        majorCode: '',
        class: '',
        year: 0,
        type: '',
        clothesSize: '',
        shoesSize: '',
        picture: 0,
        politicalStatus: '',
        marriage: 0,
        nativePlace: '',
        nation: '',
        phone: '',
        qqNo: '',
        mailingAddress: '',
        parentName: '',
        parentPhone: '',
        isCome: 0,
        time: 0
      }
    }
  }

  async onSubmitAsync() {
    const { data } = this.type ? await api.PutStudent({ id: this.id, value: this.formData }) : await api.PostStudent({ student: this.formData });
    if (data) {
      this.$message.success('操作成功！');
      this.$emit('refresh');
      this.$emit('update:showDialog', false);
    }
  }
}
</script>

<style scoped>
</style>
