import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface YearState {
  year: number
}

@Module({ dynamic: true, store, name: 'year' })
class Year extends VuexModule implements YearState {
  public year = 0

  @Mutation
  private CHANGE_YEAR(year: number) {
    this.year = year;
  }

  @Action
  public async ChangeYear(year: number) {
    this.CHANGE_YEAR(year);
  }
}

export const YearModule = getModule(Year);
