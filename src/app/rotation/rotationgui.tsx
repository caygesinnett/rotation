/* {rotatingServers.map((server, index) => {
		return <RotatingServer key={index.toString()}>{server}</RotatingServer>
	})} */

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
