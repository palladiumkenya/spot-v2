import { Box } from '@mui/material';
import Loading from 'app/components/MatxLoading';
import useIndicatorMetrics from 'app/hooks/useIndicatorMetrics';
import Chart from 'react-apexcharts';

// This function rearranges the data
const rearrangeData = (data, order) => {
	let rearrangedData = {
		dwh_values: [],
		emr_values: [],
		names: [],
		dwh_dates: [],
		emr_dates: [],
	};

	order.forEach((item) => {
		let name = typeof item === 'string' ? item : item[0];
		let index = data?.names.indexOf(name);

		rearrangedData.dwh_values.push(index !== -1 ? data?.dwh_values[index] : null);
		rearrangedData.emr_values.push(index !== -1 ? data?.emr_values[index] : null);
		rearrangedData.names.push(name);
		rearrangedData.dwh_dates.push(index !== -1 ? data?.dwh_dates[index] : null);
		rearrangedData.emr_dates.push(index !== -1 ? data?.emr_dates[index] : null);
	});

	return rearrangedData;
};

const IndicatorMetrics = () => {
	const { metrics } = useIndicatorMetrics();

	let order = [
		'HTS_TESTED',
		'HTS_TESTED_POS',
		'HTS_INDEX',
		'HTS_INDEX_POS',
		'TX_NEW',
		'TX_CURR',
		'RETENTION_ON_ART_12_MONTHS',
		'RETENTION_ON_ART_VL_1000_12_MONTHS',
	];

	let rearrangedData = rearrangeData(metrics, order);

	let series = [
		{
			name: 'EMR',
			type: 'bar',
			data: rearrangedData?.emr_values,
		},
		{
			name: 'DWH',
			type: 'bar',
			data: rearrangedData?.dwh_values ?? [],
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
			{metrics === undefined ? (
				<Loading />
			) : (
				<Chart options={options} series={series} type="bar" width="100%" />
			)}
		</Box>
	);
};

export default IndicatorMetrics;
