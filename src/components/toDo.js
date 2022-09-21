import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Divider from '@mui/material/Divider';

export default function ToDo({
	data,
	handleEditToDo,
	handleDoneToDo,
	handleDeleteToDo,
}) {
	return (
		<Grid item sx={{ width: '100%' }}>
			<Grid
				item
				sx={{
					p: 1,
					borderWidth: '1px',
					borderStyle: 'solid',
					borderColor: 'rgba(0, 0, 0, 0.1)',
					borderImage: 'initial',
					borderRadius: '10px',
					width: '100%',
					backgroundColor: '#fafafa',
				}}>
				<Grid
					container
					direction='row'
					justifyContent='space-between'
					alignItems='center'>
					<Grid item>
						<CheckBoxOutlineBlankIcon
							onClick={() => handleDoneToDo(data)}
							sx={{
								':hover': {
									cursor: 'pointer',
								},
							}}
						/>
					</Grid>
					<Divider orientation='vertical' flexItem />
					<Grid item xs={8}>
						<Typography variant='p' component='p'>
							{data.content}
						</Typography>
					</Grid>
					<Divider orientation='vertical' flexItem />
					<Grid item>
						<Grid
							container
							direction='row'
							justifyContent='space-around'
							alignItems='center'
							spacing={2}>
							<Grid item>
								<EditIcon
									onClick={() => handleEditToDo(data)}
									sx={{
										color: 'orange',
										':hover': {
											cursor: 'pointer',
										},
									}}
								/>
							</Grid>
							<Grid item>
								<DeleteIcon
									onClick={() => handleDeleteToDo(data)}
									sx={{
										color: 'red',
										':hover': {
											cursor: 'pointer',
										},
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
