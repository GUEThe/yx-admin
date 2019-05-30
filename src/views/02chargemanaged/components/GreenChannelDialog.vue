<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="150px" :disabled="loading">
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="学号">
              <el-input v-model="formData.studentId" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同编号">
              <el-input v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="贷款回执校验码">
              <el-input v-model="formData.replyCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="生源地管理部门名称">
              <el-input v-model="formData.deptName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="联系人">
              <el-input v-model="formData.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系地址">
              <el-input v-model="formData.deptAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="联系电话">
              <el-input v-model="formData.deptPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="申请缓缴金额">
              <el-input v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="补充说明">
              <el-input v-model="formData.description" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="补充文件">
              <el-link v-if="formData.fileId" :href="'/v1/api/File/'+formData.fileId">点击下载</el-link>
              <span v-if="!formData.fileId">暂无文件</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="10">
            <el-form-item label="状态">
              {{ formData.status | stateFilter }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="20">
          <el-form-item label="审核意见">
            <el-input v-model="formData.opinion" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button-group>
          <el-button type="button" icon="el-icon-close" @click="$emit('update:showDialog',false)">取消</el-button>
          <el-button type="primary" @click="onSubmitAsync(2)">审核通过</el-button>
          <el-button type="danger" @click="onSubmitAsync(3)">审核不通过</el-button>
        </el-button-group>
      </div>
    </el-dialog>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

@Component({
  filters: {
    stateFilter(status: number) {
      enum greenchannelstatus {
        保存 = 0,
        已提交待审核,
        通过,
        不通过
      }
      return greenchannelstatus[status]
    }
  }
})
export default class GreenChannelDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() id!: number;

  private dialogTitle: string = '';

  private loading = false;
  private formData: models.GreenChannel = {} as models.GreenChannel;

  mounted() {
    //
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    if (val) {
      this.dialogTitle = '审核绿色通道';
      const { data } = await api.GetGreenChannelItem({ id: this.id });
      this.formData = data!;
    }
  }

  async onSubmitAsync(audit: number) {
    this.formData.status = audit;
    const { data } = await api.PutGreenChannel({ id: this.id, model: this.formData })
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
