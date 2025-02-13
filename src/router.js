import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/inicio.vue'
//import Usuario from './components/usuario/Usuario.vue'
//import UsuarioLista from './components/usuario/UsuarioLista.vue'
//import UsuarioDetalhe from './components/usuario/UsuarioDetalhe.vue'
//import UsuarioEditar from './components/usuario/UsuarioEditar.vue'
import Menu from './components/template/menu.vue'
import MenuAlt from './components/template/menuAlt.vue'

Vue.use(Router)

//carregamento lazy
//o /* webpackChunkName: "usuario" */ é usado para criar um grupo de componentes para carregamento tardio
const Usuario = () => import(/* webpackChunkName: "usuario" */'./components/usuario/Usuario.vue')
const UsuarioLista = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioLista.vue')
const UsuarioDetalhe = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioDetalhe.vue')
const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar.vue')

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if(savedPosition) {
            return savedPosition
        } else 
        if(to.hash) {
            return { selector: to.hash }
        } else {
            return { x: 0, y: 0 }
        }
    },
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
                { path: ':id', component: UsuarioDetalhe, props: true,  //interceptando a rota de forma específica
                        beforeEnter: (to, from, next) => {
                            console.log('antes da rota -> usuário detalhes')        
                            next()                    
                        }
                    },
                { path: ':id/editar', component: UsuarioEditar, props: true, name: 'editarUsuario' },                
            ]
        },
        {
            path: '/redirecionar',
            redirect: '/usuario'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

//interceptando a rota de forma global
router.beforeEach((to, from, next) => {
    console.log("antes das rotas -> global")   
    next()
})

export default router