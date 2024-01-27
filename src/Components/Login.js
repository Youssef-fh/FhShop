    import axios from 'axios';
    import { useState } from 'react'
    import { useNavigate } from 'react-router-dom';
    import Swal from 'sweetalert2';

    const Login = () => {
        const navigate=useNavigate();

        const[loginInput,setLogin]=useState({
            email:'',
            password:'',
            errors_list:[]
        });

        const handleInput=(e)=>
        {
            e.persist();
            setLogin({...loginInput,[e.target.name]:e.target.value});
        };

        const login=(e)=>
        {
            e.preventDefault();
            const data={
                email:loginInput.email,
                password:loginInput.password
            };
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('api/login',data).then(res=>{
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
                        if(res.data.role==='admin')
                        navigate('/admin/profile');
                        else
                        navigate('/');

                    }
                    else if(res.data.status===401)
                    {
                        Swal.fire('Warning',res.data.message,'warning');
                    }
                    else
                    {
                        setLogin({...loginInput,errors_list:res.data.errors});
                    }
                });
            });
        };

        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Login</h4>
                        </div>
                        <form onSubmit={login} className='card-body'>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" onChange={handleInput} value={loginInput.email} name='email' placeholder="name@example.com"/>
                                <span className='text-danger'>{loginInput.errors_list.email}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" autoComplete="1" id="password" onChange={handleInput} value={loginInput.password} name='password' placeholder="Password"/>
                                <span className='text-danger'>{loginInput.errors_list.password}</span>
                            </div>
                            <button className="btn btn-outline-success">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    export default Login;
