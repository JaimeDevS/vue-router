<template>
  <div>
    <p><strong>Código</strong> {{ id }} / {{ $route.params.id }}</p>
    <p><strong>Completo:</strong> {{ $route.query.completo ?  'Sim' : 'Não' }}</p>
    <p><strong>Língua:</strong> {{ $route.query.lingua }}</p>
    <hr>
    <button primario @click="confirmou = true">Confirmar</button>
    <div id="rodape">
      <h3>Curso Vue</h3>
    </div>
  </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
      return {
        confirmou : false
      }
    },
    //garante que a saída do componente aconteća no momento certo
    beforeRouteLeave(to, from, next) {
      if(this.confirmou) {
        next()
      } else {
        if(confirm('Tem certeza?')) {
          next()
        } else {
          next(false)
        }
      }
    }
}
</script>

<style>
  #rodape {
    margin-top: 1000px;
  }
</style>