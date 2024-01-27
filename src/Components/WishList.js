import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const WishList = () => {
    const[wishProduct,setWishProd]=useState([]);
    const[loading,setLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get('/api/whishlist').then(res=>{
            if(res.data.status===200)
            {
                setWishProd(res.data.wishlist)
                setLoading(false);
            }
            else if(res.data.status===401)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/login');
            }
        });
    },[navigate]);

    const submitAddToCart=(e,id)=>{
        e.preventDefault();
        const data={
            product_id:id,
            product_quantity:1,
        };
        axios.post(`/api/add-to-cart`,data).then(res=>{
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

    
    const deleteWishProd=async(e,wish_id)=>{
        e.preventDefault();
        const thisClicked=e.currentTarget;
        thisClicked.innerText='Removing';
    
        axios.delete(`/api/wishProd-delete/${wish_id}`).then(res=>{
            if(res.data.status===200)
            {
                //Swal.fire('Success',res.data.message,'success');
                thisClicked.closest("#cont").remove();
            }
            else if(res.data.status===404)
            {
                Swal.fire('Warning',res.data.message,'warning');
                thisClicked.innerText='Remove';
            }
            else if(res.data.status===401)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading wishList...</h4>
    }
    else
    {
        if(wishProduct.length>0)
        {
            var wish_product='';
            wish_product=
            wishProduct.map((prod,index)=>{
                return(
                    
                    <div className="col-md-8 border mb-3" key={index} id="cont">
                        <div className="p-2">
                            <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                                <div className="mr-1">
                                    <img className="rounded" alt="" src={`http://127.0.0.1:8000/${prod.image}`} width="70"/>
                                </div>
                                <div className="d-flex flex-column align-items-center product-details">
                                    <Link className="nav-link" to={`/collections/${prod.product.category.slug}/${prod.product.slug}`}>
                                        <span className="font-weight-bold">{prod.product.name}</span>
                                    </Link>
                                </div>
                                
                                <div>
                                    <h5 className="text-grey">${prod.product.selling_price}</h5>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-danger btn-sm mx-1" onClick={e=>deleteWishProd(e,prod.id)}>Remove</button>
                                    <button className="btn btn-success btn-sm mx-1" onClick={(e)=>submitAddToCart(e,prod.product_id)}>Add to cart</button>
                                </div>
                            </div>
                        </div>    
                    </div>
                )
            });
        }
        else
        {
            wish_product=
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your wishList is empty</h4>
            </div>
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
            <h4>Wish List</h4>
                {wish_product}
            </div>
        </div>
    )
}

export default WishList;
