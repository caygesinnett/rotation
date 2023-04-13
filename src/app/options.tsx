import { sectionDomain } from './app'
import { useState } from 'react'

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
						<>
							<div
								onClick={() => {
									props.globalStateModifiers.createServer(newServerName)
									setNewServerIsOpen(false)
									setNewServerName('')
								}}
								className="block submit centerText"
							>
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
