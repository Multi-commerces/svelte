<script lang="ts">
  import ModalSimple from "../modal/ModalSimple.svelte";
  import translate from "../../../utils/translate";

  export let value: any;
  export let name: string = "reference";
  // Input - définition
  export let defField;
  //This field is required
  // facultatif utilisé pour placer une icône ou un préfixe au début de l'entrée.
  export let prefix: string = undefined;
  export let prefixType: string = "text" || "icon";
  // facultatif utilisé pour placer une icône ou un suffixe à la fin de l'entrée.
  export let suffix: string = undefined;
  export let suffixType: string = "text" || "icon";

  export let validateForm = () => {};

  

  let formDef = new Array();
  if (value && value instanceof Object) {
    Object.entries(value).forEach(([key, v]) => {
      formDef.push({ key, type: "string", value: v });
    });
  }

  // Input - bind input
  let inputField;

  // Label - traduction 'fr' avec la première lettre en majuscule
  let label = translate(name, "fr", true);

  // Event - évènement input
  const handleKeyUp = (e: Event) => {
    value = inputField.value ? inputField.value : null;
    error = inputField.shadowRoot.getElementById("input").validationMessage;
    inputField.shadowRoot.getElementById("input").reportValidity();

    // Validation du formulaire
    validateForm();
  };
  $: error = inputField?.shadowRoot?.getElementById("input")?.error;

  let showModal = false;

  $: src = value;
</script>

<div id="demo" />
{#if !(value instanceof Object)}
  <nord-input
    class="form-field"
    size="s"
    id={name}
    role=""
    {error}
    hideRequired={true}
    readonly={defField.readonly}
    required={defField.require}
    bind:this={inputField}
    value={defField.converter ? defField.converter(value, "text") : value}
    name={label}
    type={defField.type}
    on:input={handleKeyUp}
  >
    <!-- SLOT LABEL : libellé de champ -->
    <span slot="label">
      {label}
      <!-- {#if inputDef.require || inputDef.require}
        <span style="color:red"> *</span>
      {/if} -->
    </span>

    <!-- SLOT START : début de l'entrée -->
    {#if prefix}
      {#if prefixType === "text"}
        <!-- placer un texte au début de l'entrée -->
        <span slot="start">{prefix}</span>
      {:else}
        <!-- placer une icone au début de l'entrée -->
        <nord-icon slot="start" size="s" name={prefix} />
      {/if}
    {/if}

    {#if error}
      <nord-icon slot="end" size="s" name="interface-warning" />
    {:else}
      <nord-icon slot="end" size="s" name="generic-database" />
    {/if}

    <!-- SLOT END : fin de l'entrée -->
    {#if suffix}
      {#if suffixType === "text"}
        <!-- placer un texte à la fin de l'entrée -->
        <span slot="end">{suffix}</span>
      {:else}
        <!-- placer une icone à la fin de l'entrée -->
        <nord-icon slot="end" size="s" name={suffix} />
      {/if}
    {/if}
  </nord-input>

  {#if String(value).includes("http")}
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <!-- svelte-ignore security-anchor-rel-noreferrer -->
    
    
   
    <!-- svelte-ignore missing-declaration -->
    <ModalSimple show={showModal} feature={src}></ModalSimple>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <nord-button  type="button" 
    onclick={() => showModal = true} variant="primary">Open</nord-button>
  
  {/if}
{/if}
