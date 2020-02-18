import Vue from 'vue';
import { Container, Header, Aside, Main, Menu, MenuItem, Submenu, MenuItemGroup, InfiniteScroll, Input, Form, FormItem, Col, Button, Message, Table, TableColumn, Tree, Card, Link, MessageBox, Dialog } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Aside)
Vue.use(Button)
Vue.use(Card)
Vue.use(Col)
Vue.use(Container)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(InfiniteScroll)
Vue.use(Input)
Vue.use(Link)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tree)
// Message不要用Vue.use(Message),直接挂在到原型对象上即可
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox



