import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


const User = () => {
    const[password,setPassword]=useState('');
    const[error,setError]=useState([]);
    const navigate=useNavigate();

    const updatePassword=(e)=>{
        e.preventDefault();
        const data={password:password};
        axios.post('/api/update-password',data).then(res=>{
            if(res.data.status===200)
            {
                Swal.fire('Success',res.data.message,'success');
            }
            else if(res.data.status===201)
            {
                setError(res.data.errors);
            }
            else if(res.data.status===401)
            {
                Swal.fire('Warning',res.data.message,"warning");
                navigate('/login');
            }
        });
    }

    const deleteAccount=(e)=>{
        e.preventDefault();
        axios.post('api/delete-account').then(res=>{
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
                    navigate('/');
            }
        });
    }

    return (
        <>
            <div className="container ">
                <div className="row pt-3 align-items-center col-md-7 col-lg-10">
                    <div className="form-group mb-3 col-md-7 col-lg-7">
                        <input type="email" className="form-control" name="email" id="email" value={localStorage.getItem('auth_email')} readOnly/>
                    </div>
                    <div className="from-group mb-3 col-md-7 ">
                        <input type="password" className="form-control" name="password" value={password} id="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                        <p className="text-danger">{error.password}</p>
                    </div>
                    <div className="col-md-7">
                        <button className="btn btn-outline-success btn-sm" onClick={updatePassword}>Update</button>
                    </div>
                </div>
                <hr />
                <h3 className="mt-4">Delete acount</h3>
                <button className="btn btn-danger mt-4" onClick={deleteAccount}>Delete account</button>
            </div>
        </>
    )
}

export default User;
