import { useEffect, useState } from 'react';

import api from '../../../../services/apiService';
import { DashboardDayAndHoursArrayInterface } from './interface/dashboard-day-and-hours-arrays.interface';
import { ChartStateInterface } from '../../interfaces/dashboard.interface';
import ChartLineComponent from '../../../../components/chartline/ChartLine';

interface OpeningsByTime {
  startDate: string;
  endDate: string;
  status: string;
}

const ChartLine = ({ endDate, startDate, status }: OpeningsByTime) => {
  const [chartData, setChartData] = useState<ChartStateInterface>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    api
      .get<{ dashboard: DashboardDayAndHoursArrayInterface[] }>(
        `/dashboard/day-and-hour-arrays?startDate=${startDate}&endDate=${endDate}&status=${status}`
      )
      .then((response) => {
        const data = response.data.dashboard;
        const formattedData: Record<string, number> = {};

        data.forEach(({ hour, totalOpenings }: DashboardDayAndHoursArrayInterface) => {
          const formattedHour = formatHour(hour);
          formattedData[formattedHour] = (formattedData[formattedHour] || 0) + totalOpenings;
        });

        const labels = Object.keys(formattedData);
        const values = Object.values(formattedData);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Aberturas por Horário',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 4,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do gráfico:', error);
      });
  }, [endDate, startDate, status]);

  const formatHour = (hour: string | number) => {
    const hourInt = parseInt(hour.toString());
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
    return `${formattedHour.toString().padStart(2, '0')}:00 ${period}`;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Aberturas de Newsletters por Hora',
        color: '#fff',
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff', maxRotation: 0, minRotation: 0 }, // Mantém as horas legíveis
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
      },
    },
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-lg p-4 w-full md:w-full lg:w-full h-auto md:h-80 max-w-full md:max-w-6xl mx-auto px-4 md:px-4'>
      {chartData.datasets.length > 0 ? (
        <ChartLineComponent
          chartData={chartData}
          options={options}
        />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default ChartLine;
