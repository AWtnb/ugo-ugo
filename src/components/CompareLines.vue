<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { SortDiff } from "../helpers/diff.js";
import SimpleTextarea from "./SimpleTextarea.vue";
import DiffTable from "./DiffTable.vue";
import Connector from "./Connector.vue";

const defaultFrom = "A組\tスズキ\nA組\tイマイ\nB組\tトクナガ\nB組\tミキ\nB組\tナカニシ\nC組\tカワムラ\nC組\tフジムラ\nD組\tモチヅキ\nE組\tクハラ\nE組\tカザマ";
const defaultTo = "A組\tカワムラ\nA組\tナカニシ\nB組\tトクナガ\nB組\tクハラ\nB組\tミキ\nC組\tトクナガ\nC組\tモチヅキ\nD組\tフジムラ\nE組\tイシゴウオカ\nE組\tイマイ";

const fromLines: Ref<string[]> = ref([]);
const updateFromContent = (s: string) => {
  fromLines.value = s.split("\n");
};

const toLines: Ref<string[]> = ref([]);
const updateToContent = (s: string) => {
  toLines.value = s.split("\n");
};

const hasContent = computed(() => {
  return (a: Array<string>) => {
    return 0 < a.filter(x => x.trim().length).length
  }
})

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
      <DiffTable v-if="hasContent(fromLines)" :rows="diff.getDestination()" :is-left-side="true" />
    </div>
    <Connector/>
    <div class="box">
      <SimpleTextarea v-on:update-content="updateToContent" :default-val="defaultTo" />
      <DiffTable v-if="hasContent(toLines)" :rows="diff.getHistory()" :is-left-side="false" />
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

