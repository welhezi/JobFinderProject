import React from 'react'

const Search = () => {
    return (
            
            <div className="slider-area ">
                {/* Mobile Menu */}
                <div className="slider-active">
                    <div className="single-slider slider-height d-flex align-items-center" style={{ backgroundImage: `url("assets/img/hero/h1_hero.jpg")` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-9 col-md-10">
                                    <div className="hero__caption">
                                        <h1>Find the most exciting startup jobs</h1>
                                    </div>
                                </div>
                            </div>
                            {/* Search Box */}
                            <div className="row">
                                <div className="col-xl-8">
                                    {/* form */}
                                    <form action="#" className="search-box">
                                        <div className="input-form">
                                            <input type="text" placeholder="Job Tittle or keyword" />
                                        </div>
                                        <div className="select-form">
                                            <div className="select-itms">
                                                <select style={{
                                                    width: '100%',
                                                    height: '70px',
                                                    background: '#fff',
                                                    padding: '11px 19px 11px 10px',
                                                    color: '#616875',
                                                    border: '0',
                                                    appearance: 'none',
                                                    cursor: 'pointer'
                                                }} name="select" id="select1">
                                                    <option value>Location BD</option>
                                                    <option value>Location PK</option>
                                                    <option value>Location US</option>
                                                    <option value>Location UK</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="search-form">
                                            <a href="#">Find job</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
    )
}

export default Search