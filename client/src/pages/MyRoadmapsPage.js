import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyRoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  const fetchRoadmaps = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/roadmaps/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoadmaps(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/roadmaps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoadmaps(roadmaps.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/roadmaps/download/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'roadmap.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Saved Roadmaps</h2>
      {roadmaps.length === 0 ? (
        <p>No roadmaps saved yet.</p>
      ) : (
        <div className="space-y-4">
          {roadmaps.map((r) => (
            <div key={r._id} className="border p-4 rounded-lg shadow-md">
              <p className="font-semibold">Submitted On: {new Date(r.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleDownload(r._id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Download</button>
              <button onClick={() => handleDelete(r._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRoadmapsPage;
