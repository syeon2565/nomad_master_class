import React from 'react';
import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { fetchCoinHistory } from './api';
import isDarkAtom from '../atoms';

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
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
            theme: { mode: isDark ? 'dark' : 'light' },
            chart: { background: 'transparent', height: 500, width: 500, toolbar: { show: false } },
            grid: { show: false },
            stroke: { curve: 'smooth', width: 4 },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close) ?? [],
            },
            yaxis: { show: false },
            fill: { type: 'gradient', gradient: { gradientToColors: ['blue'], stops: [0, 100] }, colors: ['red'] },
            tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
