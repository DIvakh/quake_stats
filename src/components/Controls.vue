<template>
  <div class="logs-controls">
    <button class="back">&larr;</button>
    <button class="next">&rarr;</button>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.logs-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  button {
    background: transparent;
    // backdrop-filter: brightness(1) contrast(0.95);
    border-radius: 50%;
    border: none;
    line-height: 1.1;
    padding: 10px;
    color: white;
    font-size: 1.5rem;

    &.disabled {
      color: grey;
    }
    cursor: pointer;
    transition: all 0.1s ease;
    margin-bottom: 30px;
    margin-top: 30px;

    &:hover {
      transform: scale(110%);
    }
  }
}
</style>
