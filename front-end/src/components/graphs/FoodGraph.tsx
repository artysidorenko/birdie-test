import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartDataSets, ChartOptions, ChartTooltipOptions, ChartTooltipItem } from 'chart.js';

import { FoodIntake } from '../../store/types';
import { getFoodDataByDay } from '@App/utils';

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
    text: 'Food Intake Chart',
    position: 'left',
    fontSize: 20
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          borderDash: [1, 3],
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          borderDash: [1, 3],
        }
      }
    ]
  }
};

const FoodGraph = ({ data }: {data: FoodIntake[]}) => {

  const collapsedFoodData = getFoodDataByDay(data);

  const chartData: ChartData = {
    labels: collapsedFoodData.map(event => event.day),
    datasets: [
      {
        ...sharedDatasetOptions,
        label: 'Meals Per Day',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: collapsedFoodData.map(event => event.meals)
      },
      {
        ...sharedDatasetOptions,
        label: 'Snacks Per Day',
        backgroundColor: 'rgba(192,75,134,0.4)',
        borderColor: 'rgba(192,75,134,1)',
        pointBorderColor: 'rgba(192,75,134,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(192,75,134,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: collapsedFoodData.map(event => event.snacks)
      }
    ]
  };

  const toolTipOptions: ChartTooltipOptions = {
    displayColors: false,
    callbacks: {
      label: function(tooltipItem: ChartTooltipItem) {
        let index = tooltipItem.index ? tooltipItem.index : 0;
        let datapoint = collapsedFoodData[index];
        return datapoint.notes;
      }
    }
  };

  return (
    <Line
      data={chartData}
      options={{ ...chartOptions, tooltips: { ...toolTipOptions } }}
    />
  );
};

export default FoodGraph;
