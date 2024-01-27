import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewProductsCollections = () => {
    const{slug}=useParams();
    const[loading,setLoading]=useState(true);
    const[products,setProducts]=useState([]);
    const[category,setCategory]=useState([]);
    const productCount=products.length;
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`/api/fetch-products-slug/${slug}`).then(res=>{
            if(res.data.status===200)
            {
                setProducts(res.data.product_data.product);
                setCategory(res.data.product_data.category);
                setLoading(false);
            }
            else if(res.data.status===400)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/collections');
            }
            else if(res.data.status===404)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/collections');
            }
        });
    },[slug,navigate]);
    if(loading)
    {
        return <h4>Loading product collection...</h4>
    }
    else
    {
        var productList='';
        if(productCount)
        {
            productList=products.map(prod=>{
                return(
                    <div className='col-md-3 mt-3' key={prod.id}>
                        <div className='card'>
                            <Link to={`/collections/${prod.category.slug}/${prod.slug}`}>
                                <img src={`http://127.0.0.1:8000/${prod.image}`} className='w-100' alt={prod.name} style={{'height':'200px'}} />
                            </Link>
                            <div className='card-body'>
                                <Link to={`/collections/${prod.category.slug}/${prod.slug}`}>
                                    <h5>{prod.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else
        {
            productList=
            <div className='col-md-12'>
                <h4>No product available for {category.name}</h4>
            </div>
        }
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Collections / {category.name}</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {productList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProductsCollections;
