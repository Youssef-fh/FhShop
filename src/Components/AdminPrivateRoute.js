import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";


const AdminPrivateRoute = () => {
    const [autenticated,setAuth]=useState(false);
    const[loading,setloading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('api/check_auth').then(res=>{
            if(res.status===200)
            {
                setAuth(true);
            }
            setloading(false);
        });
        return()=>{
            setAuth(false);
        }
    },[]);

    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        if(err.response.status===401)
        {
            Swal.fire('Unauthorized',err.response.data.message,'warning');
            navigate('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function(response){
        return response;
    },function(eror)
    {
        if(eror.response.status===403)
        {
            Swal.fire('Forbidden',eror.response.data.message,'warning');
            navigate('/');
        }
        else if(eror.response.status===404)
        {
            Swal.fire('404 Error','Url/Page not found','warning');
            navigate('/');
        }
        return Promise.reject(eror); 
    }
    )
    if(loading)
    {
        return <h1>Loading...</h1>
    }
    return (autenticated?<Outlet/>:<Navigate to='/login'/>)
}

export default AdminPrivateRoute;

