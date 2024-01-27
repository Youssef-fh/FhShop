import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Cart = () => {
    const[loading,setloading]=useState(true);
    const[cart,setCart]=useState([]);
    const navigate=useNavigate();
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

    const handleDecrement=(card_id)=>{
        setCart(cart=>
            cart.map( (item)=>
                card_id===item.id ? {...item,product_quantity:item.product_quantity-(item.product_quantity > 1 ? 1 : 0)}:item
            )
        );
        updateQuantity(card_id,'dec');
    };

    const handleIncrement=(card_id)=>{
        setCart(cart=>
            cart.map( (item)=>
                card_id===item.id ? {...item,product_quantity:item.product_quantity+(item.product_quantity < 10 ? 1 : 0)}:item
            )
        );
        updateQuantity(card_id,'inc');
    };

    function updateQuantity(card_id,scope)
    {
        axios.put(`/api/cart-updateQuantity/${card_id}/${scope}`).then(res=>{
            if(res.data.status===200)
            {   
                //Swal.fire('Success',res.data.message,'success');
            }
            else if(res.data.status===401)
            {
                Swal.fire('Error',res.data.message,'error');
                navigate('/');
            }
        });
    }

    const deleteCartItem=(e,cart_id)=>{
        e.preventDefault();
        const thisClicked=e.currentTarget;
        thisClicked.innerText='Removing';
        axios.delete(`/api/cart-delete/${cart_id}`).then(res=>{
            if(res.data.status===200)
            {
                Swal.fire('Success',res.data.message,'success');
                thisClicked.closest("tr").remove();
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
        return <h4>Loading Cart...</h4>
    }

    if(cart.length>0)
    {
        var cart_view='';
        cart_view=
    <div>
            <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item,index)=>{
                        totalCartPrice+=item.product.selling_price*item.product_quantity;
                        return (
                    <tr key={index}>
                        <td width='10%'>
                            <img src={`http://localhost:8000/${item.product.image}`} width='50px' height='50px' alt={item.product.name} />
                        </td>
                        <td>{item.product.name}</td>
                        <td width='15%' className="text-center">
                            {item.product.selling_price} DHS
                        </td>
                        <td width='15%'>
                            <div className="input-group">
                                <button type="button" onClick={()=>handleDecrement(item.id)} className="input-group-text">-</button>
                                <div className="form-control text-center">{item.product_quantity}</div>
                                <button type="button" onClick={()=>handleIncrement(item.id)} className="input-group-text">+</button>
                            </div>
                        </td>
                        <td width='15%' className="text-center">
                            {item.product.selling_price*item.product_quantity} DHS
                        </td>
                        <td width='10%'>
                            <button type='button' onClick={e=>deleteCartItem(e,item.id)} className="btn btn-danger btn-sm">Remove</button>
                        </td>
                    </tr>
                        )
                    
                    })}
                </tbody>
            </table>
        </div>
        <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
                <div className="card card-body mt-3">
                    <h4>
                        Sub Total : 
                        <span className="float-end">{totalCartPrice}</span>
                    </h4>
                    <h4>
                        Grand Total : 
                        <span className="float-end">{totalCartPrice}</span>
                    </h4>
                    <hr />
                    <Link to='/checkout' className="btn btn-primary">Checkout</Link>
                </div>
            </div>
        </div>
    </div>
    }
    else
    {
        cart_view=
        <div className="card card-body py-5 text-center shadow-sm">
            <h4>Your shopping cart is empty</h4>
        </div>
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cart_view}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
