import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTooltipOptions, ChartTooltipItem } from 'chart.js';

import { Mood } from '../../store/types';
import { getMoodDataByWeek } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Weekly Mood Score',
    position: 'top',
    fontSize: 20
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: 100
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

const MoodsBar = ({ data }: { data: Mood[] }) => {
  const collapsedData = getMoodDataByWeek(data);

  const chartData: ChartData = {
    labels: collapsedData.map(event => `Week ${event.week}`),
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: collapsedData.map(event => event.moodScore)
      }
    ]
  };

  const toolTipOptions: ChartTooltipOptions = {
    displayColors: false,
    callbacks: {
      label: function(tooltipItem: ChartTooltipItem) {
        let index = tooltipItem.index ? tooltipItem.index : 0;
        let datapoint = collapsedData[index];
        return [
          `# of Observations: ${datapoint.observations}`,
          `Mood Score: ${Math.round(datapoint.moodScore)}`,
          'Notes:',
          ...datapoint.notes
        ];
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

export default MoodsBar;
