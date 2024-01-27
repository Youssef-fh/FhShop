import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ViewOrders = () => {
    const[orders,setOrders]=useState([]);
    const[loading,setloading]=useState(true);
    useEffect(()=>{
        document.title="Orders";
        axios.get('/api/view-orders').then(res=>{
            if(res.data.status===200)
            {
                setOrders(res.data.orders);
                setloading(false);
            }
        });
    },[]);
    if(loading)
    {
        return <h4>Loading orders...</h4>
    }
    var display_orders='';
    if(loading)
    {
        return <h4>Loading view Products...</h4>
    }
    else
    {
        display_orders=orders.map(order=>{
            return(
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.tracking_no}</td>
                <td>{order.phone}</td>
                <td>{order.email}</td>
                <td>{order.address} {order.city} {order.state}</td>
                <td>
                    {order.payment_mode}
                </td>
                <td>
                    {order.status===0?'Ordered':order.status===1?'Shipped':order.status===2?'OnTheWay':'Delivred'}
                </td>
                <td>
                    <Link to={`/admin/view-order-items/${order.id}`} className="btn btn-sm btn-success">View order</Link>
                </td>
            </tr>
            )
        });
    }

    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4> 
                    Orders 
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered tabel-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tracking number</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Adress</th>
                                <th>Payment mode</th>
                                <th colSpan={2} className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_orders}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewOrders;
