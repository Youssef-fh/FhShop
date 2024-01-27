import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Featured = () => {

    const[featuredProduct,setFeaturedProd]=useState([]);
    const[loading,setLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get('/api/product-featured').then(res=>{
            if(res.data.status===200)
            {
                setFeaturedProd(res.data.featured_products);
                setLoading(false);
            }
        })
    },[]);

    const submitWishlist=(e,id)=>{
        e.preventDefault();
        const data={
            product_id:id,
        };
        axios.post(`/api/add-to-wishList`,data).then(res=>{
            if(res.data.status===201)
            {
                Swal.fire('Success',res.data.message,'success');
            }
            else if(res.data.status===409)
            {
                Swal.fire('Success',res.data.message,'success');
            } 
            else if(res.data.status===401)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/login');
            }
            else if(res.data.status===404)
            {
                Swal.fire('Warning',res.data.message,'warning');
            }
        });
    };

    if(loading)
    {
        return <h4>Loading featured product...</h4>
    }
    else
    {
        var product_html='';
        product_html=featuredProduct.map((prod,index)=>{
            return(
                <div class="col-md-10 mb-3" key={index}>
                    <div class="row p-2 bg-white border rounded">
                        <div class="col-md-3 mt-1">
                            <img class="img-fluid img-responsive rounded product-image" src={`http://127.0.0.1:8000/${prod.image}`} alt=''/>
                        </div>
                        <div class="col-md-6 mt-1">
                            <h5>{prod.name}</h5>
                            <div class="d-flex flex-row">
                                <div class="ratings mr-2 text-warning">
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/> 
                                </div>
                                <span>310</span>
                            </div>
                            <div class="mt-1 mb-1 spec-1">
                                <span>{prod.description}</span>
                            </div>
                            <div class="mt-1 mb-1 spec-1">
                                <Link to={`/collections/${prod.category?.slug}`}>{prod.category?.name}</Link>
                            </div>
                        </div>
                        <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                            <div class="d-flex flex-row align-items-center">
                                <h4 class="mr-1">${prod.selling_price}</h4>
                                <span class="strike-text"><s>${prod.original_price}</s></span>
                            </div>
                            <h6 class="text-success">Free shipping</h6>
                            <div class="d-flex flex-column mt-4">
                                <Link to={`/collections/${prod.category?.slug}/${prod.slug}`} class="btn btn-primary btn-sm" type="button">Details</Link>
                                <button class="btn btn-outline-primary btn-sm mt-2" type="button" onClick={(e)=>submitWishlist(e,prod.id)}>Add to wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row">
                {product_html}
            </div>
        </div>
    )
}

export default Featured;
