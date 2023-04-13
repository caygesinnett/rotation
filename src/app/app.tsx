import React, { useState } from 'react'
import './app.css'
import Server, { location } from './server'
import Schedule from './schedule'
import Cut from './cut'
import Options from './options'
import Rotation from './rotation/rotationgui'

export interface sectionDomain {
	localList: Array<Server>
	globalStateModifiers: Array<(name: string) => void>
}

export default function App() {
	const [servers, setServers] = useState<Array<Server>>([])
	const rotatingServers = servers.filter(server => server.location === 'rotation')
	const scheduledServers = servers.filter(server => server.location === 'schedule')
	const cutServers = servers.filter(server => server.location === 'cut')
	const serverOptions = servers.filter(server => server.location === 'options')

	function sendTo(location: location) {
		return (name: string) => {
			const whoever = servers.find(server => server.name === name)
			if (whoever) whoever.location = location
			else console.error('NO SERVER IN servers WITH NAME: ' + name)
		}
	}

	function newServer() {
		return (serverName: string) => {
			setServers(prevServers => {
				/* v this line v makes this function idempotent, which is what react wants */
				const newServers = prevServers.filter(server => server.name !== serverName)
				newServers.push(new Server({ name: serverName }))
				return newServers
			})
		}
	}

	return (
		<>
			<Rotation localList={rotatingServers} globalStateModifiers={[sendTo('cut'), sendTo('schedule')]} />
			<Schedule localList={scheduledServers} globalStateModifiers={[sendTo('rotation')]} />
			<Cut localList={cutServers} globalStateModifiers={[sendTo('rotation')]} />
			<Options localList={serverOptions} globalStateModifiers={[sendTo('options'), newServer()]} />
		</>
	)
}
