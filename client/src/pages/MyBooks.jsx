import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookService } from "../services/bookService";
import BookCard from "../components/BookCard";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyBooks();
  }, []);

  const loadMyBooks = async () => {
    try {
      const data = await bookService.getMyBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter((b) => b._id !== bookId));
    } catch {
      alert("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
        <Link to="/add-book" className="btn-primary flex items-center gap-2">
          <FiPlus />
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">You haven't added any books yet</p>
          <Link to="/add-book" className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book._id} className="relative">
              <BookCard book={book} showActions={false} />
              <button onClick={() => handleDelete(book._id)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors">
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
