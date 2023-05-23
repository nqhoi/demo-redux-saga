import { useAppDispatch, useAppSelector } from 'app/hooks'
import { cityActions } from 'features/city/citySlice'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { selectStudentList } from './studentSlice'
import ListPage from './pages/ListPage'
import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'

export default function Student() {
  const dispatch = useAppDispatch()
  const studentList = useAppSelector(selectStudentList)

  useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<ListPage />} />

      <Route path="add" element={<AddPage />} />

      <Route path=":id" element={<EditPage />} />
    </Routes>
  )
}
