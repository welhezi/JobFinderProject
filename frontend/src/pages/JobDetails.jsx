import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getJobPostDetailsAction } from "../redux/actions/jobPostAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomModel from "../components/materials/CustomModel";
import { AddNewAppAction } from "../redux/actions/applicationAction";
import * as Icons from '@mui/icons-material';
import { Stack, TextField } from "@mui/material";
import { CustomButton } from "../components/materials/CustomButton";
import Swal from "sweetalert2";

const JobDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const user = currentUser?.user || {};

    const { selectedJob, isFetching, error } = useSelector(
        (state) => state.jobPosts
    );

    useEffect(() => {
        if (id) dispatch(getJobPostDetailsAction(id));
    }, [dispatch, id]);

    const [openAdd,setOpenAdd] = useState(false)
    const handleClose = () => { setOpenAdd(false)}

    const [formData, setFormData] = useState({
    cv: null,
    cover_letter: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData({ ...formData, cv: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


     const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("cv", formData.cv);
      formDataToSend.append("cover_letter", formData.cover_letter);
      formDataToSend.append("id_post", id);
      formDataToSend.append("id_user", user._id);

      await dispatch(AddNewAppAction(formDataToSend)).unwrap();
      setOpenAdd(false);
    } catch (error) {
      console.error("Erreur d’ajout :", error);
    }
  };

  const navigate = useNavigate();

const handleApplyClick = () => {
  if (!currentUser) {
    Swal.fire({
      title: "Connexion requise",
      text: "Vous devez être connecté pour postuler à une offre.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Se connecter",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#210f72",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  } else {
    setOpenAdd(true);
  }
};

    

    return (
        <>
            <div>
                <Navbar />

                {/* Hero Area Start*/}
                <div className="slider-area ">
                    <div className="single-slider section-overly slider-height2 d-flex align-items-center" style={{ backgroundImage: `url("/assets/img/hero/about.jpg")` }}  >
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>Job Details</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-5">
                    {isFetching && <p>Loading job details...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {selectedJob && (
                        <div className="job-details border p-4 rounded shadow-sm">
                            <h2>{selectedJob?.title}</h2>
                            <p className="text-muted">
                                {selectedJob?.id_employee?.company || "Unknown Company"} •{" "}
                                {selectedJob.location}
                            </p>

                            <h4 className="mt-4">Description</h4>
                            <p>{selectedJob.description}</p>

                            <h4>Mission</h4>
                            <p>{selectedJob.mission}</p>

                            <h4>Requirements</h4>
                            <p>{selectedJob.requirements}</p>

                            {/* 🔹 Date et heure séparées */}
                            {selectedJob.endDate && (
                                <h5>
                                    End Date & Time:{" "}
                                    {new Date(selectedJob.endDate).toLocaleDateString("fr-FR")}{" "}
                                    {new Date(selectedJob.endDate).toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </h5>
                            )}

                            <div className="mt-4">
                                <Link to="/listjobs" className="btn btn-secondary" style={{ marginRight: "10px" }}>
                                    ← Back to Jobs
                                </Link>

                                <button onClick={handleApplyClick} className="btn btn-primary">
  Postuler
</button>

                            </div>

                        </div>
                    )}


                    {!isFetching && !selectedJob && !error && (
                        <p>No job details available.</p>
                    )}
                </div>

                
      {/* ✅ Modal d’ajout de condidature */}
      <CustomModel
        title="Add new Application"
        open={openAdd}
        handleClose={handleClose}
        icon={<Icons.AddCircleOutline />}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <input type="file" name="cv" onChange={handleChange} />
            <TextField
              label="Cover Letter"
              name="cover_letter"
              value={formData.cover_letter}
              onChange={handleChange}
              fullWidth
            />
            <CustomButton title="Save" color="#210f72ff" type="submit" />
          </Stack>
        </form>
      </CustomModel>
      

                <Footer />
            </div>
        </>
    );
};

export default JobDetails;
