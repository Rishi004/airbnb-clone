import { getCenter } from "geolib";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";

function MapBox({ searchResults }) {
    const [map, setMap] = useState(null);
    // const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (!searchResults || searchResults.length === 0) return;
        const coordinates = searchResults.map((result) => ({
            longitude: result.long,
            latitude: result.lat,
            title: result.title
        }));
        const center = getCenter(coordinates);

        mapboxgl.accessToken =
            "pk.eyJ1IjoicmlzaGkwMDQiLCJhIjoiY2xxMjQxeHRyMDA5MDJpcHEwMHR6d2ZncSJ9.bARSei0ueJtl8hSgJ1-ZtQ";

        const newMap = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/rishi004/clq28j3j901tl01o0aig273fq",
            center: [center.longitude, center.latitude],
            zoom: 11
        });

        setMap(newMap);

        // markers.forEach((marker) => marker.remove());

        // const newMarkers = coordinates.map((coord) => {
        //     const markerElement = document.createElement("div");
        //     markerElement.title = coord.title;

        //     return new mapboxgl.Marker(markerElement)
        //         .setLngLat([coord.longitude, coord.latitude])
        //         .addTo(newMap);
        // });

        // setMarkers(newMarkers);

        return () => {
            newMap.remove();
            // newMarkers.forEach((marker) => marker.remove());
        };
    }, [searchResults]);

    return <div id="map" style={{ width: "100%", height: "2050px" }} />;
}

export default MapBox;
