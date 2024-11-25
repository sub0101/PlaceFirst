'use client'

import React from 'react'
import { Typography, Card, Segmented } from 'antd'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '../../react query/api/stats'
import { getAllCourses } from '../../react query/api/departments'
import PageSkeleton from '../shared/PageSkeleton'

const { Title } = Typography

// const placementStats = [
//   { name: 'CSE', placed: 40, total: 100 },
//   { name: 'ECE', placed: 30, total: 80 },
//   { name: 'ME', placed: 20, total: 60 },
//   {name:'MCA' , placed:4 , total:24}
// ]

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d']

function ViewStats() {
  const [chartType, setChartType] = React.useState('bar')
  const {data:placementStats ,isSuccess ,isLoading}  = useQuery({
queryFn:getStats,
queryKey:['stats']
  })
if(isSuccess) console.log(placementStats)
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={placementStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPlaced" fill="#1890ff" />
              <Bar dataKey="totalStudent" fill="#52c41a" />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={placementStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shortName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalStudent" stroke="#1890ff" strokeWidth={2} />
              <Line type="monotone" dataKey="totalPlaced" stroke="#52c41a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={placementStats} dataKey="totalPlaced" nameKey="shortName" cx="50%" cy="50%" outerRadius={80} fill="#1890ff">
                {placementStats?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Pie data={placementStats} dataKey="totalStudent" nameKey="shortName" cx="50%" cy="50%" innerRadius={90} outerRadius={110} fill="#52c41a" label>
                {placementStats?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <>
    {isLoading ? <PageSkeleton /> : <div className="container mx-auto px-4 py-8">
     
     <motion.div initial="hidden" animate="visible" variants={fadeIn}>
       <Title level={2} className="text-center mb-8">Placement Statistics</Title>
     </motion.div>
     <motion.div initial="hidden" animate="visible" variants={slideIn} className="mb-8">
       <Segmented
         options={[
           { label: 'Bar Chart', value: 'bar' },
           { label: 'Line Chart', value: 'line' },
           { label: 'Pie Chart', value: 'pie' },
         ]}
         value={chartType}
         onChange={setChartType}
         className="w-full"
       />
     </motion.div>
     <motion.div
       initial="hidden"
       animate="visible"
       variants={fadeIn}
       className="grid grid-cols-1 md:grid-cols-2 gap-8"
     >
       <Card className="shadow-lg">
         <Title level={4} className="mb-4">Chart View</Title>
         {renderChart()}
       </Card>
       <Card className="shadow-lg">
         <Title level={4} className="mb-4">Statistics Summary</Title>
         <motion.div
           initial="hidden"
           animate="visible"
           variants={fadeIn}
           className="space-y-4"
         >
           { !isLoading && placementStats.map((stat, index) => (
             <motion.div
               key={stat.shortName}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="flex justify-between items-center"
             >
               <span className="font-semibold">{stat.shortName}</span>
               <span>Placed: {stat.totalPlaced} / Total: {stat.totalStudent}</span>
               <span className="text-green-500">{ 
               
               stat?.totalStudent 
               ? `${Number(((stat?.totalPlaced / stat?.totalStudent) * 100).toFixed(2))}` 
               : '0'
               
               }%</span>
             </motion.div>
           ))}
         </motion.div>
       </Card>
     </motion.div>

   </div>
   }
    </>
   
  
          
  )
}

export default ViewStats