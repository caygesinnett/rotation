import React, { useState } from 'react'
import logo from './logo.svg'
import './app.css'
import Server from './server'

function App() {
	const [optionsAreOpen, setOptionsAreOpen] = useState(false)
	const [serverOptions, setServerOptions] = useState<Array<Server>>([])
	const [newServerIsOpen, setNewServerIsOpen] = useState(false)
	const [scheduledServers, setScheduledServers] = useState<Array<Server>>([])
	const [rotatingServers, setRotatingServers] = useState<Array<Server>>([])

	return (
		<>
			<Rotation>
				{rotatingServers.map((server, index) => {
					return <RotatingServer key={index.toString()}>{server}</RotatingServer>
				})}
			</Rotation>
			<Schedule>
				{scheduledServers.map((server, index) => {
					return <ScheduledServer key={index.toString()}>{server}</ScheduledServer>
				})}
			</Schedule>
			<Cut />
			<Introduce>
				{optionsAreOpen ? (
					<>
						<CloseOptions />
						{serverOptions.map((server, index) => {
							return <ServerOption key={index.toString()}>{server.name}</ServerOption>
						})}
						{newServerIsOpen ? <NewServer /> : <AddServer />}
					</>
				) : (
					<OpenOptions />
				)}
			</Introduce>
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

	function Schedule(props: any) {
		return (
			<div id="schedule" className="squareBubble">
				<div className="bubbleLabel">Scheduled Servers</div>
				{props.children}
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

	function Cut() {
		return (
			<div id="cut" className="squareBubble">
				<div className="bubbleLabel">Cut Servers</div>
			</div>
		)
	}

	function Introduce(props: any) {
		return (
			<div id="introduce" className="squareBubble">
				<div className="bubbleLabel">Add New Servers</div>
				{props.children}
			</div>
		)
	}

	function OpenOptions() {
		const open = () => setOptionsAreOpen(true)
		return (
			<div onClick={open} className="block centerText">
				Add Server to Schedule
			</div>
		)
	}

	function CloseOptions() {
		const close = () => setOptionsAreOpen(false)
		return (
			<div onClick={close} className="block centerText">
				Close
			</div>
		)
	}

	function ServerOption(props: any) {
		const schedule = () => {
			setScheduledServers(prevScheduledServers => {
				// v this v line makes this function idempotent which is what react strict mode wants
				const newScheduledServers = prevScheduledServers.filter(server => server.name !== props.children)
				// ^      ^
				newScheduledServers.push(serverOptions.find(server => server.name === props.children)!)
				return newScheduledServers
			})
			setServerOptions(prevServerOptions => prevServerOptions.filter(server => server.name !== props.children))
		}
		return (
			<div onClick={schedule} className="block centerText">
				{props.children}
			</div>
		)
	}

	function AddServer() {
		const addNewServer = () => setNewServerIsOpen(true)
		return (
			<div onClick={addNewServer} className="block centerText">
				Add New Server
			</div>
		)
	}

	function NewServer() {
		const [newServerName, setNewServerName] = useState('')
		const handleInput = (e: any) => setNewServerName(e.target.value)
		const submit = () => {
			setNewServerIsOpen(false)
			setServerOptions(prevServerOptions => {
				// v this v line makes this function idempotent which is what react strict mode wants
				const newServerOptions = prevServerOptions.filter(server => server.name !== newServerName)
				// ^      ^
				newServerOptions.push(new Server({ name: newServerName }))
				return newServerOptions
			})
		}
		return (
			<>
				<div onClick={submit} className="block submit centerText">
					^
				</div>
				<input onChange={handleInput} id="newServerName" className="block input" type="text" />
			</>
		)
	}
}

export default App
