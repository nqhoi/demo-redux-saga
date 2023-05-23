import { Box, Button, LinearProgress, Typography, makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useAppSelector } from 'app/hooks'
import { selectCityMap } from 'features/city/citySlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import StudentFilters from '../components/StudentFilters'
import StudentTable from '../components/StudentTable'
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}))

export default function ListPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const loading = useAppSelector(selectStudentLoading)
  const pagination = useAppSelector(selectStudentPagination)
  const studentFilter = useAppSelector(selectStudentFilter)
  const cityMap = useAppSelector(selectCityMap)

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(studentFilter))
  }, [dispatch, studentFilter])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...studentFilter,
        _page: page,
      })
    )
  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <StudentFilters />

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>

        <Link to="add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <StudentTable cityMap={cityMap} />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}
