import React, { useEffect, useState } from 'react'
import * as Icons from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { delEmployeeAction, getAllmployeesAction, registerAction, updateEmployeeAction } from '../../../redux/actions/userAction';
import CustomModel from '../../../components/materials/CustomModel';
import DeleteModal from '../../../components/materials/DeleteModal';
import { CustomButton } from '../../../components/materials/CustomButton';
import { Avatar, Box, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../../components/materials/CustomTable';
import PaginationUX from '../../../components/materials/PaginationUX';
import Swal from 'sweetalert2';
import { registerEmployeeAction } from '../../../redux/actions/employeeAction';


const EmployeesManagement = () => {


    //getallEmployees
    const [employees, setEmployees] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultAction = await dispatch(getAllmployeesAction()).unwrap(); // <-- important
                console.log("Result action :", resultAction);
                setEmployees(resultAction);
            } catch (error) {
                console.error("Erreur de récupération :", error);
            }
        };
        fetchData();
    }, [dispatch]);


    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10
    const totalPages = Math.ceil((employees?.length || 0) / rowsPerPage);

    const paginatedRows = employees.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    ) || [];

    const handlePageChange = (page) => { setCurrentPage(page); }



    const columns = [
        {
            field: "fullName", label: "FullName", renderCell: (row) => (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar alt={row.firstName} src={`${process.env.REACT_APP_BASE_URL}/uploads/${row.image}`} />
                    <Typography>{row.firstName} {row.lastName}</Typography>
                </Stack>

            )
        },
        { field: "address", label: "address" },
        {
            field: "birthday", label: "Birthday",
            renderCell: (row) => {
                const date = new Date(row.birthday);
                // Format : jj/mm/aaaa
                const formatted = date.toLocaleDateString('fr-FR');
                return <Typography>{formatted}</Typography>;
            }
        },
        { field: "email", label: "email" },
        {
            field: "createdAt", label: "CreatedAt",
            renderCell: (row) => {
                const date = new Date(row.createdAt);
                // Format : jj/mm/aaaa
                const formatted = date.toLocaleDateString('fr-FR');
                return <Typography>{formatted}</Typography>;
            }
        },
        {
            field: "jobs",
            label: "AllPosts",
            renderCell: (row) => (
                <Icons.ListAlt
                    sx={{ cursor: 'pointer', color: '#210f72ff' }}
                    titleAccess="View published posts"
                    onClick={() => handleOpenPosts(row)}
                />
            )
        }


    ];


    const actionsTab = [
        {
            icon: <Icons.DeleteOutline />,
            tooltip: "Delete",
            onClick: (row) => handleDeleteEmployee(row)
        }
    ];


    //modals
    const [openAdd, setOpenAdd] = useState(false)
    const handleClose = () => { setOpenAdd(false) }
    const [openDelete, setOpenDelete] = useState(false)
    const handleCloseDelete = () => { setOpenDelete(false) }
    const [openPostsModal, setOpenPostsModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);



   

   


    const handleOpenPosts = (employee) => {
        setSelectedEmployee(employee);
        setOpenPostsModal(true);
    };

    const handleClosePosts = () => {
        setOpenPostsModal(false);
        setSelectedEmployee(null);
    };



    //del employee 
    const [deleteTarget, setDeleteTarget] = useState(null);
    const handleDeleteEmployee = (row) => {
        setDeleteTarget(row._id); // ID du post à supprimer
        setOpenDelete(true); // ouvrir le modal
    };

    //confim delete
    const confirmDelete = async () => {
        if (!deleteTarget) return;
        try {
            await dispatch(delEmployeeAction(deleteTarget)).unwrap();
            dispatch(getAllmployeesAction()); // refresh
            setOpenDelete(false);
            setDeleteTarget(null);

            //SweetAlert succès
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The employee has been deleted successfully.',
                timer: 2000,
                showConfirmButton: false
            });
            const employeesUpdated = await dispatch(getAllmployeesAction()).unwrap();
            setEmployees(employeesUpdated);

        } catch (error) {
            console.error("Erreur de suppression :", error);

            //  SweetAlert erreur
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the employee.'
            });
        }
    };

    //add 
    const handleAddEmployee = async (e) => {
        e.preventDefault();

      const formData = new FormData();
      formData.append("firstName", e.target.firstName.value);
      formData.append("lastName", e.target.lastName.value);
      formData.append("email", e.target.email.value);
      formData.append("password", e.target.password.value);
      formData.append("address", e.target.address.value);
      formData.append("birthday", e.target.birthday.value);
      formData.append("company", e.target.company.value);
      formData.append("description", e.target.description.value);
      formData.append("civility", e.target.civility.value);
      formData.append("image", e.target.image.files[0]);

      try {
        const result = await dispatch(registerEmployeeAction(formData)).unwrap();
        console.log("✅ Employee added:", result);
        Swal.fire({
          icon: "success",
          title: "Employee Added",
          text: "The new employee has been added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        setOpenAdd(false);
        const employeesUpdated = await dispatch(getAllmployeesAction()).unwrap();
        setEmployees(employeesUpdated);

      } catch (error) {
        console.error("❌ Error adding employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error || "Failed to add employee.",
        });
      }
    };




    return (
        <>
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #f5f2f2ff 0%, #ffffff 100%)',
                    minHeight: '100vh',
                    py: 3,
                    px: { xs: 2, sm: 4, md: 6 },
                }}
            >

                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold" color="#230673" mb={5}><Icons.PeopleAlt /> Employees Management</Typography>
                    <CustomButton title="Add new Employee" color={'#210f72ff'} icon={<Icons.AddCircleOutline />} onClick={() => setOpenAdd(true)} />
                </Stack>

                <CustomTable rows={paginatedRows} columns={columns} actions={actionsTab} />



                <Box>
                    <PaginationUX count={totalPages} onChange={handlePageChange} page={currentPage} color={'#210f72ff'} />
                </Box>

                {/* allPosts Modal */}
                <CustomModel
                    open={openPostsModal}
                    handleClose={handleClosePosts}
                    title={`Posts of ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}
                >
                    {selectedEmployee?.jobs?.length > 0 ? (
                        <Box>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Title</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Created At</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedEmployee.jobs.map((job) => {
                                        const formattedDate = new Date(job.createdAt).toLocaleDateString('fr-FR');
                                        return (
                                            <tr key={job._id} style={{ borderBottom: '1px solid #ddd' }}>
                                                <td style={{ padding: '8px' }}>{job.title}</td>
                                                <td style={{ padding: '8px' }}>{formattedDate}</td>
                                                <td style={{ padding: '8px' }}>{job.description}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Box>
                    ) : (
                        <Typography>No posts found for this employee.</Typography>
                    )}
                </CustomModel>

                {/* Modal de delete */}
                <DeleteModal
                    open={openDelete}
                    handleClose={handleCloseDelete}
                    onConfirm={confirmDelete}
                    title="Do you really want to delete this employee ?"
                />


                {/* Modal d’ajout d’un employé */}
<CustomModel
  title="Add New Employee"
  open={openAdd}
  handleClose={handleClose}
  icon={<Icons.AddCircleOutline />}
>
  <form
    onSubmit={handleAddEmployee}
  >
    <Stack spacing={2}>
      <TextField name="firstName" label="First Name" fullWidth required />
      <TextField name="lastName" label="Last Name" fullWidth required />
      <TextField name="email" label="Email" fullWidth required />
      <TextField name="password" label="Password" type="password" fullWidth required />
      <TextField name="address" label="Address" fullWidth />
      <TextField name="birthday" label="Birthday" type="date" InputLabelProps={{ shrink: true }} fullWidth />
      <TextField name="company" label="Company" fullWidth required />
      <TextField name="description" label="Description" multiline rows={3} fullWidth />
      <TextField name="civility" label="Civility (mr/ms/mrs)" fullWidth />

      <Stack direction="row" spacing={2}>
        <Typography variant="body2">Upload Image:</Typography>
        <input type="file" name="image" accept="image/*" />
      </Stack>

      <CustomButton title="Add Employee" color="#210f72ff" type="submit" />
    </Stack>
  </form>
</CustomModel>




               







            </Box>






        </>
    )
}

export default EmployeesManagement