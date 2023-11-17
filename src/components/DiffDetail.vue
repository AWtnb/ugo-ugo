<script setup lang="ts">
import { computed } from "vue";
import Arrowed from "./Arrowed.vue";
import { DiffEntry, FromEntry, ToEntry } from "../helpers/diff";

const props = defineProps<{
  entry: FromEntry | ToEntry;
  isReversed: boolean;
}>();

const diffEntries = computed((): DiffEntry[] => {
  return props.entry.getInfo();
});

const isMulti = computed((): boolean => {
  return 1 < diffEntries.value.length;
});
</script>

<template>
  <div v-if="diffEntries.length" :class="{ multi: isMulti }" class="diff-box">
    <Arrowed :class="{ unchanged: de.isUnchanged }" :is-reversed="isReversed" v-for="(de, idx) in diffEntries" :key="idx">{{ de.position }}</Arrowed>
  </div>
</template>

<style scoped>
.diff-box {
  display: block;
}
.multi {
  border: 1px solid tomato;
  border-radius: 4px;
}
.unchanged {
  color: #ccc;
  font-weight: normal;
}
:not(.unchanged) {
  font-weight: bold;
}
</style>

