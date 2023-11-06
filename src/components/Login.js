import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/layout/login.scss";
import { signIn, userLoggedIn } from '../store/slices/SignUpSlice';
import { useDispatch, /*useSelector*/ } from 'react-redux';
import { useState } from 'react';





function Login() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');

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

    const onHandlerSignIn = async () => {
        const payload = { email, password };
        dispatch(signIn(payload))
            .then((response) => {
                if (!response.registered === true) {
                    dispatch(userLoggedIn(response.payload));
                    console.log('Registro exitoso:', response);
                    localStorage.setItem('user', JSON.stringify(response.payload));
                    Navigate('/'); 
                } else {
                    setError('Error: El email o contraseña no son validos!.');
                }
            }) 
            .catch((error) => {
                console.log('error', error);
                setError('Error de autenticación. Inténtalo de nuevo.');
                Navigate('/login');
            })

    }





    // const isAuthenticated = useSelector((state) => state.SignUpSlice.isAuthenticated);

    return (
        <>
            <h1 className='h1'>LOGIN</h1>
            <Form onClick={handleEvent}
                name="normal_login"
                className="login-form"

            >
                <Form.Item
                    name="useremail"
                    onChange={handleEmail}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    onChange={handlePassword}

                >
                    <Input className='input'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
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
                        onClick={onHandlerSignIn}>
                        Log in
                    </Button>
                    Or <Link to={"/signup"}>Register now!</Link>
                </Form.Item>
            </Form>
            {error && <div className="error-message">{error}</div>}

        </>
    )

}

export default Login;