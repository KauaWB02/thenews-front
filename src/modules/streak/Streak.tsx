import Calendar from './components/calendar/Calendar';
import { useEffect, useState } from 'react';
import { StreakInterface } from './interfaces/streak';
import { WeekInterface } from './interfaces/week';
import { getObject } from '../../store/storage';
import { UserInterface } from '../authentication/interfaces/user.interface';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import api from '../../services/apiService';
import { FaCheck } from 'react-icons/fa6';

dayjs.locale('pt-br');
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const Streak = () => {
  const [streakData, setStreakData] = useState<StreakInterface[]>([]);
  const [streakWeek, setStreakWeek] = useState<WeekInterface[]>([]);
  const [user, setUser] = useState<UserInterface>();

  const frasesMotivacionais = [
    'Cada leitura é um passo a mais para o sucesso. Continue!',
    'A próxima ideia genial pode estar na próxima linha!',
    'Saber mais hoje, vencer mais amanhã!',
    'O hábito de ler transforma seu futuro. Não pare!',
    'Pequenos aprendizados diários geram grandes resultados!',
    'Uma boa leitura pode mudar o seu dia. Continue!',
    'Quem lê, cresce. Quem cresce, conquista!',
    'A cada newsletter lida, você se torna mais sábio!',
    'Persistência na leitura é progresso na vida!',
    'O conhecimento está nas palavras. Leia mais, conquiste mais!',
  ];

  const [frase, setFrase] = useState<string>('');

  // Gera uma frase aleatória quando o componente for montado
  useEffect(() => {
    gerarNovaFrase();
  }, []);

  function gerarNovaFrase() {
    const novaFrase = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
    setFrase(novaFrase);
  }

  useEffect(() => {
    setUser(getObject('user'));

    api.get('/streak').then((result) => {
      setStreakData(result.data);
    });
  }, []);

  useEffect(() => {
    if (streakData.length === 0) return;

    const startOfWeek = dayjs().startOf('week');

    const week = Array.from({ length: 7 }, (_, index) => {
      const date = startOfWeek.add(index, 'day');
      const formattedDate = date.format('YYYY-MM-DD');

      return {
        day: weekDays[index],
        date: date.date(),
        completed: streakData.some((s) => s.openedDate.startsWith(formattedDate)),
      };
    });

    setStreakWeek(week as WeekInterface[]);
  }, [streakData]);

  return (
    <div className='flex flex-col h-full justify-center bg-black-500 pb-4 pt-7 gap-8 px-4 md:px-8'>
      {/* Número de dias de streak */}
      <div className='flex justify-center'>
        <p
          className='relative text-6xl md:text-9xl font-bold font-rubik text-transparent bg-clip-text 
                     bg-gradient-to-r from-yellow-400 to-orange-600 
                     drop-shadow-[0px_0px_20px_rgba(255,165,0,0.8)]'>
          {user ? user.streakDays : 0}
        </p>
      </div>

      {/* Semana (responsiva) */}
      <div className='flex justify-center'>
        <div className='grid grid-cols-7 gap-2 md:gap-4'>
          {streakWeek.map((day, index) => (
            <div key={index} className='flex flex-col items-center text-sm font-medium w-12 md:w-14'>
              <span className='text-gray-500'>{day.day}</span>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full  
                  text-md font-bold transition-all ${
                    day.completed
                      ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md'
                      : 'border border-gray-300 text-gray-400'
                  }`}>
                {day.completed ? (
                  <span className='text-green-500'>
                    <FaCheck />
                  </span>
                ) : (
                  day.date
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frase Motivacional */}
      <div className='flex justify-center text-center px-4'>
        <p className='text-white text-sm md:text-base'>{frase}</p>
      </div>

      {/* Calendário responsivo */}
      <div className='flex justify-center overflow-x-auto max-w-full'>
        <Calendar streakData={streakData} />
      </div>
    </div>
  );
};

export default Streak;
