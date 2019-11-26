<template>
  <div id="DataSheet" style="padding:5px">
    <el-container>
      <el-main>
        <el-button type="primary" icon="el-icon-search" @click="showSheet()">筛选</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="clear()">清除数据</el-button>
        <h4>数据图表</h4>
        <el-row type="flex"></el-row>
        <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
          <el-table-column prop="termname" label="学期" sortable width="180" column-key="termname">
          </el-table-column>
          <el-table-column prop="cname" label="课程名称" width="200">
          </el-table-column>
          <el-table-column prop="courseid" label="课程性质" />
          <el-table-column prop="courseno" label="课号">
          </el-table-column>
          <el-table-column prop="score" sortable label="成绩">
          </el-table-column>
          <el-table-column prop="credithour" sortable label="学分">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import grade from '../js/grade'
import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$ajax = axios
export default {
  name: 'DataSheet',
  props: ['datasheetData'],
  data() {
    return {
      DataSheet: '',
      tableData: []
    }
  },
  methods: {
    showSheet() {
      // 显示表格数据
      this.$ajax.get('static\\grade.json').then((res) => {
        // 1、term学期数据被选中，课程性质和成绩选择未选
        if (this.datasheetData[0] != '' && this.datasheetData[1] == '' && this.datasheetData[2] == '') {
          for (var i = 0; i < this.datasheetData[0].length; i++) {
            for (var j = 0; j < res.data.length; j++) {
              if (res.data[j].term == this.datasheetData[0][i]) {
                this.tableData.push(res.data[j]);
              }
            }
          }
        }

        // 2、性质被选中，学期和成绩未选
        else if (this.datasheetData[0] == '' && this.datasheetData[1] != '' && this.datasheetData[2] == '') {
          for (var i = 0; i < this.datasheetData[1].length; i++) {
            // 将性质修改为BJ、BG、BS、BT、XZ
            if (this.datasheetData[1][i] == 'BJ基础必修') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].courseid.includes('BJ')) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[1][i] == 'BG公共必修') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].courseid.includes('BG')) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[1][i] == 'BS实践必修') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].courseid.includes('BS')) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[1][i] == 'BT专业基础必修') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].courseid.includes('BT')) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[1][i] == 'XZ限选') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].courseid.includes('XZ')) {
                  this.tableData.push(res.data[j]);
                }
              }
            }
          }
        }

        // 3、成绩选中，学期和性质未选
        else if (this.datasheetData[0] == '' && this.datasheetData[1] == '' && this.datasheetData[2] != '') {
          for (var i = 0; i < this.datasheetData[2].length; i++) {
            // 将分数可视化
            if (this.datasheetData[2][i] == '90+(优)') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].score >= 90) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[2][i] == '75-90(良)') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].score >= 75 && res.data[j].score < 90) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[2][i] == '60-75(及格)') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].score >= 60 && res.data[j].score < 75) {
                  this.tableData.push(res.data[j]);
                }
              }
            } else if (this.datasheetData[2][i] == '60-(不及格)') {
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].score < 60) {
                  this.tableData.push(res.data[j]);
                }
              }
            }
          }
        }

        // 4、term、课程性质、成绩都选中
        else if (this.datasheetData[0] != '' && this.datasheetData[1] != '' && this.datasheetData[2] != '') {
          for (var i = 0; i < this.datasheetData[0].length; i++) {
            for (var j = 0; j < this.datasheetData[1].length; j++) {
              for (var k = 0; k < this.datasheetData[2].length; k++) {
                for (var m = 0; m < res.data.length; m++) {
                  // BJ+90
                  if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '90+(优)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BJ') && res.data[m].score >= 90) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BJ+75
                  else if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '75-90(良)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BJ') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BJ+60
                  else if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '60-75(及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BJ') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BJ+60-
                  else if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '60-(不及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BJ') && res.data[m].score < 60) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BG+90
                  else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '90+(优)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BG') && res.data[m].score >= 90) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BG+75
                  else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '75-90(良)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BG') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BG+60
                  else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '60-75(及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BG') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BG+60-
                  else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '60-(不及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BG') && res.data[m].score < 60) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BS+90
                  else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '90+(优)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BS') && res.data[m].score >= 90) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BS+75
                  else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '75-90(良)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BS') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BS+60
                  else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '60-75(及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BS') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BS+60-
                  else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '60-(不及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BS') && res.data[m].score < 60) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BT+90
                  else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '90+(优)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BT') && res.data[m].score >= 90) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BT+75
                  else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '75-90(良)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BT') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BT+60
                  else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '60-75(及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BT') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // BT+60-
                  else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '60-(不及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('BT') && res.data[m].score < 60) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // XZ+90
                  else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '90+(优)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('XZ') && res.data[m].score >= 90) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // XZ+75
                  else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '75-90(良)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('XZ') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // XZ+60
                  else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '60-75(及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('XZ') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                  // XZ+60-
                  else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '60-(不及格)') {
                    if (res.data[m].term == this.datasheetData[0][i] && res.data[m].courseid.includes('XZ') && res.data[m].score < 60) {
                      this.tableData.push(res.data[m]);
                    }
                  }
                }
              }
            }
          }
        }

        // 5、term和nature选中，grade没选
        else if (this.datasheetData[0] != '' && this.datasheetData[1] != '' && this.datasheetData[2] == '') {
          for (var i = 0; i < this.datasheetData[0].length; i++) {
            for (var j = 0; j < this.datasheetData[1].length; j++) {
              for (var k = 0; k < res.data.length; k++) {
                if (this.datasheetData[1][j] == 'BJ基础必修') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].courseid.includes('BJ')) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[1][j] == 'BG公共必修') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].courseid.includes('BG')) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[1][j] == 'BS实践必修') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].courseid.includes('BS')) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[1][j] == 'BT专业基础必修') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].courseid.includes('BT')) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[1][j] == 'XZ限选') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].courseid.includes('XZ')) {
                    this.tableData.push(res.data[k]);
                  }
                }
              }
            }
          }
        }

        // 6、term和grade选中，nature没选
        else if (this.datasheetData[0] != '' && this.datasheetData[1] == '' && this.datasheetData[2] != '') {
          for (var i = 0; i < this.datasheetData[0].length; i++) {
            for (var j = 0; j < this.datasheetData[2].length; j++) {
              for (var k = 0; k < res.data.length; k++) {
                if (this.datasheetData[2][j] == '90+(优)') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].score >= 90) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[2][j] == '75-90(良)') {
                  if (res.data[k].term == this.datasheetData[0][i] && (res.data[k].score >= 75 && res.data[k].score < 90)) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[1][j] == '60-75(及格)') {
                  if (res.data[k].term == this.datasheetData[0][i] && (res.data[k].score >= 60 && res.data[k].score < 75)) {
                    this.tableData.push(res.data[k]);
                  }
                } else if (this.datasheetData[1][j] == '60-(不及格)') {
                  if (res.data[k].term == this.datasheetData[0][i] && res.data[k].score < 60) {
                    this.tableData.push(res.data[k]);
                  }
                }
              }
            }
          }
        }

        // 7、nature和grade选中，term没选
        else if (this.datasheetData[0] == '' && this.datasheetData[1] != '' && this.datasheetData[2] != '') {
          for (var j = 0; j < this.datasheetData[1].length; j++) {
            for (var k = 0; k < this.datasheetData[2].length; k++) {
              for (var m = 0; m < res.data.length; m++) {
                // BJ+90
                if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '90+(优)') {
                  if (res.data[m].courseid.includes('BJ') && res.data[m].score >= 90) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BJ+75
                else if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '75-90(良)') {
                  if (res.data[m].courseid.includes('BJ') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BJ+60
                else if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '60-75(及格)') {
                  if (res.data[m].courseid.includes('BJ') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BJ+60-
                else if (this.datasheetData[1][j] == 'BJ基础必修' && this.datasheetData[2][k] == '60-(不及格)') {
                  if (res.data[m].courseid.includes('BJ') && res.data[m].score < 60) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BG+90
                else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '90+(优)') {
                  if (res.data[m].courseid.includes('BG') && res.data[m].score >= 90) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BG+75
                else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '75-90(良)') {
                  if (res.data[m].courseid.includes('BG') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BG+60
                else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '60-75(及格)') {
                  if (res.data[m].courseid.includes('BG') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BG+60-
                else if (this.datasheetData[1][j] == 'BG公共必修' && this.datasheetData[2][k] == '60-(不及格)') {
                  if (res.data[m].courseid.includes('BG') && res.data[m].score < 60) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BS+90
                else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '90+(优)') {
                  if (res.data[m].courseid.includes('BS') && res.data[m].score >= 90) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BS+75
                else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '75-90(良)') {
                  if (res.data[m].courseid.includes('BS') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BS+60
                else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '60-75(及格)') {
                  if (res.data[m].courseid.includes('BS') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BS+60-
                else if (this.datasheetData[1][j] == 'BS实践必修' && this.datasheetData[2][k] == '60-(不及格)') {
                  if (res.data[m].courseid.includes('BS') && res.data[m].score < 60) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BT+90
                else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '90+(优)') {
                  if (res.data[m].courseid.includes('BT') && res.data[m].score >= 90) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BT+75
                else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '75-90(良)') {
                  if (res.data[m].courseid.includes('BT') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BT+60
                else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '60-75(及格)') {
                  if (res.data[m].courseid.includes('BT') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // BT+60-
                else if (this.datasheetData[1][j] == 'BT专业基础必修' && this.datasheetData[2][k] == '60-(不及格)') {
                  if (res.data[m].courseid.includes('BT') && res.data[m].score < 60) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // XZ+90
                else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '90+(优)') {
                  if (res.data[m].courseid.includes('XZ') && res.data[m].score >= 90) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // XZ+75
                else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '75-90(良)') {
                  if (res.data[m].courseid.includes('XZ') && (res.data[m].score >= 75 && res.data[m].score < 90)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // XZ+60
                else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '60-75(及格)') {
                  if (res.data[m].courseid.includes('XZ') && (res.data[m].score >= 60 && res.data[m].score < 75)) {
                    this.tableData.push(res.data[m]);
                  }
                }
                // XZ+60-
                else if (this.datasheetData[1][j] == 'XZ限选' && this.datasheetData[2][k] == '60-(不及格)') {
                  if (res.data[m].courseid.includes('XZ') && res.data[m].score < 60) {
                    this.tableData.push(res.data[m]);
                  }
                }
              }
            }
          }
        }
      })
    },
    // 清除表格数据
    clear() {
      this.tableData = [];
    }
  }
}
</script>

<style scoped>
</style>
