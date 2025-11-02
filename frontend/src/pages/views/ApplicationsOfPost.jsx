import { Box, Chip, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import { CustomButton } from '../../components/materials/CustomButton';
import * as Icons from '@mui/icons-material';
import { CustomTable } from '../../components/materials/CustomTable';
import PaginationUX from '../../components/materials/PaginationUX';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDetailsByIdAction, getApplicationsByPostIdAction, updateAppAction } from '../../redux/actions/applicationAction';
import { useParams } from 'react-router-dom';
import CustomModel from '../../components/materials/CustomModel';
import { toast, ToastContainer } from 'react-toastify';

const ApplicationsOfPost = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [jobTitle, setJobTitle] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            try {
                const applications = await dispatch(getApplicationsByPostIdAction(id)).unwrap();
                console.log("apps of post :", applications)
                if (applications?.length > 0) {
                    // Récupère le titre du job depuis la première application
                    setJobTitle(applications[0]?.id_post?.title || "");
                }
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
        { field: "status", 
          label: "Status",
          renderCell: (row) => {
            let color = ""
            switch(row.status){
                case "accepted": 
                color="success"
                break;
                case "rejected":
                color = "error"
                break;
                default :
                color = "warning"
                break;
            }
            return <Chip label={row.status} color={color} variant='outlined'></Chip>
          }
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
            // Appel API pour accepter ou refuser la candidature 
            await dispatch(updateAppAction({ id: appId, status: decision })).unwrap();
            console.log(`Application ${appId} marked as ${decision}`);
            toast.success("Application Updated with success ! ")
            // alert(`Candidature ${decision === "accepted" ? "acceptée" : "refusée"} !`);
            // fermer le modal
            setOpenView(false);
            // recharger la liste des candidatures
            dispatch(getApplicationsByPostIdAction(id));

        } catch (error) {
            toast.error("Update App failed ")
            console.error("Erreur lors de la décision :", error);
        }
    };



    return (
        <>
            <ToastContainer position='bottom-right' autoClose={2000} />
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #f5f2f2ff 0%, #ffffff 100%)',
                    minHeight: '100vh',
                    py: 3,
                    px: { xs: 2, sm: 4, md: 6 },
                }}
            >

                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold" color="#230673" mb={5}><Icons.Menu /> Applications Of Job Post {jobTitle && `- ${jobTitle}`}</Typography>
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
                                <strong>CV:</strong>
                                <Stack direction="row" spacing={1}>
                                    {/* 🔹 Bouton "View" - ouvre le PDF dans un nouvel onglet */}
                                    <CustomButton
                                        title="View"
                                        color="#007bff"
                                        icon={<Icons.Visibility />}
                                        onClick={() => {
                                            const filePath = selectedApp.cv.includes("/uploads/")
                                                ? selectedApp.cv
                                                : `uploads/cvs/${selectedApp.cv}`;
                                            const viewUrl = `${process.env.REACT_APP_BASE_URL}/${filePath.replace(/^\/+/, "")}`;
                                            window.open(viewUrl, "_blank");
                                        }}
                                    />

                                    {/* 🔹 Bouton "Download" - force le téléchargement */}
                                    <CustomButton
                                        title="Download"
                                        color="#28a745"
                                        icon={<Icons.Download />}
                                        onClick={() => {
                                            const fileName = selectedApp.cv.includes("uploads/cvs/")
                                                ? selectedApp.cv.split("uploads/cvs/").pop()
                                                : selectedApp.cv;
                                            const downloadUrl = `${process.env.REACT_APP_BASE_URL}/download/cv/${encodeURIComponent(fileName)}`;
                                            window.open(downloadUrl, "_blank");
                                        }}
                                    />
                                </Stack>
                            </Typography>



                            <Typography><strong>Location:</strong> {selectedApp.id_post?.location}</Typography>
                            <Typography><strong>Created At:</strong> {new Date(selectedApp.createdAt).toLocaleDateString()}</Typography>

                            {/* 🔹 Boutons Accepter / Refuser */}
                            {selectedApp.status === "pending" && (
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
                            )}
                            {selectedApp.status !== "pending" && (
                                <Chip align='center' mt="2" label={selectedApp.status} variant='outlined' sx={{color: selectedApp.status === "accepted" ? "success.main": "error.main"}}><strong>Status:</strong> { selectedApp?.status}</Chip>
                            )}

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