import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import { CloseIcon } from '@mui/icons-material/Close';
import { useState } from 'react';

const RefreshAlert = () => {
	const [open, setOpen] = useState(true);
	return (
		<Collapse in={open}>
			<Alert
				severity="info"
				sx={{ marginBottom: '10px' }}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setOpen(false);
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
			>
				<AlertTitle>DWH REFRESH</AlertTitle>
				{`The last refresh was on ${new Date().toDateString()}`}
			</Alert>
		</Collapse>
	);
};

export default RefreshAlert;
