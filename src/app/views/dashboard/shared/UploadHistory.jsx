import useUploadHistory from 'app/hooks/useUploadHistory';
import { Fragment } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import Loading from './../../../components/MatxLoading';
import { Box } from '@mui/material';

const MonthYear = () => {
	// Generate the short month name and short year for the last 12 months
	const last12Months = [];
	for (let i = 0; i < 12; i++) {
		const monthYear = moment().subtract(i, 'months').format('MMM YY');
		last12Months.unshift(monthYear); // Use unshift to maintain the correct order
	}

	return last12Months;
};

let ChartArray = (data, dates) => {
	// Group the data by year and month
	const groupedData = data?.reduce((result, item) => {
		const monthYear = moment(item.log_date).format('MMM YY');
		if (!result[monthYear]) {
			result[monthYear] = [];
		}
		result[monthYear].push(item);
		return result;
	}, {});

	const latestValues = dates.map((monthYear) => {
		const dataForMonth = groupedData[monthYear];
		if (dataForMonth) {
			const latestData = dataForMonth.reduce((latest, item) => {
				return moment(item.log_date).isAfter(moment(latest.log_date)) ? item : latest;
			});
			return latestData.received;
		}
		return null;
	});

	return latestValues;
};

const UploadHistory = () => {
	const { history } = useUploadHistory();
	const last12Months = MonthYear();

	const groupedDataByDocket = history?.reduce((result, item) => {
		const { received, log_date, docket } = item;
		if (!result[docket]) {
			result[docket] = {
				history: [],
			};
		}
		result[docket].history.push({ received, log_date, docket });
		return result;
	}, {});
	let NDWH = ChartArray(groupedDataByDocket?.NDWH?.history ?? [], last12Months);
	let PREP = ChartArray(groupedDataByDocket?.PREP?.history ?? [], last12Months);
	let MNCH = ChartArray(groupedDataByDocket?.MNCH?.history ?? [], last12Months);
	let HTS = ChartArray(groupedDataByDocket?.HTS?.history ?? [], last12Months);

	const options = {
		chart: {
			id: 'basic-bar',
		},
		xaxis: {
			categories: MonthYear(),
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
			data: NDWH,
		},
		{
			name: 'PREP',
			data: PREP,
		},
		{
			name: 'HTS',
			data: HTS,
		},
		{
			name: 'MNCH',
			data: MNCH,
		},
	];

	return (
		<Box width={'100%'}>
			{history === undefined ? (
				<Loading />
			) : (
				<Chart options={options} series={series} type="line" height={'450px'} />
			)}
		</Box>
	);
};

export default UploadHistory;
