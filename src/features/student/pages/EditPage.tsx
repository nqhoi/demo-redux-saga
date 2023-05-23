import { Box, Typography } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { Student } from 'models'
import studentApi from 'api/studentApi'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

export default function EditPage() {
  const navigate = useNavigate()
  const { id: studentId } = useParams()
  const [student, setStudent] = useState<Student>()

  useEffect(() => {
    if (!studentId) return
    ;(async () => {
      try {
        const data: Student = await studentApi.getById(studentId)
        setStudent(data)
      } catch (error) {
        console.log('Failed to fetch student details', error)
      }
    })()
  }, [studentId])

  const handleStudentFormSubmit = async (formValues: Student) => {
    await studentApi.update(formValues)

    toast.success('Save student successfully!')

    navigate('/admin/students')
  }

  const initialValues: Student = {
    name: '',
    age: 0,
    mark: 0,
    gender: 'male',
    city: '',
    ...student,
  }

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">Update student</Typography>

      <Box mt={3}>
        <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
      </Box>
    </Box>
  )
}
