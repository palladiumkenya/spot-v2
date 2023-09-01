import { Box, IconButton, styled, Tooltip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import useProfile from 'app/hooks/useProfiles';
import Loading from 'app/components/MatxLoading';
import moment from 'moment';

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
				setCellHeaderProps: () => ({
					style: { width: '90px' },
				}),
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
				setCellHeaderProps: () => ({
					style: { width: '200px' },
				}),
			},
		},
		{
			name: 'subcounty',
			label: 'Sub-County',
			options: {
				filter: true,
				sort: true,
				setCellHeaderProps: () => ({
					style: { width: '150px' },
				}),
			},
		},
		{
			name: 'county',
			label: 'County',
			options: {
				filter: true,
				sort: true,
				setCellHeaderProps: () => ({
					style: { width: '150px' },
				}),
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
				setCellHeaderProps: () => ({
					style: { width: '10%' },
				}),
			},
		},
		{
			name: 'agency',
			label: 'Agency',
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value) => (
					<div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{value}</div>
				),
				setCellHeaderProps: () => ({
					style: { width: '90px' },
				}),
			},
		},
		{
			name: 'docket',
			label: 'Docket',
			options: {
				filter: true,
				sort: true,
				setCellHeaderProps: (value) => ({
					style: { width: '80px' },
				}),
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
				setCellHeaderProps: () => ({
					style: { width: '10%' },
				}),
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
				setCellHeaderProps: () => ({
					style: { width: '11%' },
				}),
			},
		},
		{
			name: 'updated',
			label: 'Updated',
			options: {
				filter: false,
				sort: true,
				customBodyRender: (value) => (
					<div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{value}</div>
				),
				setCellHeaderProps: () => ({
					style: { width: '10%' },
				}),
			},
		},
		{
			name: 'action',
			label: '',
			options: {
				filter: false,
				sort: false,
				download: false,
				setCellHeaderProps: (value) => ({
					style: { width: '60px' },
				}),
			},
		},
		// CSV only columns start here
		{
			name: 'dwapi_version',
			label: 'DWAPI Version',
			options: {
				display: false,
			},
		},
		{
			name: 'emr_etl_date',
			label: 'EMR ETL Date',
			options: {
				display: false,
			},
		},
		{
			name: 'log_date',
			label: 'Last Load Date',
			options: {
				display: false,
			},
		},
		{
			name: 'upload_mode',
			label: 'Upload Mode',
			options: {
				display: false,
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
		if (prof.totalExpected > prof.totalQueued) {
			progress = (
				<LinearProgressWithLabel
					value={getProgressPerc(
						prof.totalExpected * 2,
						prof.totalReceived + prof.totalQueued
					)}
				/>
			);
			// } else if (prof.totalQueued < prof.totalReceived) {
			// 	progress = (
			// 		<LinearProgressWithLabel
			// 			value={getProgressPerc(prof.totalReceived, prof.totalQueued)}
			// 			color={'secondary'}
			// 		/>
			// 	);
		} else if (prof.totalQueued === prof.totalReceived) {
			progress = (
				<LinearProgressWithLabel
					value={getProgressPerc(prof.totalReceived, prof.totalQueued)}
					color={'success'}
				/>
			);
		}
		let docket = prof?.docket === 'NDWH' ? 'C&T' : prof?.docket;
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
			filename: `download ${moment().format("MMM Do YY")}.csv`,
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
			{profiles ? (
				<MUIDataTable title={'Profiles'} data={data} columns={columns} options={options} />
			) : (
				<Loading />
			)}
		</Box>
	);
};

export default Profiles;
