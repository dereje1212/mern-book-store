import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseUrl';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';
import './Dashboard.css'; // Add your CSS here

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);

        if (error.response && error.response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;

  return (
    <>
      {/* Cards Section */}
      <section className="dashboard-cards">
        {/* Total Products */}
        <div className="card">
          <div className="icon purple">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="card-content">
            <span className="card-number">{data?.totalBooks}</span>
            <span className="card-label">Products</span>
          </div>
        </div>

        {/* Total Sales */}
        <div className="card">
          <div className="icon green">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="card-content">
            <span className="card-number">${data?.totalSales}</span>
            <span className="card-label">Total Sales</span>
          </div>
        </div>

        {/* Trending Books */}
        <div className="card">
          <div className="icon red">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div className="card-content">
            <span className="card-number">{data?.trendingBooks}</span>
            <span className="card-percentage">(13%)</span>
            <span className="card-label">Trending Books This Month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="card">
          <div className="icon blue">
            <MdIncompleteCircle className="icon-svg" />
          </div>
          <div className="card-content">
            <span className="card-number">{data?.totalOrders}</span>
            <span className="card-label">Total Orders</span>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="dashboard-charts">
        <div className="chart-card">
          <div className="chart-header">Number of Orders per Month</div>
          <div className="chart-body">
            <RevenueChart />
          </div>
        </div>
        {/* Add more chart cards here if needed */}
      </section>
    </>
  );
};

export default Dashboard;
