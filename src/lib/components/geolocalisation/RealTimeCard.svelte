<script lang="ts">
  import TrajetStack from "./TrajetStack.svelte";

  export let position;
</script>

<nord-card>
  <h2 slot="header">Temps réel</h2>
  <!-- svelte-ignore missing-declaration -->
  <!-- <nord-stack direction="vertical" gap="s"> -->
  <TrajetStack {position} />
  <!-- </nord-stack> -->
</nord-card>
