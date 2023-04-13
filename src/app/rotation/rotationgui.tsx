import { sectionDomain } from '../app'

export default function Rotation(props: sectionDomain) {
	return (
		<div id="rotation" className="squareBubble">
			<div className="bubbleLabel">Rotation</div>
			{props.localList.map((server, index) => {
				return (
					<div key={index.toString()}>
						<div className="block gear centerText">C</div>
						<div className="block middle">
							<div className="block slice">{server.topDisplay}</div>
							<div className="block slice">{server.bottomDisplay}</div>
						</div>
						<div className="block undo centerText">U</div>
					</div>
				)
			})}
		</div>
	)
}
