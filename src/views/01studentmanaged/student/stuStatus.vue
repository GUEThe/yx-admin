<template>
  <el-dialog width="330px" title="更新学籍状态" :visible="showDialog" destroy-on-close
    @close="$emit('update:showDialog',false)">
    <el-form :model="stuInfo" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="stuInfo.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="stuInfo.studentId" readonly></el-input>
      </el-form-item>

      <!-- 是否在校字段 -->
      <el-form-item label="是否在校">
        <el-select v-model="stuInfo.changetype" placeholder="选择是否在校">
          <el-option label="在校" value="在校"></el-option>
          <el-option label="离校" value="离校"></el-option>
        </el-select>
      </el-form-item>
      <!-- 学籍状态 -->
      <el-form-item label="学籍状态">
        <el-select v-model="stuInfo.stustatus" placeholder="选择学籍状态">
          <el-option label="正常" value="正常"></el-option>
          <el-option label="留级" value="留级"></el-option>
          <el-option label="续读" value="续读"></el-option>
          <el-option label="退学" value="退学"></el-option>
        </el-select>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button type="button" @click="$emit('update:showDialog',false)">
          取消
        </el-button>
        <el-button :loading="saving" type="primary" @click="handleSave()">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

@Component({
  components: {
  }
})
export default class StuStatus extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() stuInfo: models.StuInfo | Object = {};
  saving: boolean = false;

  @Watch('showDialog')
  async showDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.init()
    }
  }

  init() {
  }

  async handleSave() {
    this.saving = true
    const resp = await api.PutStudent({ value: this.stuInfo as models.StuInfo })
    if (resp.code === 0) {
      this.$message.success('修改成功');
    }
    this.saving = false
  }
}
</script>

<style scoped>
</style>
