import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
	return (
		<>
			<Rotation />
			<Schedule />
			<Cut />
			<Introduce />
		</>
	)
}

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
		</div>
	)
}

export default App
