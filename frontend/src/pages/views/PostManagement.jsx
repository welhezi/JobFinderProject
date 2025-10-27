import { Box, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import { CustomButton } from '../../components/materials/CustomButton';
import * as Icons from '@mui/icons-material';
import { CustomTable } from '../../components/materials/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewJobPostAction, delJobPostAction, getAllJobPostsAction, getJobPostDetailsAction, updateJobPostAction } from '../../redux/actions/jobPostAction';
import PaginationUX from '../../components/materials/PaginationUX';
import CustomModel from '../../components/materials/CustomModel';
import DeleteModal from '../../components/materials/DeleteModal';
import Swal from 'sweetalert2';
import { getApplicationsByPostIdAction } from '../../redux/actions/applicationAction';
import { Link } from 'react-router-dom';



const PostManagement = () => {

    const { currentUser } = useSelector((state) => state.user);
    const id = currentUser?.user._id 
    console.log("id user",id)

    const [openAdd,setOpenAdd] = useState(false)
    const handleClose = () => { setOpenAdd(false)}

    const [openView,setOpenView] = useState(false)
    const handleCloseView = () => { setOpenView(false)}
    const [selectedPost, setSelectedPost] = useState(null);

    const [openDelete,setOpenDelete] = useState(false)
    const handleCloseDelete = () => { setOpenDelete(false)}
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [openEdit, setOpenEdit] = useState(false);
    const [editFormData, setEditFormData] = useState({
      title: '',
      description: '',
      mission: '',
      requirements: '',
      location: '',
      endDate: '',
      id_employee: id
    });

    const [showApplicationsTable, setShowApplicationsTable] = useState(false);
    const [selectedJobApplications, setSelectedJobApplications] = useState([]);




    const dispatch = useDispatch()
    useEffect(() => {
    const fetchData = async () => {
      try {
        const resultAction = await dispatch(getAllJobPostsAction()).unwrap(); // <-- important
        console.log("Result action :", resultAction);
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    };
    fetchData();
  }, [dispatch]);


    
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    mission: '',
    requirements: '',
    location: '',
    endDate: '',
    id_employee:id
  });

  // 🔹 2. Gestion des changements dans les champs
  // ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // 🔹 3. Soumission du formulaire
  // ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data",formData)
    if (!id) {
      console.error("L'utilisateur n'est pas encore chargé");
      return;
    }

    try {
      const result = await dispatch(AddNewJobPostAction(formData)).unwrap();
      console.log("Nouveau job post créé :", result);
      setOpenAdd(false);
      dispatch(getAllJobPostsAction()); // 🔄 Refresh liste après ajout
      setFormData({
        title: '',
        description: '',
        mission: '',
        requirements: '',
        location: '',
        endDate: '',
        id_employee:id
      });
    } catch (error) {
      console.error("Erreur d’ajout :", error);
    }
  };



  //get jobpost details 
  const handleJobPostDetails = async (row) => {
    setOpenView(true);
    try {
      const result = await dispatch(getJobPostDetailsAction(row._id)).unwrap();
      setSelectedPost(result); // stocke les détails du post
    } catch (error) {
      console.error("Erreur d'apparition :", error);
    }
  };



  //del jobpost 
    const handleJobPostDelete = (row) => {
      setDeleteTarget(row._id); // ID du post à supprimer
      setOpenDelete(true); // ouvrir le modal
  };


  //confim delete
  const confirmDelete = async () => {
  if (!deleteTarget) return;
  try {
    await dispatch(delJobPostAction(deleteTarget)).unwrap();
    dispatch(getAllJobPostsAction()); // refresh
    setOpenDelete(false);
    setDeleteTarget(null);

    //SweetAlert succès
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The job post has been deleted successfully.',
      timer: 2000,
      showConfirmButton: false
    });

  } catch (error) {
    console.error("Erreur de suppression :", error);
    
    //  SweetAlert erreur
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete the job post.'
    });
  }
};


  // update 
  const handleJobPostEdit = (row) => {
  setEditFormData({
    title: row.title,
    description: row.description,
    mission: row.mission,
    requirements: row.requirements,
    location: row.location,
    endDate: row.endDate ? new Date(row.endDate).toISOString().split('T')[0] : '',
    id_employee: row.id_employee?._id || id
  });
  setSelectedPost(row); // optionnel, pour montrer le titre dans le modal
  setOpenEdit(true);
};



