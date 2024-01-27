import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from './fhShop.jpg';

const Navbar = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const logoutSubmit=(e)=>
    {
        e.preventDefault();
        axios.post('/api/logout').then(res=>{
            if(res.data.status===200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_username');
                localStorage.removeItem('role_as');
                Swal.fire(
                        'Success',
                        res.data.message,
                        'success'
                    );
                    navigate('/login');
            }
        });
    }
    var AuthButtons='';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons=(
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>
        )
    }
    else
    if(localStorage.getItem('role_as')==='admin')
    {
        AuthButtons=(
            <>
                <div className="dropdown">
                    <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {localStorage.getItem('auth_username')}(Admin)
                    </Link>
                    <ul className="dropdown-menu text-center">
                        <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/admin/add-category">Add Category</Link></li>
                        <li><Link className="dropdown-item" to="/admin/view-category">View Category</Link></li>
                        <li><Link className="dropdown-item" to="/admin/add-product">Add Product</Link></li>
                        <li><Link className="dropdown-item" to="/admin/view-product">View Product</Link></li>
                        <li><Link className="dropdown-item" to="/admin/view-orders">View Orders</Link></li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={logoutSubmit}>Logout</button>
                        </li>
                    </ul>
                </div>
                
            </>
        )
    }
    else if(localStorage.getItem('role_as')==="")
    {
        AuthButtons=(
            <>
                <div className="dropdown">
                    <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {localStorage.getItem('auth_username')}
                    </Link>
                    <ul className="dropdown-menu text-center">
                        <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/user/cart">Cart</Link></li>
                        <li><Link className="dropdown-item" to="/user/wishlist">WishList</Link></li>
                        <li><Link className="dropdown-item" to="/user/orders">Orders</Link></li>
                        
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={logoutSubmit}>Logout</button>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} height='90px' alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location}?active:`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/featured">Featured</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/collections">Collection</Link>
                        </li>
                        

                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
