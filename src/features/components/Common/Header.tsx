import { AppBar, Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { useAppDispatch } from 'app/hooks'
import { authActions } from 'features/auth/authSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}))

export function Header() {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const handleLogoutClick = () => {
    dispatch(authActions.logout())
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
