import {
  VuexModule,
  Module,
  MutationAction,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { Sigin, Logout, GetUserInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import store from '@/store'
import { SigninForm, TokenObj } from '@/api/models'

export interface IUserState {
  token: string
  name: string
  avatar: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public async Login(signinForm: SigninForm) {
    signinForm.username = signinForm.username.trim()
    const { data } = await Sigin({ signinForm })
    setToken((data as TokenObj).token)
    this.SET_TOKEN((data as TokenObj).token)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await GetUserInfo()
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name } = data
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await Logout()
    removeToken()
    resetRouter()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
  get getToken() {
    // console.log(
    //   'gettoken:',
    //   this.token,
    //   'SessionModule.getActiveSession:',
    //   SessionModule.getActiveSession
    // );
    // if (!this.token && SessionModule.getActiveSession) {
    //   UserModule.SET_TOKEN(SessionModule.getActiveSession!.token);
    // }
    // if (!this.token || this.token.length === 0) {
    //   return null;
    // }
    return this.token
  }
}

export const UserModule = getModule(User)
