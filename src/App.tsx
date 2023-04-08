import React, { Children, useState } from 'react'
import logo from './logo.svg'
import './app.css'

function App() {
	const [optionsAreOpen, setOptionsAreOpen] = useState(false)
	const [serverOptions, setServerOptions] = useState<Array<any>>([])
	const [newServerIsOpen, setNewServerIsOpen] = useState(false)

	return (
		<>
			<Rotation />
			<Schedule />
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

	function Rotation() {
		return (
			<div id="rotation" className="squareBubble">
				<div className="bubbleLabel">Rotation</div>
			</div>
		)
	}

	function Schedule() {
		return (
			<div id="schedule" className="squareBubble">
				<div className="bubbleLabel">Scheduled Servers</div>
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
		return <div className="block centerText">{props.children}</div>
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
				// v this v line makes the function idempotent which is what react strict mode wants
				const newServerOptions = prevServerOptions.filter(server => server.name !== newServerName)
				newServerOptions.push({ name: newServerName })
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
