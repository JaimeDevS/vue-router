<template>
  <div>
    <p><strong>Código</strong> {{ id }} / {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
    props: ['id'],
}
</script>

<style>

</style>