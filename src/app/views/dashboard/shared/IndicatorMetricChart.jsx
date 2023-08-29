import { Box } from '@mui/material';
import Chart from 'react-apexcharts';

const IndicatorMetricChart = ({ data }) => {
	let series = [
		{
			name: 'EMR',
			type: 'bar',
			data: [data?.emr_values],
		},
		{
			name: 'DWH',
			type: 'bar',
			data: [data?.dwh_values] ?? [],
		},
	];
	let options = {
		chart: {
			type: 'bar',
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '75%',
				dataLabels: {
					position: 'top', // top, center, bottom
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (val) {
				return val;
			},
			offsetY: -20,
			style: {
				fontSize: '12px',
				colors: ['#555555'],
			},
		},
		xaxis: {
			categories: [data?.names],
			labels: {
				rotate: 0,
			},
		},
		yaxis: {
			title: {
				text: 'NUMBER OF PATIENTS',
			},
		},
		fill: {
			opacity: 1,
		},
		responsive: [
			{
				breakpoint: undefined,
				options: {},
			},
		],
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: function (val, { seriesIndex, dataPointIndex, w }) {
					if (seriesIndex === 0) {
						return `${val} AS OF ${data.emr_dates}`;
					} else if (val === null) {
						return val;
					} else if (seriesIndex === 1) {
						return `${val} AS OF ${data.dwh_dates}`;
					}
				},
			},
		},
	};

	return (
		<Box width="100%">
			<small style={{ color: '#9699a2' }}>{`${data.names} - ${data.defn}`}</small>
			<Chart options={options} series={series} type="bar" width="100%" />
		</Box>
	);
};

export default IndicatorMetricChart;
