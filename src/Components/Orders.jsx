import axios from 'axios';
import './orders.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate=useNavigate();
    const [loading,setLoading]=useState([true]);

    useEffect(()=>{
        axios.get('/api/view-orders-users').then(res=>{
        if(res.data.status===200)
        {
            setOrders(res.data.orders);
            setLoading(false);
        }
        else if(res.data.status===401)
        {
            Swal.fire('Unauthorised',res.data.message,'warning');
            navigate('/login');
        }
    });
    },[navigate]);
    
    if(loading)
    {
        return <h4>Loading orders...</h4>
    }
    if(orders.length>0)
    {
        var orders_html="";
        orders_html=orders.map(ord=>{
            var createdAt = new Date(ord.created_at);
            var formattedCreatedAt = createdAt.toUTCString();
            return(
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-8 col-xl-6">
                            <div class="card border-top border-bottom border-3" style={{"border-color": "#f37a27 !important;"}}>
                                <div class="card-body p-5">

                                    <p class="lead fw-bold mb-5" style={{"color": "#f37a27;"}}>Purchase Reciept</p>

                                    <div class="row">
                                        <div class="col mb-3">
                                            <p class="small text-muted mb-1">Date</p>
                                            <p>{formattedCreatedAt}</p>
                                        </div>
                                        <div class="col mb-3">
                                            <p class="small text-muted mb-1">Order No.</p>
                                            <p>{ord.id}</p>
                                        </div>
                                    </div>

                                    <div class="mx-n5 px-5 py-4 prod-cont">
                                        <div class="row">
                                            <div class="col-md-8 col-lg-9 text-dark">
                                             {/*    {ord.orderitems.map(prod=>{
                                                    return(
                                                        <p>{prod.product_name}</p>
                                                    )
                                                })} */}
                                            </div>
                                            <div class="col-md-4 col-lg-3">
                                            {/* {ord.orderitems.map(prod=>{
                                                    return(
                                                        <p>{prod.price} $</p>
                                                    )
                                                })} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row my-4">
                                        <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                                            <p class="lead fw-bold mb-0" style={{"color": "#f37a27;"}}>{ord.total} $</p>
                                        </div>
                                    </div>

                                    <p class="lead fw-bold mb-4 pb-2" style={{"color": "#f37a27;"}}>Tracking Order ({ord.tracking_no})</p>

                                    <div class="row">
                                        <div class="col-lg-12">

                                            <div class="horizontal-timeline">

                                                <ul class="list-inline items d-flex justify-content-between">
                                                    <li class="list-inline-item items-list">
                                                        <p class={`py-1 px-2 rounded text-dark ${ord.status===0?'':'status'}`} >Ordered</p>
                                                        <div class="py-1 px-2 rounded text-dark"></div>
                                                    </li>
                                                    <li class="list-inline-item items-list">
                                                        <p class={`py-1 px-2 rounded text-dark ${ord.status===1?'status':''} `}>Shipped</p>
                                                        <div class="py-1 px-2 rounded text-dark"></div>
                                                    </li>
                                                    <li class="list-inline-item items-list">
                                                        <p class={`py-1 px-2 rounded text-dark ${ord.status===2?'status':''}  `}>On the way</p>
                                                    </li>
                                                    <li class="list-inline-item items-list text-end" style={{"margin-right": "8px;"}}>
                                                        <p className={`${ord.status===3?'status':''} `} style={{"margin-right": "-8px;"}}>Delivered</p>
                                                    </li>
                                                </ul>

                                            </div>

                                        </div>
                                    </div>

                                    <p class="mt-4 pt-2 mb-0">Want any help? 
                                        <Link to='/contact' >Please contactus</Link>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    else
    {
        orders_html=<h4>No orders</h4>
    }
    return (
        <section class="h-100 h-custom cont" >
            {orders_html}
        </section>
    )
}

export default Orders;
