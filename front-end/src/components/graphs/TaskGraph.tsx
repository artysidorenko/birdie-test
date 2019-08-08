import * as React from 'react';
import { Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTooltipOptions, ChartTooltipItem } from 'chart.js';

import { Task } from '../../store/types';
import { getTaskData } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Relative Distribution of Assistance Tasks',
    position: 'top',
    fontSize: 20
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  }
};

const TaskGraph = ({ data }: { data: Task[] }) => {
  const collapsedData = getTaskData(data);

  const chartData: ChartData = {
    labels: collapsedData.map(e => e.task),
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: collapsedData.map(e => e.count).sort()
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
    <Radar
      data={chartData}
      options={{ ...chartOptions, tooltips: { ...toolTipOptions } }}
    />
  );
};

export default TaskGraph;
