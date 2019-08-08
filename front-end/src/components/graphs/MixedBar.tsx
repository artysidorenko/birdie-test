import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTooltipOptions, ChartTooltipItem } from 'chart.js';

import { Medication, PadCondition } from '../../store/types';
import { getMedicationDataByWeek, getPadDataByWeek } from '@App/utils';

const chartOptions: ChartOptions = {
  title: {
    display: true,
    text: 'Hygiene and Care Tracking',
    position: 'top',
    fontSize: 20
  },
  maintainAspectRatio: false,
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    yAxes: [
      {
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: true
        },
        ticks: {
          beginAtZero: true,
          max: 30
        },
      }
    ]
  }
};

const MedicationBar = ({ medData, padData }: { medData: Medication[], padData: PadCondition[] }) => {
  const collapsedMedData = getMedicationDataByWeek(medData);
  const collapsedPadData = getPadDataByWeek(padData);

  const chartData: ChartData = {
    labels: collapsedMedData.map(event => `Week ${event.week}`),
    datasets: [
      {
        label: 'Missed Medication',
        type: 'bar',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: collapsedMedData.map(event => event.missed),
        yAxisID: 'y-axis-1'
      },
      {
        label: 'Pad - Soiled',
        type: 'line',
        backgroundColor: 'rgba(192,75,134,0.2)',
        borderColor: 'rgba(192,75,134,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(192,75,134,0.4)',
        hoverBorderColor: 'rgba(192,75,134,1)',
        data: collapsedPadData.map(event => event.soiled),
        yAxisID: 'y-axis-1'
      },
      {
        label: 'Pad - Wet',
        type: 'line',
        backgroundColor: 'rgba(192,134,75,0.2)',
        borderColor: 'rgba(192,134,75,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(192,134,75,0.4)',
        hoverBorderColor: 'rgba(192,134,75,1)',
        data: collapsedPadData.map(event => event.wet),
        yAxisID: 'y-axis-1'
      }
    ]
  };

  const toolTipOptions: ChartTooltipOptions = {
    displayColors: false,
    callbacks: {
      label: function(tooltipItem: ChartTooltipItem) {
        let index = tooltipItem.index ? tooltipItem.index : 0;
        let datapoint = collapsedMedData[index];
        return [
          `# of Misses: ${datapoint.missed}`,
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

export default MedicationBar;
