import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Register = () => {
    const navigate=useNavigate();
    const[registerInput,setRegister]=useState({
        name:'',
        email:'',
        password:'',
        errors_list:[]
    });
    const handleInput=(e)=>
    {
        e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value});
    }
    const register=(e)=>
    {
        e.preventDefault();
        const data={
            name:registerInput.name,
            email:registerInput.email,
            password:registerInput.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register',data).then(res=>{
                if(res.data.status===200)
                {
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_username',res.data.username);
                    localStorage.setItem('role_as',res.data.role);
                    localStorage.setItem('auth_email',res.data.email);
                    Swal.fire(
                        'Success',
                        res.data.message,
                        'success'
                    );
                    navigate('/');
                }
                else
                {
                    setRegister({...registerInput,errors_list:res.data.errors});
                }
            });
        });
        

    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Register</h4>
                        </div>
                        <form onSubmit={register} className='card-body'>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full Name </label>
                                <input type="text" className="form-control" id="name" onChange={handleInput} value={registerInput.name} name='name' placeholder="Name"/>
                                <span className="text-danger">{registerInput.errors_list.name}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" onChange={handleInput} value={registerInput.email} name='email' placeholder="name@example.com"/>
                                <span className="text-danger">{registerInput.errors_list.email}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" autoComplete="1" id="password" onChange={handleInput} value={registerInput.password} name='password' placeholder="Password"/>
                                <span className="text-danger">{registerInput.errors_list.password}</span>
                            </div>
                            <button className="btn btn-outline-success">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
