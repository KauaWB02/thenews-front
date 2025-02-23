import logo from '../../assets/logo.png';
import { getObject } from '../../store/storage';
import { MenuInterface } from '../../modules/authentication/interfaces/menu.interface';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthTimer from '../../hooks/useAuthTime';
import { loggout } from '../../services/authService';

const Sidebar = () => {
  const menus: MenuInterface[] = getObject<MenuInterface>('menus');
  const { timeLeft } = useAuthTimer();
  const navigate = useNavigate();

  // Converte milissegundos para minutos e segundos
  const loggoutUser = () =>{
    loggout();
    navigate('/login')
  }

  const formatTime = (ms: number | null) => {
    if (ms === null) return 'Carregando...';
    const minutes = Math.floor(ms / 60000); // Minutos
    const seconds = Math.floor((ms % 60000) / 1000); // Segundos
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Formato MM:SS
  };
  return (
    <div className='w-full h-full bg-black-700 p-4'>
      <div className='flex flex-row justify-center'>
        <p className='text-white text-3xl'>{formatTime(timeLeft)}</p>
      </div>

      <img
        className='m-auto'
        src={logo}
        alt='the_news'
      />
      <ul className='mt-4 space-y-2'>
        {menus.map((menu, index) => (
          <li
            key={index}
            className='p-2 hover:bg-gray-700 rounded'>
            <NavLink
              to={menu.route.startsWith('/') ? menu.route : `/${menu.route}`}
              className={({ isActive }) =>
                `block w-full rounded transition ${
                  isActive ? 'text-amarelo' : 'hover:bg-gray-700 text-gray-300'
                }`
              }>
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='flex flex-row justify-center mt-4'>
        <button
          className='text-preto font-medium bg-amarelo px-4 py-2 rounded '
          onClick={loggoutUser}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
