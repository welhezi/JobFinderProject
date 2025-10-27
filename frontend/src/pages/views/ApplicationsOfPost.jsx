import { Box, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import { CustomButton } from '../../components/materials/CustomButton';
import * as Icons from '@mui/icons-material';
import { CustomTable } from '../../components/materials/CustomTable';
import PaginationUX from '../../components/materials/PaginationUX';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDetailsByIdAction, getApplicationsByPostIdAction } from '../../redux/actions/applicationAction';
import { useParams } from 'react-router-dom';
import CustomModel from '../../components/materials/CustomModel';

const ApplicationsOfPost = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const applications = await dispatch(getApplicationsByPostIdAction(id)).unwrap();
                console.log("apps of post :", applications)
            } catch (error) {
                console.error("Erreur récupération applications:", error);
            }
        };
        fetchData();
    }, [dispatch]);



    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10

    const apps = useSelector(state => state?.applications?.apps || [])
    console.log("allApps of post :", apps)

    const totalPages = Math.ceil((apps?.length || 0) / rowsPerPage);

    const paginatedRows = apps.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    ) || [];

    const columns = [
        { field: "cv", label: "CV" },
        { field: "cover_letter", label: "Cover letter" },
        {
            field: "user",
            label: "User Name",
            renderCell: (row) => (row.id_user.firstName + " " + row.id_user.lastName)
        },
        { field: "createdAt", label: "CreatedAt" }
    ];

    const actionsTab = [
        {
            icon: <Icons.Visibility />,
            tooltip: "More Details",
            onClick: (row) => handleAppDetailsClick(row)
        }
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const [openView, setOpenView] = useState(false)
    const handleCloseView = () => { setOpenView(false) }
    const [selectedApp, setSelectedApp] = useState(null);

    // functions
    const handleAppDetailsClick = async (row) => {
        setOpenView(true);
        try {
            const result = await dispatch(getAppDetailsByIdAction(row._id)).unwrap();
            setSelectedApp(result);
        } catch (error) {
            console.error("Erreur d'apparition :", error);
        }
    };


    const handleApplicationDecision = async (appId, decision) => {
        try {
            // 🔹 Appel API pour accepter ou refuser la candidature
            // Exemple avec une action Redux : 
            // await dispatch(updateApplicationStatusAction({ id: appId, status: decision })).unwrap();

            console.log(`Application ${appId} marked as ${decision}`);
            alert(`Candidature ${decision === "accepted" ? "acceptée" : "refusée"} !`);

            // 🔹 Optionnel : fermer le modal
            setOpenView(false);

            // 🔹 Optionnel : recharger la liste des candidatures
            dispatch(getApplicationsByPostIdAction(id));
        } catch (error) {
            console.error("Erreur lors de la décision :", error);
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
                    <Typography variant="h6" fontWeight="bold" color="#230673" mb={5}><Icons.Menu /> Applications Of Job Post </Typography>
                    {/* <CustomButton  title="Add new Post" color={'#210f72ff'} icon={<Icons.AddCircleOutline/>} onClick={() => setOpenAdd(true)}/> */}
                </Stack>

                <CustomTable rows={paginatedRows} columns={columns} actions={actionsTab} />

                <Box>
                    <PaginationUX count={totalPages} onChange={handlePageChange} page={currentPage} color={'#210f72ff'} />
                </Box>


                {/* ✅ Modal d’affichage */}
                <CustomModel
                    title={`Application Details Of The Post ${selectedApp?.id_post?.title || ""}`}
                    open={openView}
                    handleClose={handleCloseView}
                    icon={<Icons.Visibility />}
                >
                    {selectedApp ? (
                        <Stack spacing={2}>
                            <Typography><strong>Job Title:</strong> {selectedApp.id_post?.title}</Typography>
                            <Typography><strong>Candidate:</strong> {selectedApp.id_user?.firstName} {selectedApp.id_user?.lastName}</Typography>
                            <Typography><strong>Email:</strong> {selectedApp.id_user?.email}</Typography>
                            <Typography><strong>Cover Letter:</strong> {selectedApp.cover_letter}</Typography>
                            <Typography>
                                <strong>CV:</strong> <a href={selectedApp.cv} target="_blank" rel="noopener noreferrer" style={{ color: '#210f72ff' }}>View / Download</a>
                            </Typography>
                            <Typography><strong>Location:</strong> {selectedApp.id_post?.location}</Typography>
                            <Typography><strong>Created At:</strong> {new Date(selectedApp.createdAt).toLocaleDateString()}</Typography>

                            {/* 🔹 Boutons Accepter / Refuser */}
                            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                                <CustomButton
                                    title="Accept"
                                    color="#28a745"
                                    icon={<Icons.Check />}
                                    onClick={() => handleApplicationDecision(selectedApp._id, "accepted")}
                                />
                                <CustomButton
                                    title="Reject"
                                    color="#dc3545"
                                    icon={<Icons.Close />}
                                    onClick={() => handleApplicationDecision(selectedApp._id, "rejected")}
                                />
                            </Stack>

                        </Stack>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </CustomModel>


            </Box>






        </>

    )
}

export default ApplicationsOfPost