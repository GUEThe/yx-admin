<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <el-button class="el-icon-plus" type="primary" @click="showUpload=true"> CET文件上传</el-button>
        <el-dialog width="30%" :visible="showUpload" title="上传四六级成绩" @close="showUpload=false">
          <el-row type="flex" justify="center">
            <el-upload class="upload-demo" :on-success="uploadSuccess" drag action="v1/api/CET/UploadFile"
              :headers="{Authorization: `Bearer ${token}`}" :show-file-list="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-row>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { UserModule } from '@/store/modules/user'
@Component({
  components: {
  }
})
export default class importExcel extends Vue {
  showUpload: boolean = false;

  get token() {
    return UserModule.token;
  }

  uploadSuccess(resp: models.RestfulData) {
    if (resp.code === 0) {
      console.log(resp)
      this.$message({
        type: 'success',
        message: resp.message
      });
      this.showUpload = false
    } else {
      this.$message({
        type: 'error',
        message: resp.message
      });
    }
  }
}
</script>

<style scoped>
</style>
