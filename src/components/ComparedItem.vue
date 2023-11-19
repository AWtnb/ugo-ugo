<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="content">
    <span class="inner">{{ content }}</span>
  </div>
</template>

<style scoped>
.content {
  padding: 2px;
  width: 50%;
  border-left: 1px solid;
  display: flex;
}
.content .inner {
  display: inline-block;
  margin: auto;
}
</style>
