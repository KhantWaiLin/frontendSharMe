import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode';
import { client } from '../client'

const Login = () => {
  const navigate = useNavigate();
  
  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture, sub } = decoded;
    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture
    }
    client.createIfNotExists(user)
      .then(() => {
        navigate('/',{replace: true});
      })

  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          muted
          className='w-full h-full object-cover' />
        <div className='flex absolute flex-col inset-0 bg-blackOverlay justify-center items-center'>
          <div className='p-5'>
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className='shadow-2xl items-center justify-center'>
            <GoogleLogin
              onSuccess={(response) => {
                responseGoogle(response);
              }}
              onError={(response) => {
                responseGoogle(response);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login