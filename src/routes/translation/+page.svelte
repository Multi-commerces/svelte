<!-- svelte-ignore custom-element-no-tag -->
<script lang="ts">
  import { afterUpdate } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import Form from "../../lib/components/common/form/Form.svelte";
  import type { InputFielDef } from "../../lib/utils/rederer";
  import {
    documentSyngleWritable,
    type SyngleJsonAPI,
  } from "../../services/store";

  const action: string =
    "http://localhost:8081/products/10000003?relationships=CATEGORIES&relationships=IMAGES&relationships=LANGS&relationships=PRICING&relationships=SEO&relationships=SHIPPING&relationships=STOCKS&relationships=VARIATIONS";
  const formDef: InputFielDef[] = [
    { key: "reference", type: "string" },
    { key: "quantity", type: "number" },
    { key: "priceHT", type: "number" },
    { key: "taxeRule", type: "number" },
  ];

  let document: Writable<SyngleJsonAPI<any>> = writable(
    $documentSyngleWritable
  );

  afterUpdate(() => {
    // $document.data.type = "product";
  });
</script>

<nord-toast-group>
</nord-toast-group>

<!-- svelte-ignore missing-declaration -->
<Form {action} {formDef} {document} />

<style>
</style>
