import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const ViewOrderItems = () => {
    const {id}=useParams();
    const[loading,setLoading]=useState(true);
    const[orderItems,setOrderItems]=useState([]);
    useEffect(()=>{
        axios.get(`/api/view-order-items/${id}`).then(res=>{
            if(res.data.status===200)
            {
                setOrderItems(res.data.orderItems);
                setLoading(false);
            }
        })
    },[]);
    if(loading)
    {
        return <h4>Loading order items...</h4>
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Order Items</h2>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Quantity</th>
                                <th>Total Price</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.product_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.order.total}</td>
                                    </tr>
                                        )
                                        })}
                                    <tr>
                                        <td colSpan="3" className="text-right">Total Price</td>
                                        <td>{orderItems.reduce((a,b)=>a+b.totalPrice,0)}</td>
                                    </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewOrderItems;
