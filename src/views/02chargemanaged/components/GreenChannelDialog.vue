<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="100px" :disabled="loading">
        <el-form-item label="学号">
          <el-input v-model="formData.status" readonly></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="formData.amount"></el-input>
        </el-form-item>
        <el-form-item label="申请缓缴金额">
          <el-input v-model="formData.time"></el-input>
        </el-form-item>
        <el-form-item label="补充说明">
          <el-input v-model="formData.studentId"></el-input>
        </el-form-item>
        <el-form-item label="补充文件">
          <el-input v-model="formData.total"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formData.waiver"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="formData.mark"></el-input>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input v-model="formData.mark"></el-input>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-radio-group v-model="formData.isGreenChannel">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
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
  @Prop() type!: number;
  @Prop() id!: number;

  private dialogTitle: string = '';

  private loading = false;
  private formData: any = {
    // id: 0,
    // status: 0,
    // amount: 0,
    // time: 0,
    // studentId: 0,
    // total: 0,
    // waiver: 0,
    // mark: '',
    // isGreenChannel: false
  }

  mounted() {
    //
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    // if (this.type) {
    //   this.dialogTitle = '编辑缴费信息';
    //   const { data } = await api.GetGreenChannelItem({ id: this.id });
    //   this.formData = data!;
    // } else {
    //   this.dialogTitle = '增加缴费信息';
    // }
    if (!val) {
      // this.formData = {
      //   id: 0,
      //   status: 0,
      //   amount: 0,
      //   time: 0,
      //   studentId: 0,
      //   total: 0,
      //   waiver: 0,
      //   mark: '',
      //   isGreenChannel: false
      // }
    }
  }

  async onSubmitAsync() {
    const { data } = this.type ? await api.PutGreenChannel({ id: this.id, model: this.formData }) : await api.PostGreenChannel({ model: this.formData });
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
