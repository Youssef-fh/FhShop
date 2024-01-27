import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";



const EditCategory = () => {
    const[categoryInput,setCategoryInput]=useState({});
    const navigate=useNavigate();
    const[error,setError]=useState({});
    const[loading,setLoading]=useState(true);
    const {id}=useParams();


    useEffect(()=>{
        axios.get(`/api/edit-category/${id}`).then(res=>{
            if(res.data.status===200)
            {
                setCategoryInput(res.data.category);
            }
            else if(res.data.status===404)
            {
                Swal.fire("Error",res.data.message,'error');
                navigate('/admin/view-category');
            }
            setLoading(false);
        });
    },[id,navigate]);

    const handleInput=(e)=>
    {
        e.persist()
        setCategoryInput({...categoryInput,[e.target.name]:e.target.value});
    }

    const updateCategory=(e)=>
    {
        const data=categoryInput;
        e.preventDefault();
        axios.put(`api/update-category/${id}`,data).then(res=>{
            if(res.data.status===200)
            {
                Swal.fire('Success',res.data.message,'success');
                setError({});
                navigate('/admin/view-category');
            }
            else if(res.data.status===400)
            {
                Swal.fire('Empty fields','','error');
                setError(res.data.error);
            }
            else if(res.data.status===404)
            {
                Swal.fire('Error',res.data.error,'error');
                navigate('/admin/view-category');
            }
        });
    }

    if(loading)
    {
        return <h1>Loading Edit Category...</h1>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category
                        <Link to='/admin/view-category' className="btn btn-primary btn-sm float-end">Back</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo-tab-pane" type="button" role="tab" aria-controls="seo-tab-pane" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className="form-group mb-3 mt-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <span className="text-danger">{error.slug}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <span className="text-danger">{error.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <input type="text" name="description" onChange={handleInput} value={categoryInput.description} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <input type="checkbox" name="status" className="mx-2" onChange={handleInput} value={categoryInput.status} />
                                    <label>Status</label>
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seo-tab-pane" role="tabpanel" aria-labelledby="seo-tab" tabIndex="0">
                                <div className="form-group mb-3 mt-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" className="form-control"onChange={handleInput} value={categoryInput.meta_title} />
                                    <span className="text-danger">{error.meta_title}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <input type="text" name="meta_keywords" className="form-control" onChange={handleInput} value={categoryInput.meta_keywords}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <input type="text" name="meta_description" className="form-control" onChange={handleInput} value={categoryInput.meta_description}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end mt-4">Submit</button>
                    </form>
                </div>    
            </div>
        </div>
    )
}

export default EditCategory;
