<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    writable,
    type Subscriber,
    type Unsubscriber,
    type Writable
  } from "svelte/store";
  import { fade } from "svelte/transition";
  import type { SyngleJsonAPI } from "../../../../services/store";
  import definition from "../../../utils/definition";
  import translate from "../../../utils/translate";
  import { setHasError } from "../../../utils/validate";
  import FormRelationShips from "./FormRelationShips.svelte";
  import Input from "./InputField.svelte";

  export let params = "";

  // PROPS
  export let documentStores: {
    search: (id: string, params?: string) => void;
    subscribe: (
      this: void,
      run: Subscriber<SyngleJsonAPI<any>>,
      invalidate?: any
    ) => Unsubscriber;
    edit: () => void;
    create: () => void;
    delete: () => void;
    reset: () => void;
  };

  // STORES : document Json:API (custom-stores)
  let document: Writable<SyngleJsonAPI<any>> = writable({
    data: {
      id: undefined,
      type: undefined,
      attributes: {},
    },
  });
  documentStores.subscribe((value) => {
    if (!value.data.id) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      id ? documentStores.search(id, params) : document.set(value);
    } else {
      document.set(value);
    }
  });

  // ERROR message
  $: error = undefined;
  let form;
  let errMessage = "";
  let isSuccessVisible = false;
  let submitted = false;

  /**
   * Validation du formulaire (cf. nord-input.form-field)
   * TODO : N'est pas une solution solid dans le long terme.
   */
  let validateForm = () => {
    if (form) {
      errMessage = "Aide à la saisie : ";

      const elements = form.querySelectorAll(".form-field");
      error = false;

      errMessage += "<ul style='margin-left:1.2rem'>";
      elements.forEach((element) => {
        let input = element.shadowRoot.getElementById("input");

        const isOk = input.validity.valid;
        if (!isOk) {
          errMessage +=
            "<li>" + input.name + ": " + input.validationMessage + "</li>";
          element.error = input.validationMessage;
        }
        error = !isOk ? true : error;
      });
      errMessage += "</ul>";

      if (error) {
        setHasError(error);
      } else {
        isSuccessVisible = true;
      }
    }
  };

  // TODO : il faut reprendre la logique
  function Continue() {
    submitted = true;
    validateForm();
  }

  // DEFINITION DU DOCUMENT
  $: defFields = definition($document?.data?.type, $document?.data?.attributes);


  onDestroy(() => {
    documentStores.reset();
  });

  // Validation sur chargement du form
  addEventListener("load", (event) => {
    validateForm();
  });
</script>

<nord-toast-group />
{#if $document.data}
  <!-- document JSON:API -->
  <nord-card>
    <span slot="header">
      {translate("document") +  " - " + translate($document.data.type, "fr", false)}
    </span>
    <form id="surveyForm" bind:this={form} class="mt-4" class:submitted>
      {#each defFields as defField}
        <Input {defField}
          {validateForm}
          name={defField.key}
          bind:value={$document.data.attributes[defField.key]} />
      {:else}
        <p>Chargement du formulaire en-cours...</p>
      {/each}

      <div style="margin-top: 1rem;">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <nord-button
          type="boutton"
          on:click|preventDefault={() => history.back()}>Annuler</nord-button
        >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <nord-button
          type="boutton"
          disabled={error}
          on:click|preventDefault={$document.data.id
            ? documentStores.edit
            : documentStores.create}>Enregistrer</nord-button
        >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <nord-button
          type="boutton"
          disabled={error}
          on:click|preventDefault={Continue}>Validation</nord-button
        >
      </div>

      {#if error}
        <p class="error-alert">{@html errMessage}</p>
      {:else if isSuccessVisible}
        <p class="sucess-alert" transition:fade={{ duration: 150 }}>
          Data updated successfully
        </p>
      {/if}
    </form>
  </nord-card>

  {#if $document.included && $document.data.relationships}
    <FormRelationShips
      included={$document.included}
      relationships={$document.data.relationships}
    />
  {/if}
{:else}
  Aucun document ...
{/if}

<!-- <nord-card>
  <h2 slot="header">Document JSON:API</h2>
  <pre>{JSON.stringify($document, null, 2)}</pre>
</nord-card> -->

<style>
</style>
