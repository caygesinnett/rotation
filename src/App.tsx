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
	return <div id="rotation" className="squareBubble"></div>
}

function Schedule() {
	return <div id="schedule" className="squareBubble"></div>
}

function Cut() {
	return <div id="cut" className="squareBubble"></div>
}

function Introduce() {
	return <div id="introduce" className="squareBubble"></div>
}

export default App
