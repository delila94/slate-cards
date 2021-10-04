import {v4 as uuid} from 'uuid'
export  const initialCards  =[
	{
		id: uuid(),
		text: 'card 1 text',
	},
	{
		id: uuid(),
		text: 'card 2 text',
	},
	{
		id: uuid(),
		text: 'card 3 text',
	}

]
export const columnsFromBackend = {
	'all-task': {
		name: 'All Task',
		items: initialCards
	},
	'to-do': {
		name: 'To do',
		items: []
	},
	'in-progress': {
		name: 'In Progress',
		items: []
	},
	'done': {
		name: 'Done',
		items: []
	}
}