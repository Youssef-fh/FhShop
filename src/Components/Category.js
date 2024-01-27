import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


const Category = () => {
    const navigate=useNavigate();
    const [categoryInput,setCategoryInput]=useState({
        slug:'',
        name:'',
        description:'',
        status:'',
        meta_title:'',
        meta_keywords:'',
        meta_description:'',
        errors_list:[],
    });

    const handleInput=(e)=>
    {
        e.persist();
        setCategoryInput({...categoryInput,[e.target.name]:e.target.value});
    }

    const submitCategory=(e)=>
    {
        e.preventDefault();
        const data={
            slug:categoryInput.slug,
            name:categoryInput.name,
            description:categoryInput.description,
            status:categoryInput.status,
            meta_title:categoryInput.meta_title,
            meta_keywords:categoryInput.meta_keywords,
            meta_description:categoryInput.meta_description,
        }
        axios.post('/api/store-category',data).then(res=>{
            if(res.data.status===200)
            {
                Swal.fire('Success',res.data.message,'success');
                navigate('/admin/view-category');
            }
            else if(res.data.status===400)
            {
                setCategoryInput({...categoryInput,errors_list:res.data.error});
            }
        })
    }

    return (
        <div className="container">
            <h2 className="mt-3 mb-3">Add Category</h2>
            <form onSubmit={submitCategory} id="category_form">
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
                            <span className="text-danger">{categoryInput.errors_list.slug}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                            <span className="text-danger">{categoryInput.errors_list.name}</span>
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
                            <span className="text-danger">{categoryInput.errors_list.meta_title}</span>
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
    )
}

export default Category;

