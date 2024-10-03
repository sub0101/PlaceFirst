import React from 'react';
import { Typography, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const ViewStats = () => {
  const placementStats = [
    { name: 'CSE', placed: 40, total: 100 },
    { name: 'ECE', placed: 30, total: 80 },
    { name: 'ME', placed: 20, total: 60 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <Title level={2}>Placement Statistics</Title>
      <Card className="mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={placementStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="placed" fill="#8884d8" />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={placementStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="placed" stroke="#8884d8" />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={placementStats} dataKey="placed" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {placementStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Pie data={placementStats} dataKey="total" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label>
              {placementStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default ViewStats;
