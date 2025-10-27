import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobPostsAction } from '../redux/actions/jobPostAction';
import { Link } from 'react-router-dom';

const ListJobs = () => {
      const dispatch = useDispatch();

  // 🔹 Récupération du state du slice
  const { jobPost, isFetching, error } = useSelector((state) => state.jobPosts);

  // 🔹 Charger les offres dès le montage du composant
  useEffect(() => {
    dispatch(getAllJobPostsAction());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      {/* Hero Area Start*/}
        <div className="slider-area ">
                <div className="single-slider section-overly slider-height2 d-flex align-items-center" style={{ backgroundImage: `url("assets/img/hero/about.jpg")` }}  >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h2>Find a Job</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

      <div className="job-listing-area pt-120 pb-120">
        <div className="container">
          <h2 className="text-center mb-4">Available Jobs</h2>

          {/* 🔸 Gestion du chargement */}
          {isFetching && <p>Loading jobs...</p>}

          {/* 🔸 Gestion des erreurs */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="row">
            {/* 🔸 Affichage des offres */}
            {jobPost && jobPost.length > 0 ? (
              jobPost.map((job) => (
                <div key={job._id} className="col-md-6 mb-4">
                  <div className="single-job-items p-4 border rounded shadow-sm">
                    <div className="job-tittle">
                      <h4>{job.title}</h4>
                      <ul>
                        <li>{job.id_employee?.company || "Unknown Company"}</li>
                        <li>
                          <i className="fas fa-map-marker-alt" />{" "}
                          {job.location || "N/A"}
                        </li>
                      </ul>
                    </div>
                    <p>{job.description?.slice(0, 120)}...</p>
                    <Link to={`/job/${job._id}`} className="btn btn-primary mt-2">
                        View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              !isFetching && <p>No job posts found.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ListJobs