import { useEffect, useState } from 'react';
import api from '../../../../services/apiService';
import { ChartStateInterface } from '../../interfaces/dashboard.interface';
import { DashboardEngagementByStreakStatusInterface } from './interfaces/dashboard-engagement-by-streak-status.interface';
import ChartPieComponent from '../../../../components/chartPie/ChartPie';

interface EngagementByStreakProps {
  startDate: string;
  endDate: string;
  status: string;
}

const EngagementbyStatusStreak = ({ endDate, startDate, status }: EngagementByStreakProps) => {
  const [chartData, setChartData] = useState<ChartStateInterface>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    api
      .get<{ dashboard: DashboardEngagementByStreakStatusInterface[] }>(
        `/dashboard/engagement-by-streak-status?startDate=${startDate}&endDate=${endDate}&status=${status}`
      )
      .then((response) => {
        const data = response.data.dashboard;

        const labels = data.map((item) => item.streak);
        const values = data.map((item) => item.totalOpenings);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Engajamento por Streak',
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              borderWidth: 1,
            },
          ],
        });
      });
  }, [endDate, startDate, status]);

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
        text: 'Quantidade aberturas de newsletters cada categoria de streak',
        color: '#fff',
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        display: false,
        ticks: { color: '#fff', maxRotation: 0, minRotation: 0 },
      },
      y: {
        display: false,
        beginAtZero: true,
        ticks: { color: '#fff' },
      },
    },
  };
  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-lg p-4 w-full md:w-full lg:w-full h-auto md:h-80 max-w-full md:max-w-6xl mx-auto px-4 md:px-4'>
      <ChartPieComponent
        chartData={chartData}
        options={options}
      />
    </div>
  );
};

export default EngagementbyStatusStreak;
