import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { debounce } from "lodash";


const Home = () => {

    const[search,setSearch]=useState();
    const[product,setProduct]=useState([]);
    const[loading,setLoading]=useState(true);





    const debouncedSearch = debounce((searchQuery) => {
        axios.get(`/api/product-index`, { params: { search: searchQuery } }).then((res) => {
            if (res.data.status === 200) {
                setProduct(res.data.products);
                setLoading(false);
            } else if (res.data.status === 404) {
                setProduct([]);
            }
        });
      }, 1000); // Adjust the debounce delay as needed

    
    useEffect(() => {
        debouncedSearch(search);
        return () => {
          debouncedSearch.cancel(); // Cancel the debounce function on unmount
        };
    }, [search]);






    
    /* useEffect(()=>{
        axios.get(`/api/product-index`,{ params: { search } }).then(res=>{
            if(res.data.status===200)
            {
                setProduct(res.data.products);
                setLoading(false);
            }
            else if(res.data.status===404)
            {
                setProduct([]);
                setLoading(false);
            }
        });
    },[search]); */

    if(loading)
    {
        return <h4>Loading product...</h4>
    }
    else
    {
        var product_html='';
        product_html=product.map((prod,index)=>{
            return(
                
                <div className="col-md-12 col-lg-4 mb-4 mb-lg-2" key={index}>
                    
                    <div className="card">
                        <Link to={`/collections/${prod.category?.slug}/${prod.slug}`}>
                            <img src={`http://127.0.0.1:8000/${prod.image}`} className="card-img-top" alt="Laptop" style={{"width":"100%",'height':'400px'}} />
                        </Link>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className="small">
                                    <Link to={`/collections/${prod.category?.slug}`} className="text-muted">{prod.category?.name}</Link>
                                </p>
                                <p className="small text-danger"><s>${prod.original_price}</s></p>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">{prod.name}</h5>
                                <h5 className="text-dark mb-0">${prod.selling_price}</h5>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <p className="text-muted mb-0">Available: <span className="fw-bold">{prod.quantity}</span></p>
                                <div className="ms-auto text-warning">
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            
            )
        })
    }
    return (
        <div className="container">
            <section style={{"backgroundColor": "#eee"}}>
                <ul className="navbar-nav pt-3 align-items-center">
                    <li className="nav-item d-flex">
                        <input type="text" name="search" className="form-control" placeholder="Search ...." value={search} onChange={e=>setSearch(e.target.value)} />
                    </li>
                </ul>
                <div className="container py-5">
                    <div className="row">
                        {product_html}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
