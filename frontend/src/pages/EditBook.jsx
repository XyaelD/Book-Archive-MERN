import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { PORT } from "../../../backend/config.js";

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        setLoading(true);
        // Send an axios request to get a book from the database by id
        axios
            .get(`http://localhost:${PORT}/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setTitle(response.data.title);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    }, [])

    const handleEditBook = () => {

        // Check user input
        if(!title || !author || !publishYear){
            alert('Please fill in the fields properly.');
            return;
        }

        //Safely handle user input by replacing non-alphanumeric characters with an empty string
        setTitle(prevTitle => prevTitle.replace(/[^a-zA-Z0-9]/g, ''))
        setAuthor(prevAuthor => prevAuthor.replace(/[^a-zA-Z0-9]/g, ''))
        setPublishYear(prevPublishYear => prevPublishYear.replace(/[^0-9]/g, ''))

        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://localhost:${PORT}/books/${id}`, data)
            .then(() => {
                setLoading(false);
                // Returns the user to the homepage on success, and gives feedback
                navigate('/', {state: {feedback: 'Successfully updated book!'}});
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    };

    // While loading, display the spinner, else: render the form and populate it with the existing book data
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
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
                        <label className='text-xl mr-4 text-gray-500'>Author</label>
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
                    <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}

export default EditBook