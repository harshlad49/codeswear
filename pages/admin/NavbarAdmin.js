import React from 'react'

const NavbarAdmin = () => {
  return (
    <div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 w-full md:w-64">
  <ul className="space-y-3">
    {[
      { label: 'Add Product', href: '/admin/Addproduct' },
      { label: 'View Products', href: '/admin/products' },
      { label: 'Image Uploader', href: '/admin/image-uploader' },
      { label: 'Orders', href: '/admin/orders' },
      { label: 'Customers', href: '/admin/customers' },
      { label: 'Settings', href: '/admin/settings' },
    ].map((item) => (
      <li key={item.label}>
        <a href={item.href} className="flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <span className="text-sm font-medium">{item.label}</span>
        </a>
      </li>
    ))}
  </ul>
</div>
    </div>
  )
}

export default NavbarAdmin

