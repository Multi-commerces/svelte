<script lang="ts">
  import {
    clockO,
    locationArrow,
  } from "svelte-awesome/icons";
  import BadgeField from "../common/card/BadgeField.svelte";

  export let position: any = {};
</script>

<nord-stack id="stack-root" direction="horizontal">
  <BadgeField
    icon={clockO}
    title="date (relevé)"
    value={position?.date?.toLocaleString()}
  />

  <BadgeField icon={locationArrow} title="altitude" value="undefined" />

  <BadgeField
    icon={locationArrow}
    title="lat/long"
    value="[{position?.coords?.lat},{position?.coords?.long}]"
  />
</nord-stack>

<style>
  @media screen and (max-width: 1280px) {
    #stack-root {
      flex-direction: column;
    }
  }
</style>
