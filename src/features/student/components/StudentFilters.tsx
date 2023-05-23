import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ListParams } from 'models'
import { ChangeEvent, useRef } from 'react'
import { selectStudentFilter } from '../studentSlice'
import { studentActions } from '../studentSlice'
import { selectCityList } from 'features/city/citySlice'

export default function StudentFilters() {
  const searchRef = useRef<HTMLInputElement>()
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectStudentFilter)
  const cityList = useAppSelector(selectCityList)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFilter: ListParams = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    }
    dispatch(studentActions.setFilterWithDebounce(newFilter))
  }

  const handleFilterCityChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: event.target.value || undefined,
    }

    dispatch(studentActions.setFilter(newFilter))
  }

  const handLeSortByChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    const [_sort, _order] = (event.target.value as string).split('.')
    console.log(_sort, _order)
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    }

    dispatch(studentActions.setFilter(newFilter))
  }

  const handleClearFilter = () => {
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    }
    dispatch(studentActions.setFilter(newFilter))

    if (searchRef.current) {
      searchRef.current.value = ''
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName"> Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              defaultValue={filter.name_like}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="filterByCity">Filter By City</InputLabel>
            <Select
              id="filterByCity"
              label="Filter By City"
              value={filter.city || ''}
              onChange={handleFilterCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="sortBy">Sort By</InputLabel>
            <Select
              id="sortBy"
              label="Sort By"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handLeSortByChange}
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
