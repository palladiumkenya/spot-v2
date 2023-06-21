import {
	Box,
} from '@mui/material';
import Chart from 'react-apexcharts';

const IndicatorMetrics = () => {
	let series = [
		{
			name: 'EMR',
			type: 'bar',
			data: [44, 55, 57, 56, 61, 58, 63, 60],
		},
		{
			name: 'DWH',
			type: 'bar',
			data: [76, 85, 101, 98, 87, 105, 91, 23],
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
			},
		},
		dataLabels: {
			enabled: true,
			enabledOnSeries: true,
			formatter: function (val) {
				return val;
			},
			style: {
				fontSize: '12px',
			},
		},
		xaxis: {
			categories: [
				'HTS TESTED',
				['HTS TESTED', 'POS'],
				'HTS INDEX',
				['HTS INDEX', 'POS'],
				'TX NEW',
				'TX CURR',
				['RETENTION', 'ON ART', '12 MONTHS'],
				['RETENTION', 'ON ART VL', '1000 12 MONTHS'],
			],
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
				formatter: function (val) {
					return val;
				},
			},
		},
	};

	return (
		<Box width="100%">
			<Chart options={options} series={series} type="bar" width="100%" />
		</Box>
	);
};

export default IndicatorMetrics;
