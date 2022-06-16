import L from "leaflet"

const fireIcon = new L.Icon({
	iconUrl: "/fire.svg",
	iconRetinaUrl: "/fire.svg",
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75),
})

const waterIcon = new L.Icon({
	iconUrl: "/water.svg",
	iconRetinaUrl: "/water.svg",
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75),
})

export { fireIcon, waterIcon }
