import BookSingleCard from "./BookSingleCard"

// Displays all the books in the database using the card style defined by BookSingleCard
const BookCards = ({ books }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((item) => (
                <BookSingleCard key={item._id} book={item}/>
            ))}
        </div>
    )
}

export default BookCards