import './app.css'
import { sectionDomain } from './app'

function Options({ optionsAreOpen, newServerIsOpen, serverOptions }) {
	return (
		<div id="introduce" className="squareBubble">
			<div className="bubbleLabel">Add New Servers</div>
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

export default Introduce
