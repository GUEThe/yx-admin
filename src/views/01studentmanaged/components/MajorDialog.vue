<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="100px" :disabled="loading">
        <el-form-item label="专业名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="专业代码">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="所属学院代码">
          <el-input v-model="formData.collegeCode"></el-input>
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
export default class MajorDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() type!: number;
  @Prop() id!: number;

  private dialogTitle: string = '';

  private loading = false;
  private formData: models.Major = {
    id: 0,
    name: '',
    code: '',
    collegeCode: ''
  }

  mounted() {
    //
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    if (this.type) {
      this.dialogTitle = '编辑专业信息';
      const { data } = await api.GetMajorItem({ id: this.id });
      this.formData = data!;
    } else {
      this.dialogTitle = '增加专业';
    }
    if (!val) {
      this.formData = {
        id: 0,
        name: '',
        code: '',
        collegeCode: ''
      }
    }
  }

  async onSubmitAsync() {
    const { data } = this.type ? await api.PutMajor({ id: this.id, model: this.formData }) : await api.PostMajor({ model: this.formData });
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
