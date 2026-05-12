import api from '../api/axios';
import {useEffect} from 'react';

const Dashboard = () => {
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-600">
            Welcome to the Dashboard
        </h1>
    </div>
  );
}

export default Dashboard;