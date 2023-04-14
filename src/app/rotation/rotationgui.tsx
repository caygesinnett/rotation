import { useState } from 'react'
import { sectionDomain } from '../app'
import Server from '../server'

export default function Rotation(props: sectionDomain) {
	const [rotation, setRotation] = useState<Array<Server>>([...props.localList])
	return (
		<div id="rotation" className="squareBubble">
			<div className="bubbleLabel">Rotation</div>
			{rotation.map((server, index) => {
				return (
					<div key={index.toString()} className="block flex">
						<div className="gear centerText" onClick={() => props.globalStateModifiers.cut(server.name)}>
							C
						</div>
						<div className="middle">
							<div className="slice">{server.topDisplay}</div>
							<div className="slice">{server.bottomDisplay}</div>
						</div>
						<div className="undo centerText" onClick={() => props.globalStateModifiers.undo(server.name)}>
							U
						</div>
					</div>
				)
			})}
		</div>
	)
}
