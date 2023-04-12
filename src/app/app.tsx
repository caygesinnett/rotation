import React, { useState } from 'react'
import './app.css'
import Server from './server'
import Schedule from './schedule'
import Cut from './cut'
import Introduce from './introduce'

function App() {
	const [servers, setServers] = useState<Array<Server>>([])

	/* basic formula for finding sub-arrays: servers.filter(server => server.location === 'NAMEOFSUBARRAY') */

	const rotatingServers = servers.filter(server => server.location === 'rotation')
	const scheduledServers = servers.filter(server => server.location === 'schedule')

	return (
		<>
			<Rotation>
				{rotatingServers.map((server, index) => {
					return <RotatingServer key={index.toString()}>{server}</RotatingServer>
				})}
			</Rotation>
			<Schedule {scheduledServers: scheduledServers, onTap: scheduleTap} />
			<Cut />
			<Introduce />
		</>
	)

	function Rotation(props: any) {
		return (
			<div id="rotation" className="squareBubble">
				<div className="bubbleLabel">Rotation</div>
				{props.children}
			</div>
		)
	}

	function RotatingServer(props: any) {
		return (
			<>
				<Gear />
				<Middle>
					<Top>{props.children.topDisplay}</Top>
					<Bottom>{props.children.bottomDisplay}</Bottom>
				</Middle>
				<Undo />
			</>
		)
	}

	function Gear() {
		return <div className="block gear centerText">C</div>
	}

	function Middle(props: any) {
		return <div className="block middle">{props.children}</div>
	}

	function Top(props: any) {
		return <div className="block slice">{props.children}</div>
	}

	function Bottom(props: any) {
		return <div className="block slice">{props.children}</div>
	}

	function Undo() {
		return <div className="block undo centerText">U</div>
	}

	function scheduleTap(name: string) {
		const whoever = servers.find(server => server.name === name)
		if (whoever) whoever.location = 'rotation'
		else console.error('NO SERVER IN servers WITH NAME: ' + name)
	}
}

export default App
