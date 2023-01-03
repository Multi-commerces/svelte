<script type="ts">
  import Table from "../../lib/components/common/table/Table.svelte";

  const config = {
    title: "Liste des catégories",
    type: "category",
    action: "categories",
    params: "languageCode=fr",
  };
</script>

<Table {...config} />
