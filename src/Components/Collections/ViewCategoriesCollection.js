import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ViewCategoriesCollection = () => {
    const[categories,setCategories]=useState([]);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        axios.get('api/getCategory').then(res=>{
            if(res.data.status===200)
            {
                setCategories(res.data.categories);
                setLoading(false);
            }
        });
    },[]);
    if(loading)
    {
        return <h4>Loading collection category</h4>
    }
    else
    {
        var categoryList='';
        categoryList=categories.map(cat=>{
            return(
                <div className='col-md-4 mb-3' key={cat.id}>
                    <div className='card'>
                        <img src={`http://127.0.0.1:8000/${cat.image}`} className='w-100' style={{'height':'210px'}} alt={cat.name} />
                        <div className='card-body'>
                            <Link to={`/collections/${cat.slug}`}>
                                <h5>{cat.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        });
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Category Page</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {categoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCategoriesCollection;
