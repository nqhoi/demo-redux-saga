import { Box, makeStyles } from '@material-ui/core'
import Dashboard from 'features/dashboard'
import { Route, Routes } from 'react-router-dom'
import { Header, Sidebar } from '../Common'
import Student from 'features/student'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '0px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    padding: theme.spacing(2, 4),
  },
}))

export function AdminLayout() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      {/* <Box className={classes.sidebar}>
        <Sidebar />
      </Box> */}

      <Box className={classes.main}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="students/*" element={<Student />} />
        </Routes>
      </Box>
    </Box>
  )
}
