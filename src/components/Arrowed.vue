<script setup lang="ts">
defineProps<{ asDest: boolean }>();
</script>

<template>
  <div class="arrow" :class="{ dest: asDest }"><slot></slot></div>
</template>
<style scoped>
.arrow {
  display: block;
}
.dest::before {
  content: "⇒";
}
:not(.dest)::after {
  content: "⇒";
}
</style>
