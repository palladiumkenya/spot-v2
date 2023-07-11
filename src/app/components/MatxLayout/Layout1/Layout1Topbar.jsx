import { Hidden, IconButton, MenuItem } from '@mui/material';
import { Box, styled } from '@mui/system';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import { topBarHeight } from 'app/utils/constant';
import React from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
	top: 0,
	zIndex: 96,
	transition: 'all 0.3s ease',
	boxShadow: themeShadows[8],
	height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
	padding: '8px',
	paddingLeft: 18,
	paddingRight: 20,
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: theme.palette.primary.main,
	[theme.breakpoints.down('sm')]: {
		paddingLeft: 16,
		paddingRight: 16,
	},
	[theme.breakpoints.down('xs')]: {
		paddingLeft: 14,
		paddingRight: 16,
	},
}));

const UserMenu = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	borderRadius: 24,
	padding: 4,
	'& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	minWidth: 185,
	'& a': {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
	},
	'& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

const IconBox = styled('div')(({ theme }) => ({
	display: 'inherit',
	[theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const Layout1Topbar = () => {
	return (
		<TopbarRoot>
			<TopbarContainer>
				<Box display="flex">
					<StyledIconButton></StyledIconButton>
					<UserMenu>
						<Hidden xsDown>
							<Link to={'/'}>
								<Span>
									<strong>SPOT</strong>
								</Span>
							</Link>
						</Hidden>
					</UserMenu>

					<IconBox>
						{/* <StyledIconButton>
							<Icon>mail_outline</Icon>
						</StyledIconButton> */}

						{/* <StyledIconButton>
							<Icon>web_asset</Icon>
						</StyledIconButton> */}

						{/* <StyledIconButton>
							<Icon>star_outline</Icon>
						</StyledIconButton> */}
					</IconBox>
				</Box>

				<Box display="flex" alignItems="center">
					<NotificationProvider>
						<NotificationBar />
					</NotificationProvider>
				</Box>
			</TopbarContainer>
		</TopbarRoot>
	);
};

export default React.memo(Layout1Topbar);
