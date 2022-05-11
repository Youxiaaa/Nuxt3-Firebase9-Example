<template>
  <section>
    <div
      class="w-full h-screen flex flex-col justify-center items-center bg-[#FEC6C2]">
      <h1 class="text-center text-3xl text-white font-bold mb-5">TodoList</h1>
      <div
        class="w-80 max-w-[90vw] p-4 flex flex-col gap-3 bg-[#C4E7E1] rounded-2xl shadow-md overflow-hidden">
        <div class="relative overflow-hidden rounded-xl shadow-md mb-3">
          <input @keyup.enter="addTodo()" v-model="newTodo" type="text"
            class="py-2 px-3 rounded-xl focus:outline-none w-full">
          <button @click="addTodo()"
            class="absolute w-12 h-full right-0 top-0 bg-[#FEC6C2] text-white active:shadow-[inset_2px_2px_4px_1px_rgba(0,0,0,0.25)]">+</button>
        </div>
        <ul class="flex items-center gap-3 mb-3">
          <li @click="selected = item.label" v-for="item in tabMenu.data" :key="item.id"
            class="w-full text-center text-[#fff] font-bold select-none p-2 cursor-pointer rounded-xl shadow-[5px_3px_8px_0px_rgba(0,0,0,0.15),-3px_-4px_4px_0px_rgba(255,255,255,0.4)]"
            :class="{'shadow-[inset_5px_5px_5px_0px_rgba(0,0,0,0.15),inset_-3px_-4px_4px_0px_rgba(255,255,255,0.4)]': selected === item.label}">
            <p>{{ item.label }}</p>
          </li>
        </ul>
        <ul class="w-full flex flex-col gap-5 text-[#666]">
          <li v-for="item in filterTodos" :key="item.id" class="bg-[#C4E7E1] p-3 rounded-xl shadow-[5px_3px_8px_0px_rgba(0,0,0,0.15),-3px_-4px_5px_0px_rgba(255,255,255,0.4)] flex justify-between items-center px-3">
            <div class="flex items-center gap-3">
              <label :for="item.id" class="w-5 h-5 border border-[#fff] font-bold rounded-full flex items-center justify-center cursor-pointer">
                <div class="w-3.5 h-3.5 rounded-full bg-[#fff] font-bold scale-0 duration-300" :class="{'scale-100': item.isCompleted}"></div>
              </label>
              <input @change="completedItem(item)" v-model="item.isCompleted" :id="item.id" type="checkbox" class="hidden">
              <p class="text-[#fff] relative after:content-[''] after:duration-300 after:absolute after:h-[2px] after:bg-[#fff] font-bold after:left-0 after:top-1/2 after:-translate-y-1/2" :class="{'after:w-full': item.isCompleted, 'after:w-0': !item.isCompleted}">{{ item.content }}</p>
            </div>
            <a @click="removeItem(item.id)" class="fa-solid fa-trash-can cursor-pointer text-[#fff] font-bold">X</a>
          </li>
        </ul>

      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// firebase 的 ref 會和 Vue3 的 ref 重名到，使用 sRef 替代
import { getDatabase, onValue, ref as sRef, push, update, remove} from "firebase/database";

// 宣告 Database
const db = getDatabase()
const dbRef = sRef(db, '/todos')

// 宣告需要放值的變數
let todos = reactive<any>({ data: [] })
const newTodo = ref<String>('')

//取得todos
const getTodos = () => {
  onValue(dbRef, (snapshot) => {
    if (snapshot.val()) {
      const data = Object.values(snapshot.val())
      const id = Object.keys(snapshot.val())
      data.forEach((item, idx) => {
        item.id = id[idx]
      })
      todos.data = data
    } else {
      todos.data = []
    }
  })
}

// 新增todo
const addTodo = () => {
  const todo = newTodo.value.trim() as String
  if (!todo) return
  const data = {
    content: todo,
    isCompleted: false
  }
  push(dbRef, data)
  newTodo.value = ''
  getTodos()
}

// tab按鈕、過濾顯示todos
const tabMenu = reactive({
  data: [
    { id:<Number> 1, label:<String> '全部' },
    { id:<Number> 2, label:<String> '未完成' },
    { id:<Number> 3, label:<String> '已完成' },
  ]
})
let selected = ref<String>('全部')
const filterTodos = computed(() => {
  switch (selected.value) {
    case '全部':
      return todos.data
    case '未完成':
      return todos.data.filter((item) => !item.isCompleted)
    case '已完成':
      return todos.data.filter((item) => item.isCompleted)
    default:
      return todos.data
  }
})

//刪除todo
const removeItem = (id) => {
  const targetItem = sRef(db, `/todos/${id}`)
  remove(targetItem)
  getTodos()
}

//完成todo
const completedItem = (item) => {
  const data = {
    content:<String> item.content,
    isCompleted:<Boolean> item.isCompleted
  }
  // 官方文件說的，不知道
  // https://firebase.google.com/docs/database/web/read-and-write
  const updates = {}
  updates[item.id] = data
  update(dbRef, updates)
  getTodos()
}

//執行取得todo
getTodos()

</script>