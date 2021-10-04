/* eslint-disable react/prop-types */
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from './Card'
const DraggableComponent = ({item, index}) => {
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
}
export default DraggableComponent