/* eslint-disable react/prop-types */
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DraggableComponent from './DraggableComponent'

const DroppableComponent = ({column,columnId}) => {
	return (
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
								<div key={index}>
									<DraggableComponent  item={item} index={index}/>
								</div>
							)
						})}
						{provided.placeholder}
					</div>
				)
			}}
		</Droppable>
	)
}
export default DroppableComponent