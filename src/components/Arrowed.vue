<script setup lang="ts">
defineProps<{ isReversed: boolean }>();
</script>

<template>
  <div class="arrow" :class="{ reversed: isReversed }"><slot></slot></div>
</template>
<style scoped>
.arrow {
  display: block;
}
:not(.reversed)::before {
  content: "⇒";
}
.reversed::after {
  content: "⇒";
}
li {
  list-style: none;
}
</style>
