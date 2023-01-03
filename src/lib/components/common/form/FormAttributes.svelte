<script lang="ts">
  import InputField from "./InputField.svelte";
  import definition from "../../../utils/definition";

  // TYPE (exemple : product, pricing, shipping ...)
  export let type;

  // ATTRIBUTES ({ data : { attributes : {}, links : {} } })
  export let attributes: any;

  // DEFINITION (on y retrouve : key, require, type)
  let defFields;
  $: if (type && attributes) defFields = definition(type, attributes);
</script>

{#each defFields as defField}
  <InputField {defField} name={defField.key} bind:value={attributes[defField.key]} />
{:else}
  <p>Chargement du formulaire en-cours...</p>
{/each}
<!-- <pre>{JSON.stringify(attributes, null, 2)}</pre> -->
