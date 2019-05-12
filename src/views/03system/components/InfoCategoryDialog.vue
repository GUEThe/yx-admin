<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="100px" :disabled="loading">
        <el-form-item label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="formData.value"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="formData.enable">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是默认值">
          <el-radio-group v-model="formData.default">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
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
export default class InfoCategoryDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() type!: number;
  @Prop() id!: number;

  private dialogTitle: string = '';

  private loading = false;
  private formData: models.InfoCategory = {
    id: 0,
    name: '',
    value: '',
    type: '',
    enable: 0,
    default: 0
  }

  mounted() {
    //
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    if (this.type) {
      this.dialogTitle = '编辑信息类别信息';
      const { data } = await api.GetInfoCategoryItem({ id: this.id });
      this.formData = data! as any;
    } else {
      this.dialogTitle = '增加信息类别信息';
    }
    if (!val) {
      this.formData = {
        id: 0,
        name: '',
        value: '',
        type: '',
        enable: 0,
        default: 0
      }
    }
  }

  async onSubmitAsync() {
    const { data } = this.type ? await api.PutInfoCategory({ id: this.id, model: this.formData }) : await api.PostInfoCategory({ model: this.formData });
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
