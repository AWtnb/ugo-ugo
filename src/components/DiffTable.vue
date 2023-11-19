<script setup lang="ts">
import { FromEntry, ToEntry } from "../helpers/diff.js";
import DiffDetail from "./DiffDetail.vue";
import ComparedItem from "./ComparedItem.vue";

const props = defineProps<{
  rows: Array<FromEntry | ToEntry>;
  isLeftSide: boolean;
}>();
</script>

<template>
  <div class="conteiner">
    <div class="row" v-for="(rowEnt, idx) in props.rows" :key="idx">
      <div class="header">
        <div v-if="isLeftSide">{{ rowEnt.position }}</div>
        <DiffDetail :entry="rowEnt" :as-dest="isLeftSide" />
        <div v-if="!isLeftSide">{{ rowEnt.position }}</div>
      </div>
      <ComparedItem :content="rowEnt.text"/>
    </div>
  </div>
</template>

<style scoped>
.container .row:nth-child(odd) {
  background: #efefef;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
}
.header {
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  width: 50%;
  padding: 2px;
}
</style>
