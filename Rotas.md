# Rotas

## Modos de navegação
- ***Hash:***  http://localhost:8080/#/minha-url
não é enviado para o servidor, fica apenas no browser
somente   http://localhost:8080/ vai ser enviado para o servidor

- ***History:***  http://localhost:8080/minha-url
nesse caso toda url é enviada ao servidor
e precisa configurar o servidor
https://vue-router-docs-pt.netlify.app/guide/essentials/history-mode.html


**Indica onde os componentes serão renderizados**
```html
<router-view />
```

**Faz a requisção**
```html
<router-link />
```


```javascript
this.$router.push("/")
this.$router.push({ path: "/" })
this.$router.push({ name: "nome_da_rota" })
```

**Parâmetros na rota**
```javascript
{
    path: '/'usuario/:id,
    component: Usuario
},
```

**Pegar o id a partir da rota**

```javascript
this.$route.params.id
```

**Monitorando a mudança do valor**

```javascript
watch: {
	$route(to, from) {
		this.id = to.params.id
	}
}
```

**Props**
usando a props vc pode declarar a variável id da rota como props do componente  
e dentro de router colocar props: true
desta forma não há a necessidade de usar o watch para monitorar a mudança do id no rota

```javascript
{
	path: '/'usuario/:id,
	component: Usuario,
	props: true
},
```

**Rotas aninhadas**
```javascript
 {
	path: '/'usuario,
	component: Usuario,
	props: true,
	children: [
		{  path: '''  , component: UsuarioLista } , 
		{  path: ':id' , component: UsuarioDetalhe, props: true } , 
		{  path: ':id/editar , component: UsualrioEditar, props: true } , 
	]
},
```
nesse caso posso usar o ``` <router-view /> ``` dentro do componente Usuario.vue


**Rotas nomeada**
```javascript
<router-link tag=¨ button¨  :to=¨ {  name: 'editarUsuario', params: {  id } } ¨/> Editar </router-link>

this.$router.push({ name: "nome_da_rota" })
```

**Usando Parâmetros da Query**
```javascript
 <router-link tag=¨ button¨  :to=¨ {  name: 'editarUsuario', params: {  id } , query: { completo: true, lingua: 'pt' }   } ¨/> Editar </router-link>

- pegando o valor:

$route.query.completo ? 'sim' : 'não'
$route.query.lingua
```

**Múltiplos Router Views <router-view /> (Router Views Nomeados)**

```html
<div id="app">
    <h1>Rotas com VueRouter</h1>
    <router-view name="menu"/>
    <router-view />
</div>
```
```javascript
const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'inicio',
            path: '/',
            //aqui estou dizendo em qual router-view o componente deve ser renderizado
            components: {  
                default: Inicio, //no router-view sem estar nomeado será renderizado o componente Inicio 
                menu: Menu, //no router-view nomeado será renderizado o componente Menu 
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
```
**Redirecionamento**

```javascript
{
    path: '*',
    redirect: '/'
}
``` 
**Animando Transições de Rotas**
Obs. é necessário instalar o animate.css
https://github.com/animate-css/animate.css?files=1
https://animate.style/

```html
<transition 
    mode="out-in"
    enter-active-class="animate rubberBand"
    leave-active-class="animate rollOut">
    <router-view />
</transition>
```


**Passando Fragmento Hash**
Para o hash funcionar precisa:
1. por uma id na tag
2. passar na url #minhaHash
3. adicionar no router-link hash: '#rodape'  
4. e adicionar no router.js o scrollBehavior

Ex:
http://localhost:3000/usuario#rodape

```html
<div id="rodape">
    <h3>Curso Vue</h3>
</div>
```
```html
 <router-link tag=¨ button¨  :to=¨ {  name: 'editarUsuario', 
            params: {  id } , 
            query: { completo: true, lingua: 'pt' },
            hash: '#rodape'   } ¨/> Editar </router-link>
```
```javascript
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
        ...
    ]
})
```

**Protegendo Rotas**
Há 3 formas de proteger (interceptar) as rotas
1) Global
2) Forma específica
3) No componente

```javascript
//1) interceptando a rota de forma global
router.beforeEach((to, from, next) => {
    console.log("antes das rotas -> global")   
    next()
})
//ou
router.beforeEach((to, from, next) => {
    console.log("antes das rotas -> global")   
    next(false)
})
//ou
router.beforeEach((to, from, next) => {
    console.log("antes das rotas -> global") 
    if(to.path !== '/usuario') {
        next('/usuario')
    }  else {
        next()
    } 
})

//2) interceptando a rota de forma específica
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

//3) dentro do componente
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
  },
  data() {
    return {
        ...
    }
  }
}
</script>

```

**Usando o Evento "beforeLeave"**
Garante que a saída do componente aconteça no momento certo.
Pode ser usado para verificar se preencheu todo o formulário, e antes de sair da página o sistema confirma se deseja resalmente sair.
É configurado direto no componente

```html
<script>
export default {
    props: ['id'],
    data() {
      return {
        confirmou : false
      }
    },
    //garante que a saída do componente aconteça no momento certo
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
```

**Carregando Rotas Tardiamente**

```javascript
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
```