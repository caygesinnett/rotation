import React, { useState } from 'react'
import logo from './logo.svg'
import './app.css'

function App() {
	const [isOpen, setIsOpen] = useState(false)

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

	function Introduce() {
		return (
			<div id="introduce" className="squareBubble">
				<div className="bubbleLabel">Add New Servers</div>
				<Open />
			</div>
		)
	}

	function Open() {
		const openOrClose = () => (isOpen ? setIsOpen(false) : setIsOpen(true))
		return (
			<div className="block centerText" onClick={openOrClose}>
				{isOpen ? 'Close' : 'Add Server to Schedule'}
			</div>
		)
	}

	return (
		<>
			<Rotation />
			<Schedule />
			<Cut />
			<Introduce />
		</>
	)
}

export default App
