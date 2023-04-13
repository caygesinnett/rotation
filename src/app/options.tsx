import './app.css'
import { sectionDomain } from './app'
import { useState } from 'react'

export default function Options(props: sectionDomain) {
	const [optionsAreOpen, setOptionsAreOpen] = useState<Boolean>(false)
	const [newServerIsOpen, setNewServerIsOpen] = useState<Boolean>(false)
	const [newServerName, setNewServerName] = useState('')
	return (
		<div id="introduce" className="squareBubble">
			<div className="bubbleLabel">Add New Servers</div>
			{optionsAreOpen ? (
				<>
					<div onClick={() => setOptionsAreOpen(false)} className="block centerText">
						Close
					</div>
					{props.localList.map((server, index) => {
						return (
							<div key={index.toString()} onClick={() => props.globalStateModifiers[0](server.name)} className="block centerText">
								{server.name}
							</div>
						)
					})}
					{newServerIsOpen ? (
						<>
							<div onClick={() => props.globalStateModifiers[1](newServerName)} className="block submit centerText">
								^
							</div>
							<input onChange={(e: any) => setNewServerName(e.target.value)} id="newServerName" className="block input" type="text" />
						</>
					) : (
						<div onClick={() => setNewServerIsOpen(true)} className="block centerText">
							Add New Server
						</div>
					)}
				</>
			) : (
				<div onClick={() => setOptionsAreOpen(true)} className="block centerText">
					Add Server to Schedule
				</div>
			)}
		</div>
	)
}
