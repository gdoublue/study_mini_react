/**
 * @author zhui
 * @description mini-react 实现一个TODOList
 */
import React from "./core/React.js";
const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
import NBA from './nba.jsx'
function App() {


  const [category, setCategory] = React.useState("all");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const [todos, setTodos] = React.useState(initialTodos);
  // console.log({ todos });
  const [inputValue, setInputValue] = React.useState("");
  const handleAdd = () => {
    console.log({ inputValue });
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        content: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setCategory("all")
    }
  };

  const handleDelete = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  const handleComplete = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
  };
  const handleUnComplete = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const updatedTodos = [...todos];

    updatedTodos[index].completed = false;
    setTodos(updatedTodos);
  };
  const handleSave = () => {

    localStorage.setItem("todos", JSON.stringify(todos));
    alert("保存成功")
  };

  const filteredTodos = todos.filter((todo) => {
    switch (category) {
      case "all":
        return true;
      case "completed":
        return todo.completed;
      case "uncompleted":
        return !todo.completed;
      default:
        return true;
    }
  });
  return (
    <div>
      <div>
        <button className="save-btn" onClick={handleSave}>保存</button>

      </div>
      <div>
        <select value={category} onChange={handleCategoryChange}>
          <option value="all">全部</option>
          <option value="completed">已完成</option>
          <option value="uncompleted">未完成</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button onClick={handleAdd}>添加</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => {
          return (
            <li key={todo.id}>
              <div className={'todo-title' + (todo.completed ? ' completed' : '')} >{todo.content}</div>
              {todo.completed ? (
                <button onClick={() => handleUnComplete(todo.id)}>设为未完成</button>
              ) : (
                <button onClick={() => handleComplete(todo.id)}>设为已完成</button>
              )}{" "}
              <button onClick={() => handleDelete(todo.id)}>删除</button>
            </li>
          );
        })}
      </ul>
      <NBA></NBA>
    </div>
  );
}

export default App;
