import React, { useState } from 'react'
import './app.css'
import Server, { location } from './server'
import Schedule from './schedule'
import Cut from './cut'
import Options from './options'
import Rotation from './rotation/rotationgui'

export interface sectionDomain {
	localList: Array<Server>
	globalStateModifiers: { [key: string]: (name: string) => void }
}

export default function App() {
	const [servers, setServers] = useState<Array<Server>>([])
	const [updater, update] = useState<boolean>(true) // changes value whenever I want the virtual dom to update (fix)
	const rotatingServers = servers.filter(server => server.location === 'rotation')
	const scheduledServers = servers.filter(server => server.location === 'schedule')
	const cutServers = servers.filter(server => server.location === 'cut')
	const serverOptions = servers.filter(server => server.location === 'options')

	function sendTo(location: location) {
		return (name: string) => {
			const whoever = servers.find(server => server.name === name)
			if (whoever) whoever.location = location
			else console.error('NO SERVER IN servers WITH NAME: ' + name)
			update(!updater) // (fix)
		}
	}

	function newServer() {
		return (serverName: string) => {
			setServers(prevServers => {
				if (!prevServers.find(server => server.name === serverName)) prevServers.push(new Server({ name: serverName }))
				return prevServers
			})
			update(!updater)
		}
	}

	return (
		<>
			<Rotation localList={rotatingServers} globalStateModifiers={{ cut: sendTo('cut'), undo: sendTo('schedule') }} />
			<Schedule localList={scheduledServers} globalStateModifiers={{ arrival: sendTo('rotation') }} />
			<Cut localList={cutServers} globalStateModifiers={{ uncut: sendTo('rotation') }} />
			<Options localList={serverOptions} globalStateModifiers={{ schedule: sendTo('schedule'), createServer: newServer() }} />
		</>
	)
}
