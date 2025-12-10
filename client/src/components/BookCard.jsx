const BookCard = ({ book, onExchange, showActions = true }) => {
  const getStatusBadge = (status) => {
    const badges = {
      available: "bg-green-100 text-green-800",
      traded: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return badges[status] || badges.available;
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    // Jika imageUrl sudah full URL, return as is
    if (imageUrl.startsWith("http")) return imageUrl;
    // Jika path relatif, gabungkan dengan backend URL
    return `http://localhost:5000/${imageUrl}`;
  };

  return (
    <div className="card overflow-hidden">
      {/* Book Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        {book.imageUrl ? (
          <img
            src={getImageUrl(book.imageUrl)}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><span class="text-4xl">📚</span></div>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">📚</span>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(book.status)}`}>{book.status}</span>
        </div>

        <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
        <p className="text-sm text-gray-500 mb-3">
          {book.category} • {book.year}
        </p>

        <p className="text-sm text-gray-700 line-clamp-2 mb-4">{book.description}</p>

        {showActions && book.status === "available" && (
          <button onClick={() => onExchange && onExchange(book)} className="w-full btn-primary">
            Request Exchange
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
