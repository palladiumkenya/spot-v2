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
	Tooltip,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

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
		'& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
	},
}));

const extractsList = [
	{
		name: 'All Patients',
		date: '18 january, 2019',
		received: 673,
		expected: 1283,
		progress: <LinearProgressWithLabel color="error" value={44} />,
	},
	{
		name: 'ART Patients',
		date: '10 january, 2019',
		received: 243,
		expected: 512,
		progress: <LinearProgressWithLabel value={66} />,
	},
	{
		name: 'Patient Baselines',
		date: '8 january, 2019',
		received: 1900,
		expected: 1800,
		progress: <LinearProgressWithLabel value={90} />,
	},
	{
		name: 'Patient Status',
		date: '1 january, 2019',
		received: 401,
		expected: 401,
		progress: <LinearProgressWithLabel color="success" value={100} />,
	},
	{
		name: 'Patient Labs',
		date: '1 january, 2019',
		received: 90,
		expected: 1500,
		progress: (
			<Tooltip disableTouchListener title="Received: 0/ Expected: 1200">
				<LinearProgressWithLabel value={3} />
			</Tooltip>
		),
	},
	{
		name: 'Patient Pharmacy',
		date: '1 january, 2019',
		received: 0,
		expected: 1200,
		progress: <LinearProgressWithLabel value={0} color="primary" />,
	},
];

const Extracts = () => {
	return (
		<Box width="100%" overflow="auto">
			<StyledTable>
				<TableHead>
					<TableRow>
						<TableCell align="left">Metric</TableCell>
						<TableCell align="center">Progress</TableCell>
						<TableCell align="center">Status Date</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{extractsList.map((extract, index) => (
						<TableRow key={index}>
							<TableCell align="left">{extract.name}</TableCell>
							<Tooltip
								disableTouchListener
								placement="bottom"
								title={`Received: ${extract.received}/ Expected: ${extract.expected}`}
								followCursor
							>
								<TableCell align="center">{extract.progress}</TableCell>
							</Tooltip>
							<TableCell align="center">{extract.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</StyledTable>
		</Box>
	);
};

export default Extracts;
