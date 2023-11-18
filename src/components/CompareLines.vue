<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { SortDiff } from "../helpers/diff.js";
import SimpleTextarea from "./SimpleTextarea.vue";
import DiffTable from "./DiffTable.vue";

const defaultFrom = "常陸\t佐竹\n越後\t上杉\n安芸\t毛利";
const defaultTo = "秋田\t佐竹\n米沢\t上杉\n周防\t毛利";

const fromLines: Ref<string[]> = ref([]);
const updateFromContent = (s: string) => {
  fromLines.value = s.split("\n");
};

const toLines: Ref<string[]> = ref([]);
const updateToContent = (s: string) => {
  toLines.value = s.split("\n");
};

const diff = computed(() => {
  const d = new SortDiff(fromLines.value, toLines.value);
  d.checkDestination();
  d.checkHistory();
  return d;
});
</script>

<template>
  <div class="container">
    <div class="box">
      <SimpleTextarea v-on:update-content="updateFromContent" :default-val="defaultFrom" />
      <DiffTable v-if="fromLines.length" :rows="diff.getDestination()" :is-left-side="true" />
    </div>
    <div class="box">
      <SimpleTextarea v-on:update-content="updateToContent" :default-val="defaultTo" />
      <DiffTable v-if="toLines.length" :rows="diff.getHistory()" :is-left-side="false" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 900px;
  justify-content: space-between;
}
.box {
  width: 400px;
  min-height: 400px;
}
</style>

