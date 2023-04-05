import React from 'react'
import logo from './logo.svg'

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
	return <div id="rotation"></div>
}

function Schedule() {
	return <div id="schedule"></div>
}

function Cut() {
	return <div id="cut"></div>
}

function Introduce() {
	return <div id="introduce"></div>
}

export default App
