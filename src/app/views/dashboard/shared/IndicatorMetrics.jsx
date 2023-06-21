import {
	Box,
	Icon,
	IconButton,
	styled,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts';

const LinearProgressWithLabel = (props) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

const StyledTable = styled(Table)(({ theme }) => ({
	whiteSpace: 'pre',
	'& thead': {
		'& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
	},
	'& tbody': {
		'& tr': {
			'& td': {
				paddingLeft: 0,
				textTransform: 'capitalize',
				whiteSpace: 'normal',
				wordWrap: 'break-word',
			},
		},
	},
}));

const extractsList = [
	{
		indicator: 'HTS TESTED',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 30,
		dwh_value: 30,
		description:
			'Individuals who received a HIV test. Computation : Count of all individuals who received HIV Testing Services (HTS) and received their test results in a given month',
	},
	{
		indicator: 'HTS TESTED POS',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 10,
		dwh_value: 10,
		description:
			'Individuals who tested positive during a HIV test. Computation: Count of all individuals with a positive in a given month',
	},
	{
		indicator: 'HTS INDEX',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 4,
		dwh_value: 3,
		description:
			'Individuals who were identified and tested using Index Testing Services (PNS or contact tracing) and received their results. Computation: Count of all individuals identified and tested using Index Testing Services in a given month',
	},
	{
		indicator: 'HTS INDEX POS',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 2,
		dwh_value: 2,
		description:
			'Individuals who tested positive using Index Testing Services (PNS or contact tracing) and received their results . Computation: Count of individuals who tested positive using Index Testing Services in a given month',
	},
	{
		indicator: 'TX NEW',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 6,
		dwh_value: 6,
		description:
			'Individuals newly enrolled on antiretroviral therapy (ART). Computation: Count of individuals newly initiated on ART in a given month',
	},
	{
		indicator: 'TX CURR',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 298,
		dwh_value: 301,
		description:
			'Individuals currently receiving antiretroviral therapy (ART). Computation: Count of individuals receiving ART as at end of a given month',
	},
	{
		indicator: 'RETENTION ON ART 12 MONTHS',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 12,
		dwh_value: 10,
		description:
			'Individuals who are still alive and on ART 12 months after initiating treatment. : Count individuals newly initiated on ART 12 months prior',
	},
	{
		indicator: 'RETENTION ON ART VL 1000 12 MONTHS',
		emr_date: '31 May 2023',
		dwh_date: '31 May 2023',
		emr_value: 123,
		dwh_value: 123,
		description:
			'Individuals who are suppressed 12 months after initiating treatment. Computation: Count individuals who initiated ART are virally suppressed 12 months after initiating ART',
	},
];
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
				// columnWidth: '65%',
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
			{/* <StyledTable>
				<TableHead>
					<TableRow>
						<TableCell align="left">Indicator Name</TableCell>
						<TableCell align="center">Indicator Description</TableCell>
						<TableCell align="center">EMR Indicator Date</TableCell>
						<TableCell align="center">EMR Value</TableCell>
						<TableCell align="center">NDWH Calculation</TableCell>
						<TableCell align="center">NDWH Date</TableCell>
						<TableCell align="center">Difference</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{extractsList.map((extract, index) => (
						<TableRow key={index}>
							<TableCell align="left">{extract.indicator}</TableCell>
							<TableCell
								align="left"
								style={{
									whiteSpace: 'normal',
									wordBreak: 'break-word',
								}}
							>
								{extract.description}
							</TableCell>
							<TableCell align="center">{extract.emr_date}</TableCell>
							<TableCell align="center">{extract.emr_value}</TableCell>
							<TableCell align="center">{extract.dwh_value}</TableCell>
							<TableCell align="center">{extract.dwh_date}</TableCell>
							<TableCell align="center">
								{Math.abs(extract.dwh_value - extract.emr_value)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</StyledTable> */}
		</Box>
	);
};

export default IndicatorMetrics;
