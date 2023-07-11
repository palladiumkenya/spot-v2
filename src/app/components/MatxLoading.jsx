import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/system';
import { H6 } from './Typography';

const StyledLoading = styled('div')(() => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'& img': {
		width: 'auto',
		height: '25px',
	},
	'& .circleProgress': {
		position: 'absolute',
		left: -7,
		right: 0,
		top: 'calc(50% - 25px)',
	},
}));

const Loading = () => {
	return (
		<StyledLoading style={{ paddingTop: '20px', paddingBottom: '25px' }}>
			<Box position="absolute">
				<img
					src="/assets/images/logo.png"
					alt=""
					style={{
						filter: 'saturate(500%) contrast(800%) brightness(500%) invert(80%) sepia(50%) hue-rotate(120deg)',
					}}
				/>
				<H6>Loading...</H6>
				<CircularProgress className="circleProgress" />
			</Box>
		</StyledLoading>
	);
};

export default Loading;
