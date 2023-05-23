import { call, put, takeLatest } from 'redux-saga/effects'
import { cityActions } from './citySlice'
import cityApi from 'api/cityApi'
import { City, ListResponse } from 'models'

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll)
    yield put(cityActions.fetchCityListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch city list', error)
    yield put(cityActions.fetchCityListFailed())
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList, fetchCityList)
}
