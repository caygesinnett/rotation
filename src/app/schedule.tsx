import { sectionDomain } from './app'

export default function Schedule(props: sectionDomain) {
	return (
		<div id="schedule" className="squareBubble">
			<div className="bubbleLabel">Scheduled Servers</div>
			{props.localList.map((whoever, index) => {
				return (
					<div className="block centerText" key={index.toString()} onClick={() => props.globalStateModifiers.arrival(whoever.name)}>
						{whoever.name}
					</div>
				)
			})}
		</div>
	)
}
