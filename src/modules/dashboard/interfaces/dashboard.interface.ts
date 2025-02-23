export interface ChartDatasetInterface {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth: number;
  tension?: number;
  pointBackgroundColor?: string;
  pointRadius?: number;
}

export interface ChartStateInterface {
  labels: string[];
  datasets: ChartDatasetInterface[];
}
