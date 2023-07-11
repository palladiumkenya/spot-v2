import { Box } from '@mui/material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Extracts from './Extracts';
import { SimpleCard } from 'app/components';
import Legend from 'app/components/Legend';
import useExtracts from 'app/hooks/useExtracts';
import Loading from 'app/components/MatxLoading';

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

const ExtractsCard = () => {
	const [value, setValue] = React.useState(0);
	const { manifests } = useExtracts();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<SimpleCard title="">
			<Box width={'100%'}>
				{manifests === undefined ? (
					<Loading />
				) : (
					<>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
							>
								<Tab label="NDWH" {...a11yProps(0)} />
								<Tab label="HTS" {...a11yProps(1)} />
								<Tab label="MNCH" {...a11yProps(2)} />
								<Tab label="PREP" {...a11yProps(3)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<Extracts list={manifests?.find((x) => x.docket === 'NDWH')} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Extracts list={manifests?.find((x) => x.docket === 'HTS')} />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Extracts list={manifests?.find((x) => x.docket === 'MNCH')} />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<Extracts list={manifests?.find((x) => x.docket === 'PREP')} />
						</TabPanel>
					</>
				)}
			</Box>
			<Legend />
		</SimpleCard>
	);
};

export default ExtractsCard;
