/* eslint-disable react/prop-types */
import React, {useEffect, useMemo, useState} from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
const Cards = ({card}) => {
	const initialValue = [
		{
			type: 'paragraph',
			children: [
				{ text: `${card.text}` },
			],
		},
	]
	const editor = useMemo( () => withReact(createEditor()), [])
	const [value, setValue] = useState(initialValue)
	useEffect(()=> {
		card.text = value[0].children[0].text
	},[value])
	return (
		<div>
			<Slate editor={editor} value={value} onChange={newVal => setValue(newVal)} >
				<Editable placeholder="Enter some plain text..." />
			</Slate>
		</div>
	)
}
export default Cards