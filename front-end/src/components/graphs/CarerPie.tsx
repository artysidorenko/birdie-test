import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTooltipOptions, ChartTooltipItem } from 'chart.js';

import { Event } from '../../store/types';
import { getCarerData } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Same-carer Visits',
    position: 'top',
    fontSize: 20
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  }
};

const CarerPie = ({ data }: { data: Event[] }) => {
  const collapsedData = getCarerData(data);
  const sortedData = collapsedData.map(e => e.visits).sort();

  const chartData: ChartData = {
    datasets: [
      {
        backgroundColor: 'rgba(192,134,75,0.2)',
        borderColor: 'rgba(192,134,75,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(192,134,75,0.4)',
        hoverBorderColor: 'rgba(192,134,75,1)',
        data: sortedData
      }
    ]
  };

  const toolTipOptions: ChartTooltipOptions = {
    displayColors: false,
    callbacks: {
      label: function(tooltipItem: ChartTooltipItem) {
        let index = tooltipItem.index ? tooltipItem.index : 0;
        let visits = sortedData[index];
        return `Visits by this carer: ${visits}`;
      }
    }
  };

  return (
    <Pie
      data={chartData}
      options={{ ...chartOptions, tooltips: { ...toolTipOptions } }}
    />
  );
};

export default CarerPie;
