<script lang="ts">
  import Icon from "svelte-awesome";

  export let value;
  export let title;
  export let icon;
  export let scale = 2.5;

  function handleMouseIn(event) {
    event.target.querySelector("svg").classList.toggle("fa-pulse");
  }
  function handleMouseOut(event) {
    event.target.querySelector("svg").classList.toggle("fa-pulse");
  }
</script>

<nord-stack direction="horizontal">
  <div>
    <Icon data={icon} {scale} />
  </div>
  {#if title}
    <div>
      <b>{title}</b><br />
      <span>{@html value ?? "-"}</span>
    </div>
  {:else}
    <div>{@html value ?? "-"}</div>
  {/if}
</nord-stack>

<style>
  @media screen and (max-width: 1280px) {
    nord-stack {
      width: 100%;
    }
  }
  /* nord-stack div {
    padding: var(--n-space-s);
  } */
</style>
