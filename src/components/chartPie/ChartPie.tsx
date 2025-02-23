import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, ArcElement, LinearScale, Title, Tooltip, Legend);

ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.animation = false;

interface ChartPieProps {
  options: ChartOptions<'pie'>;
  chartData: ChartData<'pie'>;
}

const ChartPieComponent: React.FC<ChartPieProps> = ({ options, chartData }) => {
  return (
    <Pie
      data={chartData}
      options={options}
    />
  );
};

export default ChartPieComponent;
