import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ViewProduct = () => {

    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(true);

    useEffect( ()=>{
        document.title='View Products';
        axios.get('api/view-product').then(res=>{
            if(res.data.status===200)
            {
                setProducts(res.data.products);
                setLoading(false);
            }
        });
    },[]);

    var display_products='';
    if(loading)
    {
        return <h4>Loading view Products...</h4>
    }
    else
    {
        display_products=products.map(prod=>{
            return(
            <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.category?.name}</td>
                <td>{prod.name}</td>
                <td>{prod.selling_price}</td>
                <td>
                    <img src={`http://127.0.0.1:8000/${prod.image}`} width='50px' alt="" />
                </td>
                <td>
                    <Link to={`/admin/edit-product/${prod.id}`} className="btn btn-sm btn-success">Edit</Link>
                </td>
                <td>
                    {prod.status?'Hidden':'Shown'}
                </td>
            </tr>
            )
        });
    }

    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>View product
                    <Link to='/admin/add-product' className="btn btn-sm btn-primary float-end">Add product</Link>
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered tabel-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Product name</th>
                                <th>Selling price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_products}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
