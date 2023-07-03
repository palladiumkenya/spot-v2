import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import useNotification from 'app/hooks/useNotification';

const RefreshAlert = () => {
	const [open, setOpen] = useState(true);
	const { notifications } = useNotification();

	return (
		<>
			<Collapse in={open}>
				{notifications
					?.filter((n) => n.level === 2)
					?.map((notification) => (
						<Alert
							key={notification.id}
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
							<AlertTitle>{notification.title}</AlertTitle>
							{notification.message}
						</Alert>
					))}
			</Collapse>
		</>
	);
};

export default RefreshAlert;
