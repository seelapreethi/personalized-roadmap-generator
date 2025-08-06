import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please login again.');
        setError(true);
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data.message);
        setUser(res.data.user);
        setError(false);
      } catch (err) {
        console.error('Unauthorized or error fetching data', err);
        setMessage('❌ Unauthorized. Please login again.');
        setError(true);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-10 text-center">
          <h2 className={`text-2xl font-semibold mb-4 ${error ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </h2>

          {user && (
            <div className="mt-4 space-y-2">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Name:</span> {user.name || 'N/A'}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Email:</span> {user.email || 'No email'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
