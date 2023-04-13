import React, { useState } from 'react'
import './app.css'
import Server, { location } from './server'
import Schedule from './schedule'
import Cut from './cut'
import Options from './options'

export interface sectionDomain {
	localList: Array<Server>
	changeList: (name: string) => void | Array<(name: string) => void>
}

function App() {
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

	return (
		<>
			<Rotation localList={rotatingServers} changeList={[sendTo('cut'), sendTo('schedule')]} />
			<Schedule localList={scheduledServers} changeList={sendTo('rotation')} />
			<Cut localList={cutServers} changeList={sendTo('rotation')} />
			<Options localList={serverOptions} changeList={sendTo('options')} />
		</>
	)
}

export default App
