import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core'
import studentApi from 'api/studentApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { City, Student } from 'models'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { capitalizeString, getMarkColor } from 'utils/common'
import { selectStudentFilter, selectStudentList, studentActions } from '../studentSlice'

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}))

export interface StudentTableProps {
  cityMap: { [key: string]: City }
}

export default function StudentTable({ cityMap }: StudentTableProps) {
  const navigate = useNavigate()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student>()
  const studentFilter = useAppSelector(selectStudentFilter)
  const studentList = useAppSelector(selectStudentList)

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student)
    setOpen(true)
  }

  const handleRemoveConfirm = async (student: Student) => {
    try {
      if (student) {
        await studentApi.remove(student?.id || '')
        const newFilter = { ...studentFilter }
        dispatch(studentActions.setFilter(newFilter))
        toast.success('Remove student successfully!')
        setOpen(false)
      }
    } catch (error) {
      toast.error('Remove student failed!')
      console.log('Failed to fetch student', error)
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => navigate(`/admin/students/${student.id}`)}
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(student)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
