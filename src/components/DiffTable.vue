<script setup lang="ts">
import { FromEntry, ToEntry } from "../helpers/diff.js";
import DiffDetail from "./DiffDetail.vue";
const props = defineProps<{
  rows: Array<FromEntry | ToEntry>;
  isReversed: boolean;
}>();
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(rowEnt, idx) in props.rows" :key="idx">
        <td v-if="isReversed" class="diff-info">
          <DiffDetail :entry="rowEnt" :is-reversed="isReversed" />
        </td>
        <td class="header">{{ rowEnt.position }}</td>
        <td class="content">{{ rowEnt.text }}</td>
        <td v-if="!isReversed" class="diff-info">
          <DiffDetail :entry="rowEnt" :is-reversed="isReversed" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table tbody tr:nth-child(odd) {
  background: #efefef;
}
table {
  border: 2px solid #555;
}
td {
  border: none;
  border-right: 1px solid #555;
  border-left: 1px solid #555;
}
.header, .diff-info {
  font-size: 0.7em;
}
.content {
  min-width: 5em;
}
.header {
  color: gray;
  width: fit-content;
}
</style>
