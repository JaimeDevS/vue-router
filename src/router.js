import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/inicio.vue'
import Usuario from './components/usuario/Usuario.vue'
import UsuarioLista from './components/usuario/UsuarioLista.vue'
import UsuarioDetalhe from './components/usuario/UsuarioDetalhe.vue'
import UsuarioEditar from './components/usuario/UsuarioEditar.vue'
import Menu from './components/template/menu.vue'
import MenuAlt from './components/template/menuAlt.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'inicio',
            path: '/',
            //component: Inicio
            components: {
                default: Inicio,
                menu: Menu,
            }
        },
        {
            path: '/usuario',
            //Component: Usuario,
            components: {
                default: Usuario,
                menu: MenuAlt,
                menuInferior: MenuAlt
            },
            props: true,
            children: [
                { path: '', component: UsuarioLista },
                { path: ':id', component: UsuarioDetalhe, props: true },
                { path: ':id/editar', component: UsuarioEditar, props: true, name: 'editarUsuario' },                
            ]
        },
        {
            path: '/redirecionar',
            redirect: '/usuario'
        }
    ]
})