import { useAuth } from "../hooks/useAuth";
import { FiUser, FiMail, FiBook, FiRepeat } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
            <FiUser className="text-5xl text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FiMail className="text-primary-600" />
              {user?.email}
            </p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Username</span>
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-lg p-4 text-center">
                <FiBook className="text-3xl text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Books Listed</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <FiRepeat className="text-3xl text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Exchanges Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
