import { styled } from '@mui/material';
import { Fragment } from 'react';
import Legend from 'app/components/Legend';
import RefreshAlert from './shared/RefreshAlert';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import { ProfileProvider } from './../../contexts/ProfileContext';
import Profiles from './shared/Profiles';

const ContentBox = styled('div')(({ theme }) => ({
	margin: '30px',
	[theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Analytics = () => {
	return (
		<Fragment>
			<ContentBox className="analytics">
				<NotificationProvider>
					<RefreshAlert />
				</NotificationProvider>
				<ProfileProvider>
					<Profiles />
				</ProfileProvider>
				<Legend />
			</ContentBox>
		</Fragment>
	);
};

export default Analytics;
