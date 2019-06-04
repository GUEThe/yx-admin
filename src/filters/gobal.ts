import Vue from 'vue'

import moment from 'moment'

import { College, Major, Campus } from '@/api/models'

Vue.filter('collegeFilter', (code: string) => {
  let collegeList: College[] = JSON.parse(localStorage.getItem(
    'college'
  ) as string)
  if (!collegeList) {
    return code
  }
  let name = ''
  collegeList.forEach(element => {
    if (element.code === code) {
      name = element.name
    }
  })
  return name
})

Vue.filter('majorFilter', (code: string) => {
  let majorList: Major[] = JSON.parse(localStorage.getItem('major') as string)
  if (!majorList) {
    return code
  }
  let name = ''
  majorList.forEach(element => {
    if (element.code === code) {
      name = element.name
    }
  })
  return name
})

Vue.filter('campusFilter', (code: string) => {
  let campusList: Campus[] = JSON.parse(localStorage.getItem(
    'campus'
  ) as string)
  let collegeList: College[] = JSON.parse(localStorage.getItem(
    'college'
  ) as string)
  if (!campusList) {
    return code
  }
  let id = 0
  collegeList.forEach(item => {
    if (item.code === code) {
      id = item.campus
    }
  })
  let name = ''
  campusList.forEach(element => {
    if (element.id === id) {
      name = element.name
    }
  })
  return name
})

Vue.filter('genderFilter', (gender: number) => {
  switch (gender) {
    case 0:
      return '女'
    case 1:
      return '男'
    default:
      return '未知'
  }
})

Vue.filter('mCampusFilter', (code: number) => {
  let campusList: Campus[] = JSON.parse(localStorage.getItem(
    'campus'
  ) as string)
  if (!campusList) {
    return code
  }
  let name = ''
  campusList.forEach(element => {
    if (element.id === code) {
      name = element.name
    }
  })
  return name
})
