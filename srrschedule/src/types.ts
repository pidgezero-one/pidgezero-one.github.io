

interface Column {
	id: string
	label: string
	type: string
}

interface RowColumn {
	v: string
}

interface Row {
	c: (RowColumn | null)[]
}
export interface APIResponse {
	reqId: string
	sig: string
	status: string
	table: {
		cols: Column[]
		parsedNumHeaders: number 
		rows: Row[]
	}
}

export interface Person {
	id: number
	aliases: string[]
	valk?: boolean
}

export interface SheetData {
	main: APIResponse
	social: APIResponse
	onDuty: APIResponse
	resteamer: APIResponse
	people: Person[]
}

export type ShiftType = 'Valk on Duty' | 'Runner' | 'Commentary' | 'Host' | 'Preflight' | 'Socials' | 'Restream'

export interface Shift {
	start: Date 
	end: Date 
	personID: number
	types: ShiftType[]
	runs?: number[]
}

export interface Run {
	id: number
	start: Date 
	end: Date 
	name: string
}
