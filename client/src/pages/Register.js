import React from 'react'
import '../styles/RegisterStyles.css';
import { Button, Checkbox, Form, Input,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
const Register = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    // form handler
    const onfinishHandler=async(values)=>{
        // console.log(values)
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/register',values)
            dispatch(hideLoading())
            if(res.data.success){
                message.success('Register Sucess!');
                navigate('/loginOtp');
            }
            else{
                message.error(res.data.message);
            }
        }
        catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('something went wrong');
        }
    };
  return (
    <>
        <div className="form-container">
            <Form layout='vertical' onFinish={onfinishHandler} className='register-form p-4'>
            <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type="text" required/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" required/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required/>
                </Form.Item>
                <Link to="/login" className='ms-3 me-2'>Already have an account?Login here</Link>
                <button className='btn btn-primary' type='submit'>Register</button>
            </Form>
        </div>
    </>
  )
}

export default Register
