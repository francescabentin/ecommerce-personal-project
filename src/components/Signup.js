import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import "../styles/layout/login.scss";
import { useDispatch,/* useSelector*/ } from 'react-redux';
import { signUp, userLoggedIn } from '../store/slices/SignUpSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



//
function Signup() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const handleEvent = (e) => {
        e.preventDefault();
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const Navigate = useNavigate();

    const onHandlerSignUp = async () => {
        const payload = { email, password };
        dispatch(signUp(payload))
            .then((response) => {
                dispatch(userLoggedIn(response.payload));
                console.log('Registro exitoso:', response);
                localStorage.setItem('user', JSON.stringify(response.payload));
                Navigate('/');

            }).catch((error) => {
                console.log('error', error);
            })

    }




    return (
        <>
            <h1 className='h1'>SIGN UP</h1>
            <Form onClick={handleEvent}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}

            >
                <Form.Item
                    name="useremail"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                    onChange={handleEmail}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={handlePassword}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {/*} <a className="login-form-forgot" href="#">
                        Forgot password
                </a>*/}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        onClick={onHandlerSignUp}>
                        Sign Up
                    </Button>
                    Or <Link to={"/login"}>Log In!</Link>
                </Form.Item>
            </Form>
        </>
    )

}

export default Signup;