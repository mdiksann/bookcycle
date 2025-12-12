import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookService } from "../services/bookService";
import { FiUpload } from "react-icons/fi";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "Novel",
    year: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = ["Novel", "Science", "History", "Biography", "Self-Help", "Fiction", "Non-Fiction", "Other"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const bookData = { ...formData, image };
      await bookService.createBook(bookData);
      navigate("/my-books");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Book</h1>

      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Book Cover Image</label>
            <div className="flex items-center gap-4">
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-40 object-cover rounded-lg" />}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <FiUpload className="text-3xl text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Book Title *</label>
            <input type="text" required className="input-field" placeholder="Enter book title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input type="text" required className="input-field" placeholder="Enter author name" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
          </div>

          {/* Category and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select className="input-field" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year *</label>
              <input type="number" required min="1800" max={new Date().getFullYear()} className="input-field" placeholder="e.g. 2020" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea required rows="4" className="input-field" placeholder="Enter book description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Adding Book..." : "Add Book"}
            </button>
            <button type="button" onClick={() => navigate("/my-books")} className="flex-1 btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
