import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const Checkout = () => {
    const[loading,setloading]=useState(true);
    const[cart,setCart]=useState([]);
    const[error,setError]=useState([]);
    const navigate=useNavigate();
    const[checkoutInput,setCheckoutInput]=useState({
        email: "",
        Full_name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        total:''

    });

    const handleInput=(e)=>{
        e.persist();
        setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
    }


    const submitOrder=(e,payment_mode)=>
    {
        e.preventDefault();
        const data={
            email: checkoutInput.email,
            Full_name: checkoutInput.Full_name,
            phone: checkoutInput.phone,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state:checkoutInput.state,
            zipcode:checkoutInput.zipcode,
            payment_mode:payment_mode,
            total:totalCartPrice,
        };

        switch (payment_mode) {
            case 'cod':
                axios.post('/api/place-order',data).then(res=>{
                    if(res.data.status===200)
                    {
                        Swal.fire('Order Placed successfully',res.data.message,'success');
                        setError([]);
                        navigate('/');
                    }
                    else if(res.data.status===422)
                    {
                        Swal.fire('Error','Empty fields','error');
                        setError(res.data.errors);
                    }
                    else if(res.data.status===401)
                    {
                        Swal.fire('Error',res.data.message,'error');
                        navigate('/');
                    }
                });
                break;
        
            case 'payOnline':
                axios.post('/api/validate-order',data).then(res=>{
                    if(res.data.status===200)
                    {
                        setError([]);
                        var myModal = new Modal(document.getElementById('payOnlineModal'));
                        myModal.show();
                    }
                    else if(res.data.status===422)
                    {
                        Swal.fire('Error','Empty fields','error');
                        setError(res.data.errors);
                    }
                    else if(res.data.status===401)
                    {
                        Swal.fire('Error',res.data.message,'error');
                        navigate('/');
                    }
                });
                break;    

            default:
                break;
        }


    }

    var totalCartPrice=0;
    useEffect(()=>{
        axios.get(`/api/cart`).then(res=>{
            if(res.data.status===200)
            {
                setCart(res.data.cart)
                setloading(false);
            }
            else if(res.data.status===401)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/login');
            }
        });
    },[navigate]);

    if(loading)
    {
        return <h4>Loading checkout...</h4>
    }
    if(cart.length>0)
    {
        var cart_checkout_view='';
        cart_checkout_view=
        <div>
            <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Basic Information</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Full Name</label>
                                                <input type="text" name="Full_name" onChange={handleInput} value={checkoutInput.Full_name} className="form-control" />
                                                <small className="text-danger">{error.Full_name}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Phone Number</label>
                                                <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                                <small className="text-danger">{error.phone}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Email Address</label>
                                                <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                                <small className="text-danger">{error.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label>Full Address</label>
                                                <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                                <small className="text-danger">{error.address}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>City</label>
                                                <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                                <small className="text-danger">{error.city}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>State</label>
                                                <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                                <small className="text-danger">{error.state}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Zip Code</label>
                                                <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                                <small className="text-danger">{error.zipcode}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <button type="button" onClick={(e)=>submitOrder(e,'cod')} className="btn btn-primary mx-2">Palce Order</button>
                                                <button type="button" onClick={(e)=>submitOrder(e,'payOnline')} className="btn btn-primary mx-2">Pay Online</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width='50%'>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map((item,index)=>{
                                    totalCartPrice+=item.product.selling_price*item.product_quantity;
                                        return (
                                        <tr key={index}>
                                            <td>{item.product.name}</td>
                                            <td>{item.product.selling_price}</td>
                                            <td>{item.product_quantity}</td>
                                            <td>{item.product.selling_price*item.product_quantity}</td>
                                        </tr>
                                        )
                                        })}
                                        <tr>
                                            <td colSpan="2" className="text-end fw-bold">
                                                Grand Total
                                            </td>
                                            <td colSpan="2" className="text-end fw-bold">
                                                {totalCartPrice}
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
        </div>
    }
    else
    {
        cart_checkout_view=
        <div className="card card-body py-5 text-center shadow-sm">
            <h4>Your shopping cart is empty.You are in checkout page.</h4>
        </div>
    }

    return (
        <div>
            <div className="modal fade" id="payOnlineModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Online payment mode </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <hr />
                        <PayPalScriptProvider options=
                        {{ 
                            "client-id": "test",
                        }}>
                            <PayPalButtons createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: (totalCartPrice),
                                            },
                                        },
                                    ],
                                });
                            }} 
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    const name = details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`);
                                });
                            }} />
                        </PayPalScriptProvider>
                    </div>
                    </div>
                </div>
            </div>

            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    {cart_checkout_view}
                </div>
            </div>
        </div>
    )
}

export default Checkout;
