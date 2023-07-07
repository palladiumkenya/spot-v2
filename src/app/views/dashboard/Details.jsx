import { Grid } from '@mui/material';
import { SimpleCard } from 'app/components';
import { Fragment } from 'react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import UploadHistory from './shared/UploadHistory';
import FacilityMetrics from './shared/FacilityMetrics';
import IndicatorMetrics from './shared/IndicatorMetrics';
import ExtractsCard from './shared/ExtractsCard';
import FacilityInfo from './shared/FacilityInfo';
import { connect } from 'react-redux';
import { updateCode } from '../../redux/actions/actions';
import { FacilityProvider } from 'app/contexts/FacilityContext';
import { IndicatorMetricsProvider } from 'app/contexts/IndicatorMetricsContext';
import { ManifestProvider } from './../../contexts/ExtractsContext';
import { UploadHistoryProvider } from 'app/contexts/UploadHistoryContext';

const Details = ({ updateCode }) => {
	const { param } = useParams();
	updateCode(param);

	return (
		<Fragment>
			<Grid container spacing={3} alignItems="flex-start">
				{/* <ContentBox className="analytics"> */}
				<Grid item xs={12} md={12}>
					<FacilityProvider>
						<FacilityInfo />
					</FacilityProvider>
				</Grid>
				{/* </ContentBox>
				<ContentBox className="analytics"> */}
				<Grid item xs={12} md={6} xl={8}>
					<ManifestProvider>
						<ExtractsCard code={param} />
					</ManifestProvider>
				</Grid>
				<Grid item xs={12} md={6} xl={4}>
					<SimpleCard title={'Upload History'}>
						<UploadHistoryProvider>
							<UploadHistory />
						</UploadHistoryProvider>
					</SimpleCard>
				</Grid>
				<Grid item xs={12} md={12} xl={8}>
					<SimpleCard title={'Indicator Metrics'}>
						<IndicatorMetricsProvider>
							<IndicatorMetrics />
						</IndicatorMetricsProvider>
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

const mapStateToProps = (state) => ({
	code: state.code,
});

const mapDispatchToProps = {
	updateCode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
