import { Box, Typography } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { Student } from 'models'
import { Link, useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import studentApi from 'api/studentApi'
import { toast } from 'react-toastify'

const initialValues: Student = {
  name: '',
  age: 18,
  mark: 0,
  gender: 'male',
  city: '',
}
export default function AddPage() {
  const navigate = useNavigate()

  const handleStudentFormSubmit = async (formValues: Student) => {
    await studentApi.add(formValues)

    toast.success('Save student successfully!')

    navigate('/admin/students')
  }

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">Add new student</Typography>

      <Box mt={3}>
        <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
      </Box>
    </Box>
  )
}
