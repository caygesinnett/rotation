import { useState } from 'react'
import { sectionDomain } from '../app'
import Server, { Table } from '../server'
import undo from '../../other/reply-solid.svg'
import scissors from '../../other/scissors-solid.svg'

export default function Rotation(props: sectionDomain) {
	const [updater, update] = useState<boolean>(true) // changes value whenever I want the virtual dom to update (fix)

	function hackyConditionals(j: number): Date {
		if (props.localList[j].tables.length === 0) return new Date(props.localList[j].arrival!.getTime() - 3000000)
		else return props.localList[j].tables[props.localList[j].tables.length - 1].seating
	}

	function sortRotation() {
		for (let i = 1; i < props.localList.length; i++) {
			/* rot[j].tables[rot[j].tables.length-1].seating refers to when the Jth server was last sat */
			for (let j = i; j > 0 && hackyConditionals(j) < hackyConditionals(j - 1); j--) {
				;[props.localList[j], props.localList[j - 1]] = [props.localList[j - 1], props.localList[j]]
			}
		}
	}
	sortRotation()

	function seat(serverName: string): void {
		const server = props.localList.find(whoever => whoever.name === serverName)
		if (server) server.tables.push(new Table())
		else console.error('NO SERVER WITH NAME ' + serverName + ' IN rotation')
		update(!updater)
	}

	function bottomDisplay(server: Server): string {
		return server.time + '  |  ' + server.tables.length.toString()
	}

	return (
		<div id="rotation" className="squareBubble">
			<div className="bubbleLabel">Rotation</div>
			{props.localList.map((server, index) => {
				return (
					<div key={index.toString()} className="block flex">
						<div className="gear centerText" onClick={() => props.globalStateModifiers.cut(server.name)}>
							<img src={scissors} className="svg" />
						</div>
						<div className="middle" onClick={() => seat(server.name)}>
							<div className="slice">{server.name}</div>
							<div className="slice">{bottomDisplay(server)}</div>
						</div>
						<div
							className="undo centerText"
							onClick={() => {
								if (server.tables.length === 0) props.globalStateModifiers.undo(server.name)
								else server.tables.pop()
								update(!updater)
							}}
						>
							<img src={undo} className="svg" />
						</div>
					</div>
				)
			})}
		</div>
	)
}
