export class Table {
	seating: Date
	constructor() {
		this.seating = new Date()
	}
}

export type location = 'options' | 'schedule' | 'rotation' | 'cut'

export default class Server {
	name: string
	tables: Array<Table>
	ideal: number
	location: location
	arrival: Date | null
	left: Date | null
	constructor(object: Partial<Server>) {
		this.name = 'Error'
		this.tables = []
		this.ideal = 0
		this.location = 'options'
		this.arrival = null
		this.left = null
		for (const property in object) {
			// @ts-expect-error
			this[property] = object[property]
		}
	}

	reset(): void {
		this.tables = []
		this.ideal = 0
		this.arrival = null
		this.left = null
	}

	get time(): string {
		let now = new Date()
		if (this.arrival) now = this.arrival
		const hour = now.getHours() % 12 === 0 ? '12' : JSON.stringify(now.getHours() % 12)
		const minute = now.getMinutes() < 10 ? '0' + JSON.stringify(now.getMinutes()) : JSON.stringify(now.getMinutes())
		return hour + ':' + minute
	}

	get behind(): number {
		return this.ideal - this.tables.length
	}
}
