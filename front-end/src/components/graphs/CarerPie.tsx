import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

import { Event } from '../../store/types';
import { getCarerData } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Frequency of Visits by the individual Carers',
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
    display: false,
  }
};

const CarerPie = ({ data }: { data: Event[] }) => {
  const collapsedData = getCarerData(data);

  const chartData: ChartData = {
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: collapsedData.map(e => e.visits).sort()
      }
    ]
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default CarerPie;
