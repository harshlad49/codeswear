'use client';
import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     

    
      <div className="flex flex-col space-y-6">
       
        <div className="flex flex-col md:flex-row gap-6">
      
          <div className="bg-white p-5 rounded-lg shadow-sm w-full md:w-64">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Dashboard</h2>
            <ul className="space-y-3">
              {['Add Product', 'View Products', 'Image Uploader', 'Orders'].map((item) => (
                <li key={item} className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        
          <div className="bg-white p-5 rounded-lg shadow-sm flex-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Sales Overview</h2>
            <div className="flex flex-col">
              <div className="flex justify-between mb-3">
                {[400, 500, 200, 100].map((num, i) => (
                  <span key={i} className="text-gray-700 font-medium text-sm">{num}</span>
                ))}
              </div>
              <div className="flex justify-between">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <span key={month} className="text-xs text-gray-500">{month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

       
        <div className="flex flex-col md:flex-row gap-6">
      
          <div className="bg-white p-5 rounded-lg shadow-sm w-full md:w-64">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Get This for Free</h2>
            <ul className="space-y-3">
              {['Download Free', 'Check Pro'].map((item) => (
                <li key={item} className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

       
          <div className="bg-white p-5 rounded-lg shadow-sm w-full md:w-64">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Daily Activity</h2>
            <ul className="space-y-3">
              {['Meeting with John', 'Product Performance'].map((item) => (
                <li key={item} className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

      
          <div className="flex-1"></div>
        </div>

       
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-4 gap-4 text-sm text-gray-700 font-medium">
            <span>16</span>
            <span>Assigned</span>
            <span>Name</span>
            <span>Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}