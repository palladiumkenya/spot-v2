import { Grid } from '@mui/material';
import Loading from 'app/components/MatxLoading';
import useIndicatorMetrics from 'app/hooks/useIndicatorMetrics';
import IndicatorMetricChart from './IndicatorMetricChart';

// This function rearranges the data
const rearrangeData = (data, order) => {
	let rearrangedData = [];

	order.forEach((item) => {
		let name = typeof item.name === 'string' ? item.name : item[0]?.name;
		let index = data?.names.indexOf(name);
		let dataObject = {};

		dataObject.dwh_values = index !== -1 ? data?.dwh_values[index] : null;
		dataObject.emr_values = index !== -1 ? data?.emr_values[index] : null;
		dataObject.names = name;
		dataObject.defn = item.defn;
		dataObject.dwh_dates =
			index !== -1 ? new Date(data?.dwh_dates[index]).toDateString() : null;
		dataObject.emr_dates =
			index !== -1 ? new Date(data?.emr_dates[index]).toDateString() : null;
		rearrangedData.push(dataObject);
	});

	return rearrangedData;
};

const IndicatorMetrics = () => {
	const { metrics } = useIndicatorMetrics();

	let order = [
		{
			name: 'HTS_TESTED',
			defn: 'Individuals who received a HIV test. Computation : Count of all individuals who received HIV Testing Services (HTS) and received their test results in a given month',
		},
		{
			name: 'HTS_TESTED_POS',
			defn: 'Individuals who tested positive during a HIV test. Computation: Count of all individuals with a positive in a given month',
		},
		{
			name: 'HTS_INDEX',
			defn: 'Individuals who were identified and tested using Index Testing Services (PNS or contact tracing) and received their results. Computation: Count of all individuals identified and tested using Index Testing Services in a given month',
		},
		{
			name: 'HTS_INDEX_POS',
			defn: '	Individuals who tested positive using Index Testing Services (PNS or contact tracing) and received their results . Computation: Count of individuals who tested positive using Index Testing Services in a given month',
		},
		{
			name: 'TX_NEW',
			defn: 'Individuals newly enrolled on antiretroviral therapy (ART). Computation: Count of individuals newly initiated on ART in a given month',
		},
		{
			name: 'TX_CURR',
			defn: 'Individuals currently receiving antiretroviral therapy (ART). Computation: Count of individuals receiving ART as at end of a given month',
		},
		{
			name: 'RETENTION_ON_ART_12_MONTHS',
			defn: 'Individuals who are still alive and on ART 12 months after initiating treatment. : Count individuals newly initiated on ART 12 months prior',
		},
		{
			name: 'RETENTION_ON_ART_VL_1000_12_MONTHS',
			defn: 'Individuals who are suppressed 12 months after initiating treatment. Computation: Count individuals who initiated ART are virally suppressed 12 months after initiating ART',
		},
	];

	let rearrangedData = rearrangeData(metrics, order);

	return (
		<Grid container spacing={3} alignItems="flex-start">
			{metrics === undefined ? (
				<Loading />
			) : (
				rearrangedData.map((item) => (
					<Grid item xs={12} md={3}>
						<IndicatorMetricChart key={item.names} data={item} />
					</Grid>
				))
			)}
		</Grid>
	);
};

export default IndicatorMetrics;
