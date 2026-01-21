import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { mockLogout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Products', href: '/admin/products', icon: CubeIcon },
    { name: 'Inventory', href: '/admin/inventory', icon: Squares2X2Icon },
    { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  ];

  const handleLogout = () => {
    mockLogout();
    navigate('/admin/login');
  };

  const isActive = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-black text-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-xl font-bold">
              no -ites Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="text-sm text-gray-300 hover:text-white"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
