import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Avatar, Typography, Grid, Divider, Button, TextField, Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../../../redux/actions/userAction';
import CustomModel from '../../../components/materials/CustomModel';
import { CustomButton } from '../../../components/materials/CustomButton';

const AdminProfile = () => {
  const { currentUser } = useSelector(state => state.user); // 🔹 admin user slice
  const user = currentUser?.user || {};
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthday: '',
    civility: '',
    password: '',
    image: null,
  });

  // 🔹 Synchroniser formData avec currentUser
  useEffect(() => {
    if (!user._id) return;
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      address: user.address || '',
      birthday: user.birthday ? user.birthday.slice(0, 10) : '',
      civility: user.civility || '',
      password: '',
      image: null,
    });
  }, [user]);

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const updatedData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        updatedData.append(key, formData[key]);
      }
    });
    updatedData.append("id", user._id); // 🔹 ID de l'utilisateur à modifier

    const resultAction = await dispatch(updateUserAction({ id: user._id, formData: updatedData })).unwrap();
    console.log("Updated admin profile:", resultAction);
    setOpenEdit(false);
  } catch (error) {
    console.error("Error updating admin profile:", error);
  }
};

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f2f2ff 0%, #ffffff 100%)', minHeight: '100vh', py: 6, px: { xs: 2, sm: 4, md: 6 } }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" color="#230673" mb={5}>
        Admin Profile
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Main Card */}
        <Grid item xs={12} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', p: 4, height: '100%', width: '300px', minHeight: '350px' }}>
            <Avatar src={`${process.env.REACT_APP_BASE_URL}/uploads/${user.image}` || '/assets/img/default-profile.png'} sx={{ width: 130, height: 130, mb: 2, border: '3px solid #230673' }} />
            <Typography variant="h6" fontWeight="bold" color="#230673">{user.firstName} {user.lastName}</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Administrator</Typography>
            <Divider sx={{ my: 2, width: '80%' }} />
            <Button variant="contained" startIcon={<EditIcon />} sx={{ backgroundColor: '#230673', '&:hover': { backgroundColor: '#18034f' }, textTransform: 'none', borderRadius: 2 }} onClick={() => setOpenEdit(true)}>
              Edit Profile
            </Button>
          </Card>
        </Grid>

        {/* Personal Info Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', p: 2, height: '100%', minHeight: '350px' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <InfoOutlinedIcon sx={{ color: '#230673', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold" color="#230673">Personal Information</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box mb={2} display="flex" alignItems="center"><EmailIcon sx={{ color: '#230673', mr: 1 }} /><Typography variant="body1">{user.email || '—'}</Typography></Box>
              <Box mb={2} display="flex" alignItems="center"><CakeIcon sx={{ color: '#230673', mr: 1 }} /><Typography variant="body1">{user.birthday ? new Date(user.birthday).toLocaleDateString() : '—'}</Typography></Box>
              <Box mb={2} display="flex" alignItems="center"><HomeIcon sx={{ color: '#230673', mr: 1 }} /><Typography variant="body1">{user.address || '—'}</Typography></Box>
              <Box mb={2} display="flex" alignItems="center"><DescriptionIcon sx={{ color: '#230673', mr: 1 }} /><Typography variant="body1">{user.cv ? 'View CV' : 'No CV'}</Typography></Box>
              <Box mb={2}><Typography variant="body2" color="text.secondary">Civility:</Typography><Typography variant="body1">{user.civility || '—'}</Typography></Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Professional Info Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.08)', backgroundColor: '#ffffff', p: 2, height: '100%', minHeight: '350px' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}><WorkOutlineIcon sx={{ color: '#dd2571', mr: 1 }} /><Typography variant="h6" fontWeight="bold" color="#dd2571">Professional Information</Typography></Box>
              <Divider sx={{ mb: 3 }} />
              <Box mb={2}><Typography variant="body2" color="text.secondary">Role:</Typography><Typography variant="body1" fontWeight="bold">{user.role || '—'}</Typography></Box>
              <Box mb={2}><Typography variant="body2" color="text.secondary">Created At:</Typography><Typography variant="body1">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</Typography></Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Update Modal */}
      <CustomModel title="Edit Profile" open={openEdit} handleClose={() => setOpenEdit(false)} icon={<EditIcon />}>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <Stack spacing={2}>
            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} fullWidth />
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} fullWidth />
            <TextField label="Address" name="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} fullWidth />
            <TextField label="Birthday" name="birthday" type="date" value={formData.birthday} onChange={e => setFormData({ ...formData, birthday: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField select label="Civility" name="civility" value={formData.civility} onChange={e => setFormData({ ...formData, civility: e.target.value })} SelectProps={{ native: true }} fullWidth>
              <option value="">Select</option>
              <option value="mr">Mr.</option>
              <option value="ms">Ms.</option>
              <option value="mrs">Mrs.</option>
            </TextField>
            <TextField label="Password" name="password" type="password" placeholder="Enter new password if you want to change" onChange={e => setFormData({ ...formData, password: e.target.value })} fullWidth />
            <input type="file" name="image" accept="image/*" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
            <CustomButton title="Update" color="#210f72ff" type="submit" />
          </Stack>
        </form>
      </CustomModel>
    </Box>
  );
};

export default AdminProfile;
