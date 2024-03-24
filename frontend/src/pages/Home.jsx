import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BookTable from '../components/home/BookTable'
import BookCards from '../components/home/BookCards'
import { PORT } from "../../../backend/config.js";


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    // Used to show the style of display on the website
    const [showType, setShowType] = useState('table');
    const location = useLocation();
    const feedback = location.state && location.state.feedback;

    useEffect(() => {
        setLoading(true);
        // Get all the books in the database
        axios
            .get(`http://localhost:${PORT}/books`)
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            {
                feedback && <p className='flex justify-center items-center text text-sky-800 text-4xl pt-3'>{feedback}</p>
            }
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {
                //Conditionally render based on user's selection
                loading ? <Spinner /> : showType === 'table' ? (<BookTable books={books} />) : (<BookCards books={books} />)
            }
        </div>
    )
}

export default Home