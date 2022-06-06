import React from 'react';
import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from './api';

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_clos: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? (
        'Loading chart ...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: { background: 'transparent', height: 500, width: 500, toolbar: { show: false } },
            grid: { show: false },
            stroke: { curve: 'smooth', width: 4 },
            xaxis: { axisTicks: { show: false }, axisBorder: { show: false }, labels: { show: false } },
            yaxis: { show: false },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
