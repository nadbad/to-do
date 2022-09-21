import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

import ToDo from './components/toDo';
import EditModal from './components/editModal';
import DeleteModal from './components/deleteModal';
import axios from 'axios';
import DoneToDo from './components/doneToDo';

export default function App() {
	useEffect(() => {
		loadToDos();
	}, []);

	const [newData, setNewData] = useState({ content: '' });
	const [toDos, setToDos] = useState([]);
	const [openEdit, setOpenEdit] = useState();
	const [openDelete, setOpenDelete] = useState();
	const [editData, setEditData] = useState({ content: '' });

	const mainApi = process.env.REACT_APP_API + '/todo';

	const loadToDos = async () => {
		await axios.get(mainApi).then(res => {
			setToDos(res.data);
		});
	};

	const handleChangeData = e => {
		setNewData({ ...newData, [e.target.name]: e.target.value });
	};

	const handleChangeEditData = e => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleAddToDo = async () => {
		await axios
			.post(mainApi, newData)
			.then(res => {
				loadToDos();
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleEdit = async data => {
		await axios
			.put(mainApi, data)
			.then(res => {
				loadToDos();
				setOpenEdit(false);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleEditToDo = data => {
		setEditData(data);
		setOpenEdit(true);
	};

	const handleDoneToDo = async data => {
		let state;
		if (data.state === 'false') {
			state = true;
		} else if (data.state === 'true') {
			state = false;
		}
		await axios
			.put(mainApi, { state: state })
			.then(res => {
				loadToDos();
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleDelete = async () => {
		await axios
			.delete(mainApi, { data: editData })
			.then(res => {
				loadToDos();
				setOpenDelete(false);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleDeleteToDo = data => {
		setEditData(data);
		setOpenDelete(true);
	};

	return (
		<div className='container'>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'>
				<Grid
					container
					direction='rows'
					justifyContent='space-around'
					alignItems='center'>
					<Typography variant='h4' component='h4'>
						To Do List
					</Typography>
				</Grid>
				<Grid
					container
					direction='rows'
					justifyContent='space-between'
					alignItems='center'
					sx={{ mt: 5, width: 500 }}>
					<TextField
						label='New To Do'
						variant='outlined'
						placeholder='Do the laundry'
						name='content'
						value={newData.content}
						onChange={handleChangeData}
						sx={{ width: 300 }}
					/>
					<Button
						variant='contained'
						endIcon={<SendIcon />}
						onClick={handleAddToDo}>
						Add
					</Button>
				</Grid>
				<Grid
					container
					direction='columns'
					justifyContent='space-around'
					alignItems='center'
					sx={{ width: 500 }}>
					<div className='to-do-list'>
						<Typography variant='h6' component='h6' sx={{ mb: 2 }}>
							To Dos
						</Typography>
						<Grid
							container
							direction='column'
							justifyContent='space-between'
							alignItems='center'
							spacing={2}>
							{toDos && toDos.length > 0
								? toDos.map(toDo => {
										if (toDo.state === 'true') {
											return (
												<ToDo
													key={toDo.id}
													data={toDo}
													handleEditToDo={handleEditToDo}
													handleDoneToDo={handleDoneToDo}
													handleDeleteToDo={handleDeleteToDo}
												/>
											);
										}
								  })
								: null}
						</Grid>
					</div>
				</Grid>
				<Grid
					container
					direction='columns'
					justifyContent='space-around'
					alignItems='center'
					sx={{ width: 500 }}>
					<div className='to-do-list'>
						<Typography variant='h6' component='h6' sx={{ mb: 2 }}>
							Done
						</Typography>
						<Grid
							container
							direction='column'
							justifyContent='space-between'
							alignItems='center'
							spacing={2}>
							{toDos && toDos.length > 0
								? toDos.map(toDo => {
										if (toDo.state === 'false') {
											return (
												<DoneToDo
													key={toDo.id}
													data={toDo}
													handleEditToDo={handleEditToDo}
													handleDoneToDo={handleDoneToDo}
													handleDeleteToDo={handleDeleteToDo}
												/>
											);
										}
								  })
								: null}
						</Grid>
					</div>
				</Grid>
			</Grid>
			<EditModal
				open={openEdit}
				setOpen={setOpenEdit}
				handleChangeData={handleChangeEditData}
				editData={editData}
				handleEdit={handleEdit}
			/>
			<DeleteModal
				handleDelete={handleDelete}
				open={openDelete}
				setOpen={setOpenDelete}
				handleChangeData={handleChangeEditData}
				editData={editData}
			/>
		</div>
	);
}

//EditModal({
// handleDelete,
// open,
// setOpen,
// id,
// handleChangeData,
// newData,
