import { cc, jsx, patch, When } from "jmx"
import { c } from './controller'
import { m, type Todo } from './model'
import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

let Header = <header class="header">
    <h1>todos</h1>
    <input class="new-todo" onkeydown={c.addItem} placeholder="What needs to be done?" autofocus />
</header>

let Footer = <footer class="footer">
    <span class="todo-count">
        <strong>{m.activecount}</strong> {m.activecount === 1 ? "item" : "items"} left
    </span>
    <ul class="filters">
        <li><a class={cc({ selected: m.filter == "all" })} href="#/">All</a></li>
        <li><a class={cc({ selected: m.filter == "active" })} href="#/active">Active</a></li>
        <li><a class={cc({ selected: m.filter == "completed" })} href="#/completed">Completed</a></li>
    </ul>
    <When cond={m.anycompleted}>
        <button class="clear-completed" onclick={c.removeCompletedItems}>Clear completed</button>
    </When>
</footer>

let Item = ({ item: item }: { item: Todo }) => {
    let editing = m.editingItem == item
    let completed = item.completed
    return <li class={cc({ completed, editing })} >

        <div class="view">
            <input class="toggle" type="checkbox" onchange={(ev) => c.setCompleted(ev, item)} checked={completed} />
            <label ondblclick={ev => c.startEdit(ev, item)}>{item.text}</label>
            <button onclick={() => c.removeItem(item)} class="destroy" />
        </div>

        <When cond={editing}>
            <div class="input-container">
                <input
                    id="edit-todo-input"
                    class="edit"
                    value={item.text}
                    onkeyup={c.keyUp}
                    onblur={c.endEdit}
                    mounted={e => e.focus()}
                />

            </div>
        </When>

    </li>
}

let Main = <main class="main">
    <div class="toggle-all-container">
        <input class="toggle-all" id="toggle-all" type="checkbox" onchange={c.toggleAllItems} checked={m.allarecompleted} />
        <label for="toggle-all">Mark all as complete</label>
    </div>
    <ul class="todo-list">
        {m.filtereditems.map(t => <Item item={t} />)}
    </ul>
    <Footer />
</main>

export let App =
    <section class="todoapp">
        <Header />
        <Main />
    </section>

patch(document.querySelector(".todoapp"), App)