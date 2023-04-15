import { isPlusToken } from 'typescript'
import { sectionDomain } from './app'
import { useState } from 'react'
import plus from '../other/plus-solid.svg'

export default function Options(props: sectionDomain) {
	const [optionsAreOpen, setOptionsAreOpen] = useState<boolean>(false)
	const [newServerIsOpen, setNewServerIsOpen] = useState<boolean>(false)
	const [newServerName, setNewServerName] = useState('')

	return (
		<div id="options" className="squareBubble">
			<div className="bubbleLabel">Add New Servers</div>
			{optionsAreOpen ? (
				<>
					<div onClick={() => setOptionsAreOpen(false)} className="block centerText">
						Close
					</div>
					{props.localList.map((server, index) => {
						return (
							<div key={index.toString()} onClick={() => props.globalStateModifiers.schedule(server.name)} className="block centerText">
								{server.name}
							</div>
						)
					})}
					{newServerIsOpen ? (
						<div className="block flex">
							<div
								onClick={() => {
									props.globalStateModifiers.createServer(newServerName)
									setNewServerIsOpen(false)
									setNewServerName('')
								}}
								className="submit centerText"
							>
								<img src={plus} className="svg" />
							</div>
							<input onChange={(e: any) => setNewServerName(e.target.value)} id="newServerName" className="input" type="text" />
						</div>
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
