import React from 'react';
import Login, { Banner, Logo, Welcome, Email, Password, Submit, ButtonAfter } from '@react-login-page/page3';

const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log('Login attempt:', { email, password });
  };

  return (
    <Login style={{ height: 650 }} onSubmit={handleLogin}>
      <Banner style={{ backgroundImage: `url('/loginbg.jpeg')` }} />
      <Logo>☄️</Logo>
      <Welcome>Login</Welcome>
      <Email name="email" placeholder="Email" />
      <Password name="password" placeholder="Password" />
      <Submit>Log in</Submit>
      <ButtonAfter>
        <a href="#" style={{ color: 'white' , textDecorationLine : "none" }}>Forgot Password?</a>
      </ButtonAfter>
    </Login>
  );
};

export default LoginPage;