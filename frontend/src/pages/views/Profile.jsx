import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user || {};
  console.log("user :",user)
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f5f2f2ff 0%, #ffffff 100%)',
        minHeight: '100vh',
        py: 6,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center" color="#230673" mb={5}>
        My Profile
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Main Card */}
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              backgroundColor: '#ffffff',
              p: 4,
              height: '100%',
              width: '300px',
              minHeight: '350px',
              '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' },
            }}
          >
            <Avatar
              src={user.image || '/assets/img/default-profile.png'}
              sx={{
                width: 130,
                height: 130,
                mb: 2,
                border: '3px solid #230673',
              }}
            />
            <Typography variant="h6" fontWeight="bold" color="#230673">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {user.role === 'admin' ? 'Administrator' : user.role === 'employee' ? 'Employee' : 'User'}
            </Typography>
            <Divider sx={{ my: 2, width: '80%' }} />
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                backgroundColor: '#230673',
                '&:hover': { backgroundColor: '#18034f' },
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Edit Profile
            </Button>
          </Card>
        </Grid>

        {/* Personal Info Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              backgroundColor: '#ffffff',
              p: 2,
              height: '100%',
              minHeight: '350px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <InfoOutlinedIcon sx={{ color: '#230673', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold" color="#230673">
                  Personal Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box mb={2} display="flex" alignItems="center">
                <EmailIcon sx={{ color: '#230673', mr: 1 }} />
                <Typography variant="body1">{user.email || '—'}</Typography>
              </Box>

              <Box mb={2} display="flex" alignItems="center">
                <CakeIcon sx={{ color: '#230673', mr: 1 }} />
                <Typography variant="body1">
                  {user.birthday
                    ? new Date(user.birthday).toLocaleDateString()
                    : '—'}
                </Typography>
              </Box>

              <Box mb={2} display="flex" alignItems="center">
                <HomeIcon sx={{ color: '#230673', mr: 1 }} />
                <Typography variant="body1">{user.address || '—'}</Typography>
              </Box>

              <Box mb={2} display="flex" alignItems="center">
                <DescriptionIcon sx={{ color: '#230673', mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: user.cv ? 'underline' : 'none',
                    cursor: user.cv ? 'pointer' : 'default',
                    color: user.cv ? '#dd2571' : 'inherit',
                  }}
                  onClick={() => user.cv && window.open(user.cv, '_blank')}
                >
                  {user.cv ? 'View CV' : 'No CV'}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Civility:
                </Typography>
                <Typography variant="body1">
                  {user.civility === 'mr'
                    ? 'Mr.'
                    : user.civility === 'ms'
                    ? 'Miss.'
                    : user.civility === 'mrs'
                    ? 'Mrs.'
                    : '—'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Professional Info Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              backgroundColor: '#ffffff',
              p: 2,
              height: '100%',
              minHeight: '350px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <WorkOutlineIcon sx={{ color: '#dd2571', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold" color="#dd2571">
                  Professional Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box mb={2} display="flex" alignItems="center">
                <BusinessIcon sx={{ color: '#dd2571', mr: 1 }} />
                <Typography variant="body1">
                  {user.company || 'Not provided'}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  Description:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor: '#fff',
                    p: 1.5,
                    borderRadius: 1,
                    border: '1px solid #e0d9ff',
                  }}
                >
                  {user.description || '—'}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Role:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#230673">
                  {user.role || '—'}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Created At:
                </Typography>
                <Typography variant="body1">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : '—'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
