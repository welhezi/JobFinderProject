import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getJobPostDetailsAction } from "../redux/actions/jobPostAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JobDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedJob, isFetching, error } = useSelector(
        (state) => state.jobPosts
    );

    useEffect(() => {
        if (id) dispatch(getJobPostDetailsAction(id));
    }, [dispatch, id]);

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

                                <Link to={`/apply/${selectedJob._id}`} className="btn btn-primary">
                                    Postuler
                                </Link>
                            </div>

                        </div>
                    )}


                    {!isFetching && !selectedJob && !error && (
                        <p>No job details available.</p>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
};

export default JobDetails;
