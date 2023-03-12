import React, { useState, useEffect, useId } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userSavedPinsQuery, userQuery } from '../utils/data';
import { client } from '../client';
import MasonryLLayout from './MasonryLayout';
import Spinner from './Spinner';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();

  const { userId } = useParams();
  const randomImage = "https://source.unsplash.com/1600x900/?nature,photography"

  const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none ";
  const notActiveBtnStyles = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none ";


  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      });
  }, [useId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }
  }, [userId, text])



  const removeUser = () => {
    localStorage.clear();

    navigate("/login")
  }


  if (!user) return <Spinner message="Loading Profile ..." />

  return (
    <div className='pb-2 relative h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='flex flex-col mb-7 relative'>
          <div className='flex flex-col items-center justify-center'>
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt='banner-pic' />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user?.image}
              alt="user-profile" />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className='top-0 absolute z-1 right-0 p-2'>
              <button
                type='button'
                className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                onClick={() => {
                  googleLogout();
                  removeUser();
                }
                }>
                <AiOutlineLogout color='red' fontSize={21} />
              </button>
            </div>
          </div>
          <div className='text-center mt-5 mb-7' >
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created")
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved")
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className='px-2'>
              <MasonryLLayout pins={pins} />
            </div>
          ):(
            <div className='flex justify-center items-center w-full text-xl mt-2 font-bold '>
              No pins found
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default UserProfile