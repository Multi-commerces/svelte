<script lang="ts">
  import L from "leaflet";
  import { onMount } from "svelte";
  import "leaflet/dist/leaflet.css"; //Don't forget to declare leaflet css
  import { Map, TileLayer, Marker, Popup } from "svelte-map-leaflet";
  // import "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";

  export let positions;
  let position;
  let options;
  $: if (positions != undefined && positions.length > 0) {
    position = positions[positions.length - 1];
    options = {
      center: [position.coords.lat, position.coords?.long],

      zoom: 18,
      iconAnchor: [-15, -15],
    };
  }

  /* MAP */
  let leafflet;

  onMount(() => {});

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 2,
    maxZoom: 18,
    maxNativeZoom: 40,
    attribution: "© OpenStreetMap contributors",
  };

  /* MARKER */
  let marker;
  /* Marker - Latitude et Longitude*/
  let markerLatLng;
  $: if (position?.coords) {
    markerLatLng = [position.coords.lat, position.coords.long];
  }
  const popupMessage = "Statue of Liberty National Monument";
  /* Marker - Icon*/
  const iconMarker = L.divIcon({
    html: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#0f3754" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>`,
    iconAnchor: [15, 35],
  });
  /* Marker - Options*/
  const optionMarker = {
    icon: iconMarker,
  };

  let markers = [];
  $: if (leafflet) {
    const map = leafflet.getInstance();

    const latlngs = new Array();

    // positions = new Array(...positions);
    positions?.forEach((position) => {
      latlngs.push([position.coords.lat, position.coords.long]);
    });

    /* identification du clic sur la carte avec place d'un point */
    //  https://leafletjs.com/reference.html#mouseevent
    map.on("click", (e) => {
      markers = new Array(...markers);
      markers.push(e.latlng);

      L.marker(e.latlng, { icon: iconMarker }).addTo(map);
    });

    /* Dessin du trajet */
    if (latlngs.length > 1) {
      const polyline = L.polyline(latlngs, { color: "#AF2527" }).addTo(map);
      map.fitBounds(polyline.getBounds());
    }
  }
</script>

<div class="map displayed">
  <Map bind:this={leafflet} {options}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
      <Marker bind:this={marker} latLng={markerLatLng}>
        <Popup>{popupMessage}</Popup>
      </Marker>
  </Map>
</div>

<!-- {/if} -->
<style>
  .map {
    height: 400px;
    width: 100%;
  }
</style>
