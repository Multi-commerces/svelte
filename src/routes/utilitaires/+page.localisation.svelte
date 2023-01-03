<script lang="ts">
  // import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import Icon from "svelte-awesome";
  import { hourglassStart } from "svelte-awesome/icons";
  import MyMap from "../../lib/components/geolocalisation/MyMap.svelte";
  import {
    distanceTwoGeoPoints,
    reverse,
  } from "../../lib/utils/GeoLocationTool";
  import GeocodageCard from "../../lib/components/geolocalisation/GeocodageCard.svelte";
  import RealTimeCard from "../../lib/components/geolocalisation/RealTimeCard.svelte";
  import GeoLocationStack from "../../lib/components/geolocalisation/GeoLocationStack.svelte";

  $: positions = new Array();
  $: watchID = undefined;
  $: currenttimestamp = undefined;
  $: currentLatitude = undefined;
  $: currentLongitude = undefined;
  $: [lastPosition] = positions.slice(-1);

  // géocoding de lastPosition
  let address = undefined;

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const checkGeoPosition = (geoPosition: GeolocationPosition) => {
    let isValid = false;
    const coords = geoPosition?.coords;

    // On ignore les posiotions avec une précision > 10m
    isValid = coords?.latitude != undefined && coords?.longitude != undefined;
    // coords?.accuracy <= 15;

    // test de la distance avec la position précédente
    if (isValid == true && currentLatitude !== undefined) {
      const distance = distanceTwoGeoPoints(
        lastPosition?.coords?.lat,
        lastPosition?.coords?.long,
        coords?.latitude,
        coords?.longitude
      );

      isValid = distance >= 10;
    }

    return isValid;
  };

  const success = async (geoPosition: GeolocationPosition) => {
    // const geoPosition = await gp;

    if (checkGeoPosition(await geoPosition) === true) {
      const coords: GeolocationCoordinates = geoPosition?.coords;

      // mètres
      let distance = undefined;
      // secondes
      let timeelapsed = undefined;
      let speed = undefined;
      if (lastPosition && coords?.latitude && coords?.longitude) {
        distance = distanceTwoGeoPoints(
          lastPosition.coords.lat,
          lastPosition.coords.long,
          coords?.latitude,
          coords?.longitude
        );

        // converting milliseconds to seconds
        timeelapsed = (geoPosition.timestamp - currenttimestamp) / 1000;

        //speed = distance (x3600)/time (/1000)
        speed = (distance / timeelapsed) * 3.6;
      }

      currenttimestamp = geoPosition?.timestamp;
      currentLatitude = coords?.latitude;
      currentLongitude = coords?.longitude;
      // if (speed <= 250 || !speed) {

      positions = new Array(...positions);

      positions.push({
        watchID,
        coords: { lat: currentLatitude, long: currentLongitude },
        timestamp: currenttimestamp,
        accuracy: coords?.accuracy,
        distance,
        timeelapsed,
        speed,
        date: new Date(),
      });
      // }
      address = await reverse(currentLatitude, currentLongitude);
    }
  };

  const start = () => {
    watchID = navigator.geolocation.watchPosition(success, () => {}, options);
    setInterval(function () {
      watchID = navigator.geolocation.watchPosition(success, () => {}, options);
    }, 1000);
  };

  //https://www.openstreetmap.org/#map=8/
  // $: urlOpenStreetmap = "";
  onMount(() => {});
</script>

<nord-toast-group />

{#if watchID == undefined}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <nord-button
    target="_blank"
    type="button"
    size="l"
    variant="primary"
    on:click|preventDefault={() => start()}
  >
    <nord-stack direction="horizontal" style="margin:auto">
      <Icon data={hourglassStart} scale={2.5} />
      <div style="width: 300px;">
        <span>LOCALISATION<br />GO !</span>
      </div>
    </nord-stack>
  </nord-button>
{:else if !lastPosition}
  Geolocation en-cours ... .
{:else}
  <nord-stack direction="vertical" gap="s">
    <GeocodageCard address={address} />
    <RealTimeCard position={lastPosition} />
    
    {#if lastPosition != undefined && positions != undefined}
      <nord-card>
        <h2 slot="header">Map</h2>
        <nord-stack direction="vertical" gap="s" />
        {#if lastPosition}
          <MyMap {positions} />
          <GeoLocationStack position={lastPosition} />
        {/if}
      </nord-card>
    {/if}
  </nord-stack>
{/if}

<style>
  @media screen and (max-width: 1280px) {
    nord-card {
      display: block;
      flex: none;
      width: 100%;
    }
  }
</style>
