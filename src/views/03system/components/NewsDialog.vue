<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showDialog" @close="$emit('update:showDialog',false)">
      <el-form :model="formData" label-width="100px" :disabled="loading">
        <el-form-item label="标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">入学教育</el-radio>
            <el-radio :label="2">报道须知</el-radio>
            <el-radio :label="3">通知公告</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-input v-model="formData.publishTime"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="formData.year"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <Editor :editorContent.sync="formData.content" />
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
import Editor from '@/components/Tinymce/index.vue';

@Component({
  components: {
    Editor
  }
})
export default class NewsDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() type!: number;
  @Prop() id!: number;

  private dialogTitle: string = '';

  private loading = false;
  private formData: models.News = {
    id: 0,
    title: '',
    type: 0,
    content: '',
    publishTime: 0,
    year: 0
  }

  mounted() {
    //
  }

  @Watch('showDialog')
  async onshowDialogChangeAsync(val: boolean, old: boolean) {
    if (this.type) {
      this.dialogTitle = '编辑新闻信息';
      const { data } = await api.GetNewsItem({ id: this.id });
      this.formData = data!;
    } else {
      this.dialogTitle = '增加新闻信息';
    }
    if (!val) {
      this.formData = {
        id: 0,
        title: '',
        type: 0,
        content: '',
        publishTime: 0,
        year: 0
      }
    }
  }

  async onSubmitAsync() {
    const { data } = this.type ? await api.PutNews({ model: this.formData, id: this.id }) : await api.PostNews({ model: this.formData });
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
