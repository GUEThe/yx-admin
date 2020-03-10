<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="100px" :disabled="loading">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="formData.role"></el-input>
        </el-form-item>
        <el-form-item label="学院代码">
          <el-input v-model="formData.collegeCode"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="formData.studentId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button-group>
          <el-button type="button" icon="el-icon-close" @click="$emit('update:showDialog',false)">取消</el-button>
          <el-button type="primary" icon="el-icon-check" @click="onSubmitAsync()">提交</el-button>
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
export default class UserDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() type!: number;
  @Prop() id!: number | string;

  private dialogTitle: string = '';

  private loading = false;
  private formData: models.User = {
    id: 0,
    username: '',
    password: '',
    nickname: '',
    role: '',
    collegeCode: '',
    studentId: ''
  }

  mounted() {
    //
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    if (this.type) {
      this.dialogTitle = '编辑用户信息';
      const { data } = await api.GetUser({ id: this.id as number });
      this.formData = Object.assign(this.formData, data!);
    } else {
      this.dialogTitle = '增加用户信息';
    }
    if (!val) {
      this.formData = {
        id: 0,
        username: '',
        password: '',
        nickname: '',
        role: '',
        collegeCode: '',
        studentId: ''
      }
    }
  }

  async onSubmitAsync() {
    const { data } = this.type ? await api.PutUser({ value: this.formData, id: this.id as string }) : await api.PostUser({ value: this.formData });
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