const handleEditSubmit = async (e) => {
  e.preventDefault();
  if (!selectedPost) return;

  try {
    await dispatch(updateJobPostAction({ id: selectedPost._id, data: editFormData })).unwrap();
    dispatch(getAllJobPostsAction()); // refresh
    setOpenEdit(false);
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'The job post has been updated successfully.',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (error) {
    console.error("Erreur update :", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update the job post.'
    });
  }
};



  const handlePageChange = (page) => {
  setCurrentPage(page);
  }



  //getAppsOfJobPost
  const handleApplicationsClick = async (jobPost) => {
    try {

      // Ici, tu peux appeler un endpoint pour récupérer les applications
      const applications = await dispatch(getApplicationsByPostIdAction(jobPost._id)).unwrap();
      console.log("apps of post :",applications)
      setSelectedJobApplications(applications);
      setShowApplicationsTable(true);
    } catch (error) {
      console.error("Erreur récupération applications:", error);
    }
  };

  


  const columns = [
  { field: "title", label: "Title" },
  { field: "description", label: "description" },
  { field: "mission", label: "mission" },
  { field: "requirements", label: "requirements" },
  { field: "endDate", label: "endDate" },
  { field: "location", label: "location" },
  { field: "createdAt", label: "createdAt" },
  { field: "applications", 
    label: "Applications",
    renderCell: (row) => (
      <Link to={`/layout/appsOfPost/${row._id}`}>
      <Typography 
        sx={{ cursor: 'pointer', color: '#210f72ff', textDecoration: 'underline' }}
      >
        View Applications
      </Typography>
      </Link>
    ) }
];

/*const rows = [
  { name: "Frozen yoghurt", calories: 159 },
  { name: "Ice cream sandwich", calories: 237 },
];

const actions = (row) => (
  <>
    <button onClick={() => alert(row.name)}>Voir</button>
    <button>Supprimer</button>
  </>
);*/

const actionsTab = [
  {
    icon: <Icons.Visibility />,
    tooltip: "View",
    onClick: (row) => handleJobPostDetails(row)
  },
  {
    icon: <Icons.DeleteOutline />,
    tooltip: "Delete",
    onClick: (row) => handleJobPostDelete(row)
  },
  {
    icon: <Icons.Edit />,
    tooltip: "Update",
    onClick: (row) => handleJobPostEdit(row)
  }
];

const [currentPage,setCurrentPage] = useState(1)
const rowsPerPage = 10

const allPosts = useSelector(state => state?.jobPosts?.jobPost || [])
console.log("allPosts value:", allPosts)

const totalPages = Math.ceil((allPosts?.length || 0) / rowsPerPage);

const paginatedRows = allPosts.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
) || [];




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
    
    <Stack sx={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography variant="h6" fontWeight="bold" color="#230673" mb={5}><WorkIcon /> Job Posts Management</Typography>
      <CustomButton  title="Add new Post" color={'#210f72ff'} icon={<Icons.AddCircleOutline/>} onClick={() => setOpenAdd(true)}/>
    </Stack>
    
    <CustomTable rows={paginatedRows} columns={columns} actions={actionsTab} />
      
    <Box>
      <PaginationUX count={totalPages} onChange={handlePageChange} page={currentPage} color={'#210f72ff'} />
    </Box>

     {/* ✅ Modal d’ajout */}
      <CustomModel
        title="Add Job Post"
        open={openAdd}
        handleClose={handleClose}
        icon={<Icons.AddCircleOutline />}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
            />
            <CustomButton title="Save" color={'#210f72ff'} type="submit" />
          </Stack>
        </form>
      </CustomModel>
      

      {/* ✅ Modal d’affichage */}
      <CustomModel
        title="Job Post Details"
        open={openView}
        handleClose={handleCloseView}
        icon={<Icons.Visibility />}
      >
        {selectedPost ? (
          <Stack spacing={2}>
            <Typography><strong>Title:</strong> {selectedPost.title}</Typography>
            <Typography><strong>Description:</strong> {selectedPost.description}</Typography>
            <Typography><strong>Mission:</strong> {selectedPost.mission}</Typography>
            <Typography><strong>Requirements:</strong> {selectedPost.requirements}</Typography>
            <Typography><strong>Location:</strong> {selectedPost.location}</Typography>
            <Typography><strong>End Date:</strong> {new Date(selectedPost.endDate).toLocaleDateString()}</Typography>
          </Stack>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </CustomModel>


      {/* ✅ update Modal */}
      <CustomModel
        title="Edit Job Post"
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        icon={<Icons.Edit />}
      >
        <form onSubmit={handleEditSubmit}>
          <Stack spacing={2}>
            <TextField label="Title" name="title" value={editFormData.title} 
              onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} fullWidth />
            <TextField label="Description" name="description" value={editFormData.description} 
              onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} fullWidth />
            <TextField label="Mission" name="mission" value={editFormData.mission} 
              onChange={(e) => setEditFormData({...editFormData, mission: e.target.value})} fullWidth />
            <TextField label="Requirements" name="requirements" value={editFormData.requirements} 
              onChange={(e) => setEditFormData({...editFormData, requirements: e.target.value})} fullWidth />
            <TextField label="Location" name="location" value={editFormData.location} 
              onChange={(e) => setEditFormData({...editFormData, location: e.target.value})} fullWidth />
            <TextField label="End Date" name="endDate" type="date" value={editFormData.endDate} 
              onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})} fullWidth InputLabelProps={{ shrink: true }} />
            <CustomButton title="Update" color="#210f72ff" type="submit" />
          </Stack>
        </form>
      </CustomModel>


      {/* ✅ Modal de delete */}
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        onConfirm={confirmDelete}
        title="Do you really want to delete this job post?"
      />



     



    </Box>

    
    
    
    
    
    </>
    
  )
}

export default PostManagement