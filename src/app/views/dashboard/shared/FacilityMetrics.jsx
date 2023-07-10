import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Loading from 'app/components/MatxLoading';

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
	return (
		<Box width="100%" overflow="auto">
			{extractsList === undefined ? (
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
						{extractsList.map((extract, index) => (
							<TableRow key={index}>
								<TableCell align="left">{extract.metric}</TableCell>
								<TableCell align="center">{extract.value}</TableCell>
								<TableCell align="center">{extract.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</StyledTable>
			)}
		</Box>
	);
};

export default FacilityMetrics;
