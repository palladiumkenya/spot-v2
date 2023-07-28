import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Loading from 'app/components/MatxLoading';
import useFacilityMetrics from 'app/hooks/useFacilityMetrics';

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
			},
		},
	},
}));

const extractsList = [
	{
		metric: 'DWAPI Version',
		value: '3.1.0.0',
		description: 'DWAPI Version',
	},
	{
		metric: 'EMR',
		value: 'KenyaEMR',
		description: 'EMR',
	},
	{
		metric: 'EMR Version',
		value: '17.9.1',
		description: 'EMR Version',
	},
];

const FacilityMetrics = () => {
	const { metrics } = useFacilityMetrics();
	console.log(metrics);
	return (
		<Box width="100%" overflow="auto">
			{metrics === undefined ? (
				<Loading />
			) : (
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="left">Metric</TableCell>
							<TableCell align="center">Value</TableCell>
							<TableCell align="center">Description</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{metrics.map((extract, index) => (
							<TableRow key={index}>
								<TableCell align="left">{extract.metric}</TableCell>
								<TableCell align="center">{extract.value}</TableCell>
								<TableCell align="center">{extract.metric}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</StyledTable>
			)}
		</Box>
	);
};

export default FacilityMetrics;
