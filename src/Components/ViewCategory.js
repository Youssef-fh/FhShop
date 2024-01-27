import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ViewCategory = () => {
    const[loading,setLoading]=useState(true);
    const[categoryList,setCategoryList]=useState([]);

    useEffect(()=>{
        axios.get('/api/view-category').then(res=>{
            if(res.status===200)
            {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        });
    },[]);

    const deleteCategory=(e,id)=>
    {
        e.preventDefault();
        const thisClicked=e.currentTarget;
        thisClicked.innerText='Deleting';

        axios.delete(`/api/delete-category/${id}`).then(res=>{
            if(res.data.status===200)
            {
                Swal.fire('Success',res.data.message,'success');
                thisClicked.closest('tr').remove();
            }
            else if(res.data.status===404)
            {
                Swal.fire('Error',res.data.message,'error');
                thisClicked.innerText='Delete';
            }
        });
    }

    var view_category='';
    if(loading)
    {
        return <h1>Loading Category</h1>
    }
    else
    {
        view_category=
        categoryList.map( cat=>{
            return(
                <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.slug}</td>
                    <td>{cat.status}</td>
                    <td>
                        <Link to={`/admin/edit-category/${cat.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button onClick={e=>deleteCategory(e,cat.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="container px-4">
        <div className="card">
            <div className="card-header">
                <h4>Category List
                <Link className="btn btn-primary btn-sm float-end" to='/admin/add-category'>Add Category</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {view_category}
                    </tbody>
                </table>
            </div>
        </div>
        </div> 
    )
}

export default ViewCategory;
