import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTooltipOptions, ChartTooltipItem } from 'chart.js';

import { Event } from '../../store/types';
import { getVisitsDataByDay } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Daily Visits Tracking',
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
        },
        gridLines: {
          borderDash: [1, 3],
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
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
        backgroundColor: 'rgba(192,75,134,0.2)',
        borderColor: 'rgba(192,75,134,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(192,75,134,0.4)',
        hoverBorderColor: 'rgba(192,75,134,1)',
        data: collapsedData.map(event => event.visits)
      }
    ]
  };

  const toolTipOptions: ChartTooltipOptions = {
    displayColors: false,
    callbacks: {
      label: function(tooltipItem: ChartTooltipItem) {
        let index = tooltipItem.index ? tooltipItem.index : 0;
        let datapoint = collapsedData[index];
        return datapoint.notes;
      }
    }
  };

  return (
    <Bar
      data={chartData}
      options={{ ...chartOptions, tooltips: { ...toolTipOptions } }}
    />
  );
};

export default VisitsBar;
