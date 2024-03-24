import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { PORT } from "../../../backend/config.js";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    // Send axios request with the book id to delete
    axios
      .delete(`http://localhost:${PORT}/books/${id}`)
      .then(() => {
        setLoading(false);
        // Returns to homepage on success, and gives user feedback
        navigate('/', {state: {feedback: 'Successfully deleted book!'}});
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // When loading the confirmation, display the spinner, else render the confirmation
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook