// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  
  data: {
    todos: []
  },
  
  methods: {
    //Todo　追加の処理
    doAdd : function(event, value) {
      //ref　で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      
      //入力がなければreturn
      if (!comment.value.length) {
        return
      }
      
      //{ 新しいID, コメント, 作業状態 }
      //というオブジェクトを現在のtodosリストへpush
      //作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      
      //フォーム要素を空にする
      comment.value = ''
    }
  },
  
  watch: {
    //オプションを使う場合はオブジェクト形式にする
    todos: {
      //引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      //deepオプションでネストしているデータも監視できる
      deep: true
    }
  },
  
  created() {
    //インスタンス作成時に自動的にfetch()する
    this.todos = todoStorage.fetch()
  }
})