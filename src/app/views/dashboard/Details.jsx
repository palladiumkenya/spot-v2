import { Card, Grid, styled, useTheme, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SimpleCard } from 'app/components';
import { Fragment } from 'react';
import Extracts from './shared/Extracts';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import * as React from 'react';
import { H2, Paragraph } from 'app/components/Typography';
import UploadHistory from './shared/UploadHistory';
import FacilityMetrics from './shared/FacilityMetrics';
import IndicatorMetrics from './shared/IndicatorMetrics';
import Legend from 'app/components/Legend';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

function TabPanel(props) {
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
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Details = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Grid container spacing={3} alignItems="flex-start">
        {/* <ContentBox className="analytics"> */}
        <Grid item xs={12} md={12}>
          <SimpleCard sx={{ width: '100%' }}>
            <H2>Test Facility</H2>
            <Paragraph sx={{ m: 0 }}>Code: 14402</Paragraph>
          </SimpleCard>
        </Grid>
        {/* </ContentBox>
				<ContentBox className="analytics"> */}
        <Grid item xs={12} md={6} xl={8}>
          <SimpleCard title="">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="NDWH" {...a11yProps(0)} />
                  <Tab label="HTS" {...a11yProps(1)} />
                  <Tab label="MNCH" {...a11yProps(2)} />
                  <Tab label="PREP" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Extracts list={[]} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Extracts list={[]} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Extracts list={[]} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Extracts list={[]} />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Extracts list={[]} />
              </TabPanel>
            </Box>
            <Legend />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <SimpleCard title={'Upload History'}>
            <UploadHistory />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} md={12} xl={8}>
          <SimpleCard title={'Indicator Metrics'}>
            <IndicatorMetrics />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} md={12} xl={4}>
          <SimpleCard title={'Facility Metrics'}>
            <FacilityMetrics />
          </SimpleCard>
        </Grid>
      </Grid>
  
    </Fragment>
  );
};

export default Details;
