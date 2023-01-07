<!-- svelte-ignore custom-element-no-tag -->
<script lang="ts">
  import FormDocument from "../../lib/components/common/form/FormDocument.svelte";
  import { documentJson } from "../../services/store";
  import { defaultValues } from "./stores";

  // STORES : document Json:API (custom-stores)
  export const documentStores = documentJson("category", "categories", null, {
    ...defaultValues, // données par défault d'une catégorie
  });
</script>

<FormDocument {documentStores} />