import api from "./api";

export const bookService = {
  getAllBooks: async () => {
    const response = await api.get("/books");
    return response.data;
  },

  getMyBooks: async () => {
    const response = await api.get("/books");
    return response.data;
  },

  createBook: async (bookData) => {
    const formData = new FormData();
    Object.keys(bookData).forEach((key) => {
      formData.append(key, bookData[key]);
    });

    const response = await api.post("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteBook: async (bookId) => {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
  },
};
