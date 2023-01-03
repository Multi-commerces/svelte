<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  let modal;

  export let show = false;
  export let feature;

  $: if (show) {
    modal.showModal();
  }

  onMount(() => {});
</script>

<nord-modal bind:this={modal} size="m" aria-labelledby="title">
  {feature}
  {#if feature}
    <div slot="feature">
      <img src={feature} alt="_blank" title="feature image" />
    </div>
  {/if}

  <div class="n-reset n-typeset">
    <h2>Lorem ipsum dolor sit</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
      deleniti nemo sequi voluptates fugit id, facere velit? Possimus, nobis
      sit.
    </p>
    <p>Modi, beatae debitis suscipit fugit et obcaecati vitae laudantium.</p>
    <p>
      Facere dicta tenetur, a quam veniam ratione, nam minus, odio cumque ipsam
      dolores! Eligendi et ipsum praesentium obcaecati! Accusamus, tenetur?
    </p>
  </div>

  <!-- <nord-button on:preventDefault expand variant="primary">Finish</nord-button> -->
</nord-modal>
