import { useState } from 'react'
import { sectionDomain } from '../app'
import Server, { Table } from '../server'

export default function Rotation(props: sectionDomain) {
	const [rotation, setRotation] = useState<Array<Server>>(props.localList)
	//const [updater, update] = useState<boolean>(true) // changes value whenever I want the virtual dom to update (fix)

	function sortRotation() {
		let rot = props.localList
		for (let i = 1; i < rot.length; i++) {
			/* rot[j].tables[rot[j].tables.length-1].seating refers to when the Jth server was last sat */
			for (let j = i; j > 0 && rot[j].tables[rot[j].tables.length - 1].seating < rot[j - 1].tables[rot[j - 1].tables.length - 1].seating; j--) {
				;[rot[j], rot[j - 1]] = [rot[j - 1], rot[j]]
			}
		}
	}
	sortRotation()

	function seat(serverName: string): void {
		const server = rotation.find(whoever => whoever.name === serverName)
		if (server) server.tables.push(new Table())
		else console.error('NO SERVER WITH NAME ' + serverName + ' IN rotation')
		//	update(!updater)
	}

	function bottomDisplay(server: Server): string {
		return server.time + ' | ' + server.tables.length.toString()
	}

	return (
		<div id="rotation" className="squareBubble">
			<div className="bubbleLabel">Rotation</div>
			{rotation.map((server, index) => {
				return (
					<div key={index.toString()} className="block flex">
						<div className="gear centerText" onClick={() => props.globalStateModifiers.cut(server.name)}>
							C
						</div>
						<div className="middle" onClick={() => seat(server.name)}>
							<div className="slice">{server.name}</div>
							<div className="slice">{bottomDisplay(server)}</div>
						</div>
						<div className="undo centerText" onClick={() => props.globalStateModifiers.undo(server.name)}>
							U
						</div>
					</div>
				)
			})}
		</div>
	)
}
