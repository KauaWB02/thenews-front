import { useEffect, useState } from 'react';
import ChartBar from './chartBar/ChartBar';
import ChartLine from './chartLine/ChartLine';
import EngagementbyStatusStreak from './engagementbyStatusStreak/EngagementbyStatusStreak';
import EngagementTrendChart from './engagementTrend/EngagementTrend';
import api from '../../../services/apiService';
import { RankingOfTheMostEngagedReadersInterface } from '../interfaces/dashboard-ranking-of-the-most-engaged-readers.interface';

const Dashboard = () => {
  const [startDate, setStartDate] = useState('2025-02-22');
  const [endDate, setEndDate] = useState('2025-02-28');
  const [status, setStatus] = useState('');
  const [readerRating, setReaderRating] = useState<RankingOfTheMostEngagedReadersInterface[]>([]);

  useEffect(() => {
    api
      .get<{ dashboard: RankingOfTheMostEngagedReadersInterface[] }>(
        'dashboard/ranking-of-the-most-engaged-readers'
      )
      .then((response) => {
        const data = response.data.dashboard;
        setReaderRating(data);
      });
  }, []);

  return (
    <>
      {/* Filtros responsivos */}
      <div className='flex flex-wrap gap-4 w-full p-4 md:p-7 items-center justify-center md:justify-start'>
        <div className='w-full md:w-auto'>
          <label className='block text-base text-white'>Data inicial</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border p-2 rounded text-black w-full'
          />
        </div>
        <div className='w-full md:w-auto'>
          <label className='block text-white text-base'>Data Final</label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border p-2 rounded text-black w-full'
          />
        </div>
        <div className='w-full md:w-auto'>
          <label className='block text-base text-white'>Status</label>
          <select
            className='border p-2 rounded text-black w-full'
            value={status}
            id='status'
            onChange={(e) => setStatus(e.target.value)}>
            <option value=''>Todos</option>
            <option value='Casual'>Casual</option>
            <option value='Regular'>Regular</option>
            <option value='Daily'>Diário</option>
          </select>
        </div>
      </div>

      {/* Container geral responsivo */}
      <div className='flex flex-col xl:flex-row  p-4 md:p-7 bg-gray-800 gap-4'>
        {/* Seção dos Gráficos - Responsivo */}
        <div className='w-full grid grid-cols-1 xl:grid-cols-2 gap-4'>
          <ChartBar
            endDate={endDate}
            startDate={startDate}
            status={status}
          />
          <ChartLine
            endDate={endDate}
            startDate={startDate}
            status={status}
          />
          <EngagementbyStatusStreak
            endDate={endDate}
            startDate={startDate}
            status={status}
          />
          <EngagementTrendChart
            endDate={endDate}
            startDate={startDate}
            status={status}
          />
        </div>

        {/* Seção do Ranking - Responsivo */}
        <div className='bg-gray-800 p-4 rounded-lg w-full xl:w-1/3'>
          <h2 className='text-lg md:text-xl font-bold text-white mb-4 text-center'>
            Ranking dos leitores mais engajados
          </h2>
          <div className='overflow-x-auto'>
            <ul className='text-white space-y-2'>
              {readerRating.map((user, index) => (
                <li
                  className='bg-gray-700 p-2 rounded flex flex-row items-center gap-2 justify-between text-sm md:text-base'
                  key={index}>
                  <span className='bg-marrom rounded-full w-6 h-6 flex items-center justify-center text-branco font-semibold'>
                    {index + 1}
                  </span>
                  <p className='truncate w-2/5 text-center md:text-left'>{user.email}</p>
                  <span className='bg-amarelo rounded-full w-6 h-6 flex items-center justify-center text-marrom font-semibold'>
                    {user.streakDays}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
