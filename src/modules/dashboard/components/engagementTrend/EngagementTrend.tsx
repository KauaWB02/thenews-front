import { useEffect, useState } from 'react';
import api from '../../../../services/apiService';
import { EngagementTrendInterface } from './interfaces/dashboard-engagement-trend';
import ChartLineComponent from '../../../../components/chartline/ChartLine';
import { ChartData, ChartOptions } from 'chart.js';

interface EngagementTrendChartProps {
  startDate: string;
  endDate: string;
  status: string;
}

const EngagementTrendChart = ({ startDate, endDate, status }: EngagementTrendChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);

  const fetchData = () => {
    api
      .get<{ dashboard: EngagementTrendInterface[] }>(
        `dashboard/engagement-trend?startDate=${startDate}&endDate=${endDate}&status=${status}`
      )
      .then((response) => {
        const data = response.data.dashboard;

        const labels = data.map((item: EngagementTrendInterface) => item.day);
        const values = data.map((item: EngagementTrendInterface) => item.totalOpenings);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Aberturas de Newsletters',
              data: values,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.3,
            },
          ],
        });
      })
      .catch((error) => console.error('Erro ao buscar dados', error));
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, status]);

  if (!chartData) return <p>Carregando...</p>;

  const options: ChartOptions<'line'> = {
    responsive: true,
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
        text: 'Aberturas de Newsletters por dia',
        color: '#fff',
        font: { size: 16 },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Data', color: '#fff' }, ticks: { color: '#fff' } },
      y: {
        title: { display: true, text: 'Aberturas', color: '#fff' },
        ticks: { color: '#fff' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-4 w-full md:w-full lg:w-full h-auto md:h-80 max-w-full md:max-w-6xl mx-auto px-4 md:px-4">
      <ChartLineComponent chartData={chartData} options={options} />
    </div>
  );
};

export default EngagementTrendChart;
