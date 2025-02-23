import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.animation = false;

interface ChartPieProps {
  options: ChartOptions<'line'>;
  chartData: ChartData<'line'>;
}

const ChartLineComponent = ({ chartData, options }: ChartPieProps) => {
  return (
    <Line
      data={chartData}
      options={options}
    />
  );
};

export default ChartLineComponent;
