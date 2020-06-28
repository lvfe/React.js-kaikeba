<template>
  <div class="todoapp-box">
    <section class="todoapp">
      <h1>vue3 todos</h1>
      <header class="header">
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="state.newTodo"
          @keyup.enter="addTodo"
        />
      </header>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  onMounted,
  onUnmounted
} from "vue";
const STORAGE_KEY = "todos-vuejs-3.x";
type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};
const todoStorage: any = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo: TodoType, index: number) => {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(todos: TodoType[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};
export default defineComponent({
  name: "to do list",
  props: {
    condition: {
      type: String,
      default: "all"
    }
  },
  setup(props: any) {
    const state: any = reactive({
      todos: todoStorage.fetch(),
      editedTodo: null,
      newTodo: "",
      beforeEditCache: "",
      visibility: props.condition,
      remaining: computed(() => {
        return filters.active(state.todos).length;
      }),
      remainingText: computed(() => {
        return ` ${pluralize(state.remaining)} left`;
      }),
      filteredTodos: computed(() => {
        return filters[state.visibility](state.todos);
      }),
      allDone: computed({
        get: function() {
          return state.remaining === 0;
        },
        set: function(value: boolean) {
          state.todos.forEach((todo: TodoType) => {
            todo.completed = value;
          });
        }
      })
    });
    // watch(a, () => {
    //   console.log("watch a", a.value + b.value);
    // });
    function onHashChange() {
      const visibility = getQueryString("q") || "all";
      if (filters[visibility]) {
        state.visibility = visibility;
      } else {
        window.location.hash = "vue3-todomvc/?q=all";
        state.visibility = "all";
      }
    }
    function addTodo() {
      const value = state.newTodo && state.newTodo.trim();
      if (!value) {
        return;
      }
      state.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      state.newTodo = "";
    }
    function removeTodo(todo: TodoType) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    }
    function editTodo(todo: TodoType) {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo;
    }
    function doneEdit(todo: TodoType) {
      if (!state.editedTodo) {
        return;
      }
      state.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        removeTodo(todo);
      }
    }
    function cancelEdit(todo: TodoType) {
      state.editedTodo = null;
      todo.title = state.beforeEditCache;
    }
    function removeCompleted() {
      state.todos = filters.active(state.todos);
    }
    watchEffect(() => {
      todoStorage.save(state.todos);
    });
    onMounted(() => {
      window.addEventListener("hashchange", onHashChange);
      onHashChange();
    });
    onUnmounted(() => {
      window.removeEventListener("hashchange", onHashChange);
    });
    return {
      state,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted
    };
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
button {
  margin: 0;
}
</style>