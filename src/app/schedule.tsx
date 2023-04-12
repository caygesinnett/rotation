import './app.css'
import Server from './server'
import { useState } from 'react'

interface scheduleDomain {
	scheduledServers: Array<Server>
	onTap: (name: string) => void
}

function Schedule(props: scheduleDomain) {
	return (
		<div id="schedule" className="squareBubble">
			<div className="bubbleLabel">Scheduled Servers</div>
			{props.scheduledServers.map((server, index) => {
				return <ScheduledServer key={index.toString()}>{server}</ScheduledServer>
			})}
		</div>
	)
}

function ScheduledServer(props: any) {
	const arrival = () => {
		setRotatingServers(prevRotatingServers => {
			// v this v line makes this function idempotent which is what react strict mode wants
			const newRotatingServers = prevRotatingServers.filter(server => server.name !== props.children.name)
			// ^      ^
			newRotatingServers.push(scheduledServers.find(server => server.name === props.children.name)!)
			return newRotatingServers
		})
		setScheduledServers(prevScheduledServers => prevScheduledServers.filter(server => server.name !== props.children.name))
	}
	return (
		<div onClick={arrival} className="block centerText">
			{props.children.name}
		</div>
	)
}

export default Schedule
