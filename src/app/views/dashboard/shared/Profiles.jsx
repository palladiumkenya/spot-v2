import { Box, IconButton, styled, Tooltip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import useProfile from 'app/hooks/useProfiles';
import Loading from 'app/components/MatxLoading';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

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

const getProgressPerc = (ex, re) => {
	return parseInt((re / ex) * 100);
};

const Profiles = () => {
	const { profiles } = useProfile();
	const navigate = useNavigate();

	const handleClick = (param) => {
		const url = `/showcase/${param}`;

		navigate(url);
	};

	const columns = [
		{
			name: 'mfl_code',
			label: 'Code',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'facility',
			label: 'Facility',
			options: {
				filter: true,
				sort: true,
				// Custom cell rendering function
				customBodyRender: (value) => (
					<div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{value}</div>
				),
			},
		},
		{
			name: 'county',
			label: 'County',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'subcounty',
			label: 'Sub-County',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'partner',
			label: 'Partner',
			options: {
				filter: true,
				sort: true,
				// Custom cell rendering function
				customBodyRender: (value) => (
					<div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{value}</div>
				),
			},
		},
		{
			name: 'docket',
			label: 'Docket',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'progress',
			label: 'Progress',
			options: {
				filter: false,
				sort: false,
				download: false,
				customBodyRender: (value) => (
					//   const cellData = data[roIndex][dataindex];
					<Tooltip
						style={{ background: 'red' }}
						disableTouchListener
						placement="bottom"
						title={'the percent means the quantity of data already handled'}
						followCursor
					>
						<span>{value}</span>
					</Tooltip>
				),
			},
		},
		{
			name: 'status',
			label: 'Status',
			options: {
				filter: true,
				sort: true,
				// Custom cell rendering function
				customBodyRender: (value) => (
					<div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{value}</div>
				),
			},
		},
		{
			name: 'updated',
			label: 'Updated',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'action',
			label: '',
			options: {
				filter: false,
				sort: false,
				download: false,
			},
		},
	];

	let data = profiles?.map((prof) => {
		let progress = <LinearProgressWithLabel value={0} />;
		let action = (
			<StyledIconButton onClick={() => handleClick(prof.mfl_code)}>
				<AddIcon />
			</StyledIconButton>
		);
		if (prof.totalExpected > prof.totalReceived) {
			progress = (
				<LinearProgressWithLabel
					value={getProgressPerc(prof.totalExpected, prof.totalReceived)}
				/>
			);
		} else if (prof.totalQueued < prof.totalReceived) {
			progress = (
				<LinearProgressWithLabel
					value={getProgressPerc(prof.totalReceived, prof.totalQueued)}
					color={'secondary'}
				/>
			);
		} else if (prof.totalQueued === prof.totalReceived) {
			progress = (
				<LinearProgressWithLabel
					value={getProgressPerc(prof.totalReceived, prof.totalQueued)}
					color={'success'}
				/>
			);
		}
		let docket = prof?.docket === 'NDWH' ? 'C&T': prof?.docket
		return {
			...prof,
			progress,
			docket,
			updated: new Date(prof.updated).toLocaleString(),
			action,
		};
	});

	const options = {
		filterType: 'multiselect',
		selectableRows: 'none',
		downloadOptions: {
			filterOptions: {
				useDisplayedColumnsOnly: false,
				useDisplayedRowsOnly: true,
			},
		},
		text: 'Loading data...',
		progressClassName: 'custom-progress',
		progressRender: () => <Loading color="primary" />,
	};
	return (
		<Box>
			{!!!profiles ? <Loading /> :
			<MUIDataTable title={'Profiles'} data={data} columns={columns} options={options} />}
		</Box>
	);
};

export default Profiles;
