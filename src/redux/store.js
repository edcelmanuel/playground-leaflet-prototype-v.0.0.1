import { configureStore } from "@reduxjs/toolkit"
import markerPinsSlice from "./slices/markerPinsSlice"

export const store = configureStore({
	reducer: { markerPins: markerPinsSlice },
})
