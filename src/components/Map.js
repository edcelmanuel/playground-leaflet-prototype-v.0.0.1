import React, { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useDispatch, useSelector } from "react-redux"
import { setPins } from "../redux/slices/markerPinsSlice"

import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import RouteMachine from "./RouteMachine"
import { socket } from "../helpers/initIO"
import { fireIcon, waterIcon } from "./MapMarker"

export const Map = () => {
	const position = useSelector((state) => state.markerPins.defaultLocation)
	const pin1 = useSelector((state) => state.markerPins.pin1)
	const pin2 = useSelector((state) => state.markerPins.pin2)

	const pinEvents = useSelector((state) => state.markerPins.pinEvents)

	var LeafIcon = L.Icon.extend({
		options: {
			shadowUrl: "marker-icon.png",
			iconSize: [38, 95],
			shadowSize: [50, 64],
			iconAnchor: [22, 94],
			shadowAnchor: [4, 62],
			popupAnchor: [-3, -76],
		},
	})

	return (
		<MapContainer
			center={position}
			zoom={13}
			style={{ width: "100%", height: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				// url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=abf6bfd540184e2e89733210a56ba001"
				url="http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
				subdomains={["mt0", "mt1", "mt2", "mt3"]}
			/>
			{/* <MyComponent />

			{pin1 && <Marker position={pin1} />}
			{pin2 && <Marker position={pin2} />}
			{pin1 && pin2 && <RouteMachine pin1={pin1} pin2={pin2} />} */}
			<AddingMarks />
			{pinEvents.map((item, key) => {
				if (item.event === "fire") {
					return <Marker position={item.coor} key={key} icon={fireIcon} />
				} else if (item.event === "water") {
					return <Marker position={item.coor} key={key} icon={waterIcon} />
				}
				return <Marker position={item.coor} key={key} icon={fireIcon} />
			})}
		</MapContainer>
	)
}

function MyComponent() {
	const dispatch = useDispatch()
	const map = useMapEvents({
		click: (ev) => {
			// map.locate()
			console.log(map.mouseEventToLatLng(ev.originalEvent))
			const coor = { ...map.mouseEventToLatLng(ev.originalEvent) }
			dispatch(setPins({ coordinates: coor }))
		},
		locationfound: (location) => {
			console.log("location found:", location)
		},
	})
	return null
}

function AddingMarks() {
	const eventKind = useSelector((state) => state.markerPins.eventKind)
	const map = useMapEvents({
		click: (ev) => {
			// map.locate()
			console.log(map.mouseEventToLatLng(ev.originalEvent))
			const coor = { ...map.mouseEventToLatLng(ev.originalEvent) }

			socket.emit("insert_coordinates_events", { coor, event: eventKind })
		},
	})
	return null
}
