import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {v4 as uuid} from 'uuid'
import Card from './Card'
import AddIcon from '@material-ui/icons/Add'
import { initialCards, columnsFromBackend } from './cardsData'

const MainContent = () => {

	const [taskColumns, setTaskColumns] = useState(columnsFromBackend)
	const [ cards, setCards ] = useState(initialCards)
   
	const onDragEnd = (result, taskColumns, setTaskColumns) => {
		// user drops outside the list
		if (!result.destination) return
		const { source, destination } = result
		if (source.droppableId === destination.droppableId && destination.index=== source.index) return

		if (source.droppableId !== destination.droppableId) {
          
			const sourceColumn = taskColumns[source.droppableId]
			const destColumn = taskColumns[destination.droppableId]     
			const sourceItems = sourceColumn.items
			const destItems = destColumn.items
			// remove from old column
			const [removed] = sourceItems.splice(source.index,1)
			// add removed to new column
			destItems.splice(destination.index, 0, removed)
			setTaskColumns({
				...taskColumns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems
				}
			})
		}
	}
	const addNewCard = () => {
		setCards([...cards,{id:uuid(), text: ''}])
		// put new card in all task column
		taskColumns['all-task'].items.push({id:uuid(), text: ''})

	}
    
	return (
		<div className="container">
			<div className="buttonContainer">
				<button className="addButton" onClick={()=>addNewCard()}><AddIcon/> add new card</button>
			</div>
			<div className="context-wrapper">
				<DragDropContext
					onDragEnd={result => onDragEnd(result, taskColumns, setTaskColumns)}
				>
					{Object.entries(taskColumns).map(([columnId, column]) => {
						return (
							<div className="column-wrap" key={columnId}>
								<h2>{column.name}</h2>
								<div style={{ margin: '8px' }}>
									<Droppable droppableId={columnId} key={columnId}>
										{(provided, snapshot) => {
											return (
												<div className="dropbox"
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														background: snapshot.isDraggingOver
															? '#9EE493'
															: '#DAF7DC'
                          
													}}
												>
													{column.items.map((item, index) => {
														return (
															<Draggable
																key={item.id}
																draggableId={item.id}
																index={index}
															>
																{(provided, snapshot) => {
																	return (
																		<div className="dragbox"
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																			style={{
                                      
																				backgroundColor: snapshot.isDragging
																					? '#86BBD8'
																					: '#336699',
																				...provided.draggableProps.style
																			}}
																		>
																			<Card card={item}/>
																		</div>
																	)
																}}
															</Draggable>
														)
													})}
													{provided.placeholder}
												</div>
											)
										}}
									</Droppable>
								</div>
							</div>
						)
					})}
				</DragDropContext>
			</div>
		</div>
	)
}
export default MainContent