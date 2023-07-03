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

const Extracts = ({ list = [] }) => {
	console.log(list);
	return (
		<Box width="100%" overflow="auto">
			<StyledTable>
				<TableHead>
					<TableRow>
						<TableCell align="left">Extract</TableCell>
						<TableCell align="center">Progress</TableCell>
						<TableCell align="center">Status Date</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{list?.documents?.map((extract, index) => (
						<TableRow key={index}>
							<TableCell align="left">{extract.extract_display_name}</TableCell>
							<Tooltip
								disableTouchListener
								placement="bottom"
								title={`Received: ${extract.received}/ Expected: ${extract.expected}`}
								followCursor
							>
								<TableCell align="center">{extract.progress}</TableCell>
							</Tooltip>
							<TableCell align="center">
								{new Date(extract.updated_at).toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</StyledTable>
		</Box>
	);
};

export default Extracts;
