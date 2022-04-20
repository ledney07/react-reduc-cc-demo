import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
};

export const fetchTodoAsync = createAsyncThunk("todos/fetchATodo", async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (res) => res.json()
  );

  return data.title;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = [...state.list, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoAsync.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(fetchTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = [...state.list, action.payload];
      })
      .addCase(fetchTodoAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { addTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos.list;
export const selectStatus = (state) => state.todos.status;

export default todosSlice.reducer;
