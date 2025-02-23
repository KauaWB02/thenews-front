import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';

const AuthenticatedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar - Oculta em telas pequenas e pode ser aberta */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-gray-900 transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:w-1/5`}
      >
        <Sidebar />
      </div>

      {/* Botão para abrir/fechar a sidebar em telas pequenas */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiAlignJustify size={24} />
      </button>

      {/* Conteúdo principal */}
      <div className="flex-grow overflow-auto bg-gray-800 w-full md:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
