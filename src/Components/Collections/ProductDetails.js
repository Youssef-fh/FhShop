import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ProductDetails = () => {
    const{category,product}=useParams();
    const[productDetails,setProductDetails]=useState();
    const[loading,setLoading]=useState(true);
    const navigate=useNavigate();
    const [quantity,setQuantity]=useState(1);
    useEffect(()=>{
        axios.get(`/api/product-details/${category}/${product}`).then(res=>
            {   
                if(res.data.status===200)
                {
                    setProductDetails(res.data.productDetails);
                    setLoading(false);
                }
                else if(res.data.status===404)
                {
                    Swal.fire('Error',res.data.message,'error');
                    navigate(`/collections/${category}`);
                }
                else if(res.data.status===400)
                {
                    Swal.fire('Error',res.data.message,'error');
                    navigate(`/collections/${category}`);
                }
            });
    },[category,product,navigate]);

    const handelDecrement=()=>{
        if(quantity>1)
            setQuantity(prevCount=>prevCount-1);
    };

    const handelIncrement=()=>{
        if(quantity<10 && quantity<productDetails[0].quantity)
            setQuantity(prevCount=>prevCount+1);
    };

    const submitAddToCart=(e)=>{
        e.preventDefault();
        const data={
            product_id:productDetails[0].id,
            product_quantity:quantity?quantity:1,
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

    const submitWishlist=(e)=>{
        e.preventDefault();
        const data={
            product_id:productDetails[0].id,
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
        return <h4>Loading product details...</h4>
    }
    else
    {
        var avail_stock='';
        if(productDetails[0].quantity>0)
        {
        avail_stock=
        <div>
            <label htmlFor="" className="btn btn-sm btn-success px-4 mt-2">In stock</label>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <button type="button" onClick={handelDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity?quantity:1}</div>
                        <button type="button" onClick={handelIncrement} className="input-group-text">+</button>
                    </div>
                </div>
                <div className="col-md-3 mt-3">
                    <button type="button" className="btn btn-primary w-100" onClick={submitAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
        }
        else
        {
            avail_stock=
            <div>
                <label htmlFor="" className="btn btn-sm btn-danger px-4 mt-2">Out of stock</label>
            </div>
        }
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Collections / {productDetails[0].category.name} / {productDetails[0].name}</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-4 border-end">
                            <img src={`http://127.0.0.1:8000/${productDetails[0].image}`} className="w-100" alt={productDetails[0].name}/>
                        </div>
                        <div className="col-md-8">
                            <h4>
                                {productDetails[0].name}
                                <Link className="float-end btn btn-sm btn-danger badge badge-pil">{productDetails[0].brand}</Link>
                            </h4>
                            <p>{productDetails[0].description}</p>
                            <h4 className="mb-1">
                                Rs : {productDetails[0].selling_price}
                                <s className="ms-2"> Rs : {productDetails[0].original_price}</s>
                            </h4>
                            <div>
                                {avail_stock}
                            </div>
                            <button onClick={submitWishlist} type="button" className="btn btn-danger mt-3">Add to wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
