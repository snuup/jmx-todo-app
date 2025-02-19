import { DeepReadonly } from "jmx/dist/types"

type Id = string

export type Todo = {
    id: Id
    text: string
    completed: boolean
}

class Model {

    items = [
        // { id: "id1", text: "hasentext", completed: false },
        // { id: "id2", text: "mausetext", completed: false },
        // { id: "id3", text: "der osterhase kommt bald", completed: false }
    ] as Todo[]

    editingItem = null as Todo | null
    filter = "all" as Filter

    get filtereditems() {
        switch (this.filter) {
            case "all": return this.items
            case "active": return this.activeitems
            case "completed": return this.items.filter(t => t.completed)
        }
    }

    get activeitems() { return this.items.filter(t => !t.completed) }
    get activecount() { return this.activeitems.length }
    get allarecompleted() { return this.items.every(t => t.completed) }
    get anycompleted() { return this.items.some(t => t.completed) }
}

export const mraw = new Model()
export const m = mraw as DeepReadonly<Model>
