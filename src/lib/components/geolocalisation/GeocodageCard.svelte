<script lang="ts">
  import map from "svelte-awesome/icons/map";
  import BadgeField from "../common/card/BadgeField.svelte";

  export let address;
</script>

 <nord-card>
    <h2 slot="header">Géocodage</h2>
    <BadgeField
      icon={map}
      value={address?.features[0]?.properties?.label}
      title={address?.features[0]?.properties?.context}
    />
  </nord-card>