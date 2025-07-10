
import AuthAdmin from '../Auth/AuthAdmin'
import { useRouter } from 'next/router';
import NavbarAdmin from './NavbarAdmin';
const Dashboard = ({}) => {
   const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    router.push("/");
  };
  return (
   <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow"
          >
            Logout
          </button>
        </div>

      <div className="flex flex-col space-y-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Total Sales', value: '$12,345', change: '+12%', trend: 'up' },
            { title: 'New Orders', value: '56', change: '+5%', trend: 'up' },
            { title: 'Products', value: '243', change: '-2%', trend: 'down' },
            { title: 'Visitors', value: '1.2K', change: '+23%', trend: 'up' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              <div className={`flex items-center mt-2 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
<NavbarAdmin/>


          {/* Sales Chart */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            
            <div className="h-64">
              {/* Chart placeholder - you would replace this with an actual chart component */}
              <div className="flex items-end h-48 mt-4 space-x-1">
                {[200, 400, 300, 500, 400, 600, 700, 800, 600, 500, 400, 300].map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md hover:from-blue-600 hover:to-blue-400 transition-all"
                    style={{ height: `${height / 10}px` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Recent Activity</h2>
            <ul className="space-y-4">
              {[
                { action: 'New order #1234', time: '2 min ago', user: 'John Doe' },
                { action: 'Product updated', time: '10 min ago', user: 'Sarah Smith' },
                { action: 'New customer registered', time: '1 hour ago', user: 'Mike Johnson' },
                { action: 'Payment received', time: '3 hours ago', user: 'Emma Wilson' }
              ].map((activity, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time} • {activity.user}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Add Product', icon: 'plus' },
                { title: 'Send Email', icon: 'mail' },
                { title: 'Generate Report', icon: 'file-text' },
                { title: 'View Analytics', icon: 'bar-chart' }
              ].map((action, index) => (
                <button 
                  key={index}
                  className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon === 'plus' ? "M12 4v16m8-8H4" : 
                        action.icon === 'mail' ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" :
                        action.icon === 'file-text' ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" :
                        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"} />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{action.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-100">
                    <th className="pb-2 text-left">Order</th>
                    <th className="pb-2 text-left">Customer</th>
                    <th className="pb-2 text-left">Status</th>
                    <th className="pb-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: '#1234', customer: 'John Doe', status: 'Shipped', total: '$89.99' },
                    { id: '#1235', customer: 'Sarah Smith', status: 'Processing', total: '$124.99' },
                    { id: '#1236', customer: 'Mike Johnson', status: 'Delivered', total: '$56.99' },
                    { id: '#1237', customer: 'Emma Wilson', status: 'Pending', total: '$199.99' }
                  ].map((order, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-3 text-blue-600 font-medium">{order.id}</td>
                      <td className="py-3 text-gray-700">{order.customer}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Delivered' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-700 font-medium">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default AuthAdmin(Dashboard)
