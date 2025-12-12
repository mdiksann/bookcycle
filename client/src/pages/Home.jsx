import { Link } from "react-router-dom";
import { FiBook, FiRepeat, FiUsers, FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to BookCycle</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">Share knowledge, build community, exchange books with fellow readers</p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Get Started
              </Link>
              <Link to="/books" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why BookCycle?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FiBook className="text-5xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Books</h3>
              <p className="text-gray-600">List your books and make them available for exchange with other readers</p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FiRepeat className="text-5xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Exchange</h3>
              <p className="text-gray-600">Request book exchanges and manage your transactions easily</p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FiUsers className="text-5xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Join Community</h3>
              <p className="text-gray-600">Connect with fellow book lovers and expand your reading collection</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Exchanging?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of readers sharing and discovering new books</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            Create Your Account
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
