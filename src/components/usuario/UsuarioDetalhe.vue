<template>
  <div class="usuario-detalhe">
    <h3>Usuario Detalhe</h3>
    <hr>
    <p><strong>Código</strong> {{ id }}</p>
    <!--:to="`/usuario/${id}/editar`"-->
    <router-link tag="button" primario 
        :to="{ name: 'editarUsuario', params: { id }, 
              query: { completo: true, lingua: 'pt' },
              hash: '#rodape' }"> 
      Editar
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['id'],
   //interceptando a rota via componente
  beforeRouteEnter(to, from, next) {
    console.log('dentro do componente -> usuário detalhe');
    // next(vm => {
    //   console.log(vm.id);   //acessando a variável antes da rota   
    // })
    const autenticado = true
    autenticado ? next() : next(false)
  }

  // data() {
  //   return {
  //     id: this.$route.params.id
  //   }
  // },
  // watch: {
  //   $route(to, from) {
  //     this.id = to.params.id
  //   }
  // },
}
</script>

<style>

</style>