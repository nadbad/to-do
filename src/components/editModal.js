import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function EditModal({
	open,
	setOpen,
	editData,
	handleChangeData,
	handleEdit,
}) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={open}>
				<Box sx={style}>
					<div className='modal-body'>
						<Grid
							container
							direction='columns'
							justifyContent='space-around'
							alignItems='center'>
							<Typography variant='h4' component='h4' sx={{ mb: 2 }}>
								Edit todo
							</Typography>
							<TextField
								label='New To Do'
								variant='outlined'
								placeholder='Do the laundry'
								name='content'
								value={editData.content}
								onChange={handleChangeData}
								sx={{ width: 300, mb: 2 }}
							/>
							<Grid
								container
								direction='row'
								justifyContent='space-around'
								alignItems='center'>
								<Button
									variant='contained'
									onClick={() => handleEdit(editData)}
									sx={{
										width: 100,
										backgroundColor: '#e74c3c',
										':hover': {
											backgroundColor: '#c0392b',
										},
									}}>
									Send
								</Button>
								<Button
									variant='contained'
									onClick={handleClose}
									sx={{
										width: 100,
									}}>
									Back
								</Button>
							</Grid>
						</Grid>
					</div>
				</Box>
			</Fade>
		</Modal>
	);
}
