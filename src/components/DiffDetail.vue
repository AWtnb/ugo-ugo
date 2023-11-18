<script setup lang="ts">
import { computed } from "vue";
import Arrowed from "./Arrowed.vue";
import { DiffEntry, FromEntry, ToEntry } from "../helpers/diff";

const props = defineProps<{
  entry: FromEntry | ToEntry;
  asDest: boolean;
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
    <Arrowed :class="{ unchanged: de.isUnchanged }" :as-dest="asDest" v-for="(de, idx) in diffEntries" :key="idx">{{ de.position }}</Arrowed>
  </div>
  <div v-else>
    <div class="lost" v-if="asDest">LOST!</div>
    <div class="new" v-else>NEW!</div>
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
.new {
  padding: 0 2px;
  color: red;
  border: 3px double red;
  border-radius: 4px;
  margin-right: 1em;
  font-size: .8em;
}
.lost {
  padding: 0 2px;
  color: gray;
  border: 1px dashed gray;
  border-radius: 4px;
  margin-left: 1em;
  font-size: .8em;
}
</style>

