import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { useEffect, useState } from 'react';
import api from '../../../../services/apiService';
import { DashboardMonthlyMetricsInterface } from './interfaces/dashboard-monthly-metrics.interface';
import { ChartStateInterface } from '../../interfaces/dashboard.interface';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.animation = false;

interface NewsletterOpeningsPerMonth {
  startDate: string;
  endDate: string;
  status: string;
}

const ChartBar = ({ startDate, endDate, status }: NewsletterOpeningsPerMonth) => {
  const [chartData, setChartData] = useState<ChartStateInterface>({
    labels: [],
    datasets: [],
  });

  const fullMonths = [
    { num: '01', name: 'Jan' },
    { num: '02', name: 'Fev' },
    { num: '03', name: 'Mar' },
    { num: '04', name: 'Abr' },
    { num: '05', name: 'Mai' },
    { num: '06', name: 'Jun' },
    { num: '07', name: 'Jul' },
    { num: '08', name: 'Ago' },
    { num: '09', name: 'Set' },
    { num: '10', name: 'Out' },
    { num: '11', name: 'Nov' },
    { num: '12', name: 'Dez' },
  ];
  useEffect(() => {
    api
      .get<{ dashboard: DashboardMonthlyMetricsInterface[] }>(
        `/dashboard/newsletters-opened-for-month?startDate=${startDate}&endDate=${endDate}&status=${status}`
      )
      .then((response) => {
        const dataMap = new Map(
          response.data.dashboard.map((item) => [item.month, item.totalOpenings])
        );

        const formattedData = fullMonths.map(({ num, name }) => ({
          label: name,
          value: dataMap.get(num) || 0,
        }));

        const values = formattedData.map((item) => item.value);

        setChartData({
          labels: formattedData.map((item) => item.label),
          datasets: [
            {
              label: 'Aberturas de Newsletters',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      });
  }, [startDate, endDate, status]);

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
        text: 'Aberturas de Newsletters por mês',
        color: '#fff',
        font: { size: 16 },
      },
    },
    scales: {
      x: { ticks: { color: '#fff' }, beginAtZero: true },
      y: { ticks: { color: '#fff' }, beginAtZero: true },
    },
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-lg p-4 w-full md:w-full lg:w-full h-auto md:h-80 max-w-full md:max-w-6xl mx-auto px-4 md:px-4'>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default ChartBar;
