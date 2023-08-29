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
import { FacilityMetricsProvider } from 'app/contexts/FacilityMetricsContext';

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
				<Grid item xs={12} md={12} xl={8}>
					<Grid item xs={12} md={12} xl={12}>
						<ManifestProvider>
							<ExtractsCard code={param} />
						</ManifestProvider>
					</Grid>
				</Grid>
				<Grid item xs={12} md={12} xl={4}>
					<Grid item xs={12} md={12} xl={12}>
						<SimpleCard title={'Facility Metrics'}>
							<FacilityMetricsProvider>
								<FacilityMetrics />
							</FacilityMetricsProvider>
						</SimpleCard>
					</Grid>
					<Grid item xs={12} md={12} xl={12}>
						<SimpleCard title={'Upload History'}>
							<UploadHistoryProvider>
								<UploadHistory />
							</UploadHistoryProvider>
						</SimpleCard>
					</Grid>
				</Grid>
				<Grid item xs={12} md={12} xl={12}>
					<SimpleCard title={'Indicator Metrics'}>
						<IndicatorMetricsProvider>
							<IndicatorMetrics />
						</IndicatorMetricsProvider>
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
