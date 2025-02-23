import { useEffect, useState } from 'react';
import { StreakInterface } from '../../interfaces/streak';
import { MonthDaysInterface } from '../../interfaces/month-days';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface CalendarProps {
  streakData: StreakInterface[];
}

const Calendar = ({ streakData }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [monthDays, setMonthDays] = useState<MonthDaysInterface[]>([]);

  useEffect(() => {
    generateMonthDays();
  }, [streakData, currentMonth]);

  const generateMonthDays = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const totalDays = endOfMonth.date();
    const firstDayOfWeek = startOfMonth.day(); // 0 = Domingo

    const daysArray = [];

    // Preencher os espaços antes do primeiro dia
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= totalDays; i++) {
      const date = startOfMonth.date(i);
      const formattedDate = date.format('YYYY-MM-DD');

      daysArray.push({
        date: formattedDate,
        number: i,
        completed: streakData.some((s) => s.openedDate.startsWith(formattedDate)),
        isToday: date.isSame(dayjs(), 'day'),
      });
    }

    setMonthDays(daysArray as MonthDaysInterface[]);
  };

  return (
    <div className='w-full max-w-md bg-gray-900 text-white p-4 rounded-lg shadow-lg'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <button onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
          <SlArrowLeft />
        </button>
        <h2 className='text-lg font-bold'>{currentMonth.format('MMMM [de] YYYY')}</h2>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
          <SlArrowRight />
        </button>
      </div>

      {/* Dias da Semana */}
      <div className='grid grid-cols-7 gap-2 text-center text-gray-400 mb-2'>
        {weekDays.map((day, index) => (
          <span
            key={index}
            className='text-sm font-bold'>
            {day}
          </span>
        ))}
      </div>

      {/* Calendário */}
      <div className='grid grid-cols-7 gap-2'>
        {monthDays.map((day, index) =>
          day ? (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-md transition-all ${
                day.completed
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md'
                  : day.isToday
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}>
              {day.number}
            </div>
          ) : (
            <div
              key={index}
              className='w-10 h-10'></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
