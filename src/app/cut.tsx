import './app.css'
import { sectionDomain } from './app'

export default function Cut(props: sectionDomain) {
	return (
		<div id="cut" className="squareBubble">
			<div className="bubbleLabel">Cut Servers</div>
			{props.localList.map((whoever, index) => {
				return (
					<div className="block centerText" key={index.toString()} onClick={() => props.globalStateModifiers[0](whoever.name)}>
						{whoever.name}
					</div>
				)
			})}
		</div>
	)
}
