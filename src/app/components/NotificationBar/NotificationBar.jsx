import { Badge, Button, Card, Drawer, Icon, IconButton, ThemeProvider } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import useNotification from 'app/hooks/useNotification';
import useSettings from 'app/hooks/useSettings';
import { sideNavWidth, topBarHeight } from 'app/utils/constant';
import { getTimeDifference } from 'app/utils/utils.js';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { themeShadows } from '../MatxTheme/themeColors';
import { Paragraph, Small } from '../Typography';

const Notification = styled('div')(() => ({
	padding: '16px',
	marginBottom: '16px',
	display: 'flex',
	alignItems: 'center',
	height: topBarHeight,
	boxShadow: themeShadows[6],
	'& h5': {
		marginLeft: '8px',
		marginTop: 0,
		marginBottom: 0,
		fontWeight: '500',
	},
}));

const NotificationCard = styled(Box)(({ theme }) => ({
	position: 'relative',
	'&:hover': {
		'& .messageTime': {
			display: 'none',
		},
		'& .deleteButton': {
			opacity: '1',
		},
	},
	'& .messageTime': {
		color: theme.palette.text.secondary,
	},
	'& .icon': { fontSize: '1.25rem' },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
	opacity: '0',
	position: 'absolute',
	right: 5,
	marginTop: 9,
	marginRight: '24px',
	background: 'rgba(0, 0, 0, 0.01)',
}));

const CardLeftContent = styled('div')(({ theme }) => ({
	padding: '12px 8px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: 'rgba(0, 0, 0, 0.01)',
	'& small': {
		fontWeight: '500',
		marginLeft: '16px',
		color: theme.palette.text.secondary,
	},
}));

const Heading = styled('span')(({ theme }) => ({
	fontWeight: '500',
	marginLeft: '16px',
	color: theme.palette.text.secondary,
}));

const NotificationBar = ({ container }) => {
	const { settings } = useSettings();
	const theme = useTheme();
	const secondary = theme.palette.text.secondary;
	const [panelOpen, setPanelOpen] = React.useState(false);
	const { deleteNotification, clearNotifications } = useNotification();
	const notifications = [
		{
			_id: '9eb13e4a-bb7b-11e9-9cb5-2a2ae2dbcce4',
			message:
				'It may take upto 1 HOUR for data to be processed and displayed after being SENT',
			rank: 1,
			__v: 0,
			color: 'red',
		},
	];

	const handleDrawerToggle = () => {
		setPanelOpen(!panelOpen);
	};

	const { palette } = useTheme();
	const textColor = palette.text.primary;

	return (
		<Fragment>
			<IconButton onClick={handleDrawerToggle}>
				<Badge color="secondary" badgeContent={notifications?.length}>
					<Icon sx={{ color: textColor }}>notifications</Icon>
				</Badge>
			</IconButton>

			<ThemeProvider theme={settings.themes[settings.activeTheme]}>
				<Drawer
					width={'100px'}
					container={container}
					variant="temporary"
					anchor={'right'}
					open={panelOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
				>
					<Box sx={{ width: sideNavWidth }}>
						<Notification>
							<Icon color="primary">notifications</Icon>
							<h5>Notifications</h5>
						</Notification>

						{notifications?.map((notification) => (
							<NotificationCard key={notification._id}>
								<DeleteButton
									size="small"
									className="deleteButton"
									onClick={() => deleteNotification(notification._id)}
								>
									<Icon className="icon">clear</Icon>
								</DeleteButton>
								<Link
									to={`/${notification.path}`}
									onClick={handleDrawerToggle}
									style={{ textDecoration: 'none' }}
								>
									<Card sx={{ mx: 2, mb: 3 }} elevation={3}>
										<CardLeftContent>
											<Box display="flex">
												<Icon className="icon" color={'error'}>
													{'notifications'}
												</Icon>
											</Box>
											<Small className="messageTime">
												{getTimeDifference(new Date())}
												ago
											</Small>
										</CardLeftContent>
										<Box sx={{ px: 2, pt: 1, pb: 2 }}>
											<Paragraph sx={{ m: 0 }}>
												{notification.title}
											</Paragraph>
											<Small sx={{ color: secondary }}>
												{notification.message}
											</Small>
										</Box>
									</Card>
								</Link>
							</NotificationCard>
						))}
						{!!notifications?.length && (
							<Box sx={{ color: secondary }}>
								<Button onClick={clearNotifications}>Clear Notifications</Button>
							</Box>
						)}
					</Box>
				</Drawer>
			</ThemeProvider>
		</Fragment>
	);
};

export default NotificationBar;
