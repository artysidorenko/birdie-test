import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

import { Event } from '../../store/types';
import { getVisitsDataByDay } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Number of Daily Visits',
    position: 'top',
    fontSize: 20
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: 10
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

const VisitsBar = ({ data }: { data: Event[] }) => {
  const collapsedData = getVisitsDataByDay(data);

  const chartData: ChartData = {
    labels: collapsedData.map(event => event.day),
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: collapsedData.map(event => event.visits)
      }
    ]
  };

  return (
    <Bar
      data={chartData}
      options={chartOptions}
    />
  );
};

export default VisitsBar;
