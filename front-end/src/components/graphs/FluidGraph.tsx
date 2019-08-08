import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js';

import { FluidIntake } from '../../store/types';
import { getFluidDataByDay } from '@App/utils';

const sharedDatasetOptions: ChartDataSets = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 9,
  pointHoverBorderWidth: 2,
  pointRadius: 3,
  pointHitRadius: 10
};

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Fluid Intake Chart',
    position: 'left',
    fontSize: 20
  },
  maintainAspectRatio: false
};

const FluidGraph = ({ data }: {data: FluidIntake[]}) => {

  const collapsedFluidData = getFluidDataByDay(data);

  const chartData: ChartData = {
    labels: collapsedFluidData.map(event => event.day),
    datasets: [
      {
        ...sharedDatasetOptions,
        label: 'Total Fluid Intake (ml)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: collapsedFluidData.map(event => event.total)
      },
      {
        ...sharedDatasetOptions,
        label: 'Regular (ml)',
        backgroundColor: 'rgba(192,75,134,0.4)',
        borderColor: 'rgba(192,75,134,1)',
        pointBorderColor: 'rgba(192,75,134,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(192,75,134,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: collapsedFluidData.map(event => event.regular)
      },
      {
        ...sharedDatasetOptions,
        label: 'Caffeinated (ml)',
        backgroundColor: 'rgba(192,134,75,0.4)',
        borderColor: 'rgba(192,134,75,1)',
        pointBorderColor: 'rgba(192,134,75,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(192,134,75,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: collapsedFluidData.map(event => event.caffeinated)
      }
    ]
  };

  return (
    <Line data={chartData} options={chartOptions} />
  );
};

export default FluidGraph;
