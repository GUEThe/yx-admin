<template>
  <div id="Screening">
    <el-container>
      <el-main>
        <p>学期筛选</p>
        <el-checkbox-group v-model="termList" @change="getList()">
          <el-checkbox label="2015-2016_1"></el-checkbox>
          <el-checkbox label="2015-2016_2"></el-checkbox>
          <el-checkbox label="2016-2017_1"></el-checkbox>
          <el-checkbox label="2016-2017_2"></el-checkbox>
          <el-checkbox label="2017-2018_1"></el-checkbox>
          <el-checkbox label="2017-2018_2"></el-checkbox>
          <el-checkbox label="2018-2019_1"></el-checkbox>
          <el-checkbox label="2018-2019_2"></el-checkbox>
        </el-checkbox-group>

        <p>课程性质筛选</p>
        <el-checkbox-group v-model="natureList" @change="getList()">
          <el-checkbox label="BJ基础必修"></el-checkbox>
          <el-checkbox label="BG公共必修"></el-checkbox>
          <el-checkbox label="BS实践必修"></el-checkbox>
          <el-checkbox label="BT专业基础必修"></el-checkbox>
          <el-checkbox label="XZ限选"></el-checkbox>
        </el-checkbox-group>

        <p>成绩筛选</p>
        <el-checkbox-group v-model="gradeList" @change="getList()">
          <el-checkbox label="90+(优)"></el-checkbox>
          <el-checkbox label="75-90(良)"></el-checkbox>
          <el-checkbox label="60-75(及格)"></el-checkbox>
          <el-checkbox label="60-(不及格)"></el-checkbox>
        </el-checkbox-group>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Screening',
  data() {
    return {
      termList: [],
      natureList: [],
      gradeList: []
    }
  },
  methods: {
    getList() {
      console.log([this.termList, this.natureList, this.gradeList]);
      this.$emit('funScreen', [this.termList, this.natureList, this.gradeList]);
    }
  }
}
</script>
