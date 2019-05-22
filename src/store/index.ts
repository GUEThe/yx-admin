import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { ITagsViewState } from './modules/tagsView'
import { IErrorLogState } from './modules/errorLog'
import { IPermissionState } from './modules/permission'
import { ISettingsState } from './modules/settings'
import { YearState } from './modules/year'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IUserState
  tagsView: ITagsViewState
  errorLog: IErrorLogState
  permission: IPermissionState
  settings: ISettingsState
  year: YearState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
