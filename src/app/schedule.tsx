import './app.css'
import Server from './server'
import { sectionDomain } from './app'

function Schedule(props: sectionDomain) {
	return (
		<div id="schedule" className="squareBubble">
			<div className="bubbleLabel">Scheduled Servers</div>
			{props.localList.map((whoever, index) => {
				return (
					<div className="block centerText" key={index.toString()} onClick={() => props.changeList(whoever.name)}>
						{whoever.name}
					</div>
				)
			})}
		</div>
	)
}

export default Schedule
