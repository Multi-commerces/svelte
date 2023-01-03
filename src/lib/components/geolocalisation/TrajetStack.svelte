<script lang="ts">
  import { hourglass, road, bolt } from "svelte-awesome/icons";
  import BadgeField from "../common/card/BadgeField.svelte";

  export let position: any = {};
</script>

<nord-stack direction="horizontal">
  <BadgeField
    icon={road}
    scale={2.5}
    title="Distance (mètres)"
    value={position?.distance}
  />
  <BadgeField
    scale={2.5}
    icon={hourglass}
    title="Durée (secondes)"
    value={position?.timeelapsed}
  />
  <BadgeField
    scale={2.5}
    icon={bolt}
    title="Vitesse moyen (km/h)"
    value={position?.speed}
  />
</nord-stack>
