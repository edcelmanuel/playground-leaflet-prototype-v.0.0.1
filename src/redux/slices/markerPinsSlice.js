import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
	defaultLocation: [14.6279, 121.0021],
	pin1: null,
	pin2: null,
	isPin1: true,
	pinEvents: [],
	eventKind: "fire",
}

export const markerPinsSlice = createSlice({
	name: "markerPins",
	initialState,
	reducers: {
		setPins: (state, action) => {
			if (state.pin1 !== null && state.pin2 !== null) {
				state.pin1 = null
				state.pin2 = null
			} else if (state.isPin1) {
				state.pin1 = action.payload.coordinates
			} else {
				state.pin2 = action.payload.coordinates
			}
			state.isPin1 = !state.isPin1
		},
		setPinEvents: (state, action) => {
			state.pinEvents = action.payload
		},
		setEventKind: (state, action) => {
			state.eventKind = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setPins, setPinEvents, setEventKind } = markerPinsSlice.actions

export default markerPinsSlice.reducer
