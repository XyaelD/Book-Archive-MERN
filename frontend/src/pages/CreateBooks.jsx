import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { PORT } from "../../../backend/config.js";

const CreateBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveBook = () => {
        // Checks for user error
        if(!title || !author || !publishYear){
            alert('Please fill in the fields properly.');
            return;
        }
        
        // Updates the fields and removes any non-alphanumeric characters, replacing them with an empty string
        setTitle(prevTitle => prevTitle.replace(/[^a-zA-Z0-9]/g, ''))
        setAuthor(prevAuthor => prevAuthor.replace(/[^a-zA-Z0-9]/g, ''))
        setPublishYear(prevPublishYear => prevPublishYear.replace(/[^0-9]/g, ''))

        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        
        // Send axios request with valid data
        axios
            .post(`http://localhost:${PORT}/books`, data)
            .then(() => {
                setLoading(false);
                // Returns to homepage on success, and gives user feedback at the top of the page
                navigate('/', {state: {feedback: 'Successfully added book!'}});
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    };

    // When loading the form, display the spinner, else render the form
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Title</label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                            required
                        />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-slate-700'>Author</label>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                            required
                        />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                        <input
                            type='number'
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                            required
                        />
                    </div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}

export default CreateBooks