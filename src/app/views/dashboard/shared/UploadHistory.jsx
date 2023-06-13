import { Fragment } from 'react';
import Chart from 'react-apexcharts';

const UploadHistory = () => {
	const options = {
		chart: {
			id: 'basic-bar',
		},
		xaxis: {
			categories: [
				'22-JUN',
				'22-JUL',
				'22-AUG',
				'22-SEP',
				'22-OCT',
				'22-NOV',
				'22-DEC',
				'23-JAN',
			],
		},
		markers: {
			size: [3],
		},
		stroke: {
			width: 1.7,
		},
	};
	const series = [
		{
			name: 'C&T',
			data: [3000, 4050, 4345, 3450, 4949, 5360, 7009, 9143],
		},
		{
			name: 'PREP',
			data: [null, 2340, 4523, 5430, 4099, 6120, 4270, 8791],
		},
		{
			name: 'HTS',
			data: [4900, 4850, 4945, 3950, 4749, 4360, 4009, 4443],
		},
		{
			name: 'CRS',
			data: [6100, 7050, 6345, null, 6749, 8360, 9209, 7143],
		},
		{
			name: 'MNCH',
			data: [2200, 2050, 2345, 1450, 2749, 2360, null, 3000],
		},
	];

	return (
		<Fragment>
			<Chart options={options} series={series} type="line" height={'450px'} />
		</Fragment>
	);
};

export default UploadHistory;
