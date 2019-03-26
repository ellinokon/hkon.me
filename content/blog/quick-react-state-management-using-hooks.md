---
title: "Quick React.js state management using hooks"
layout: post
date: 2019-03-26
tags:
 - React.js
 - Hooks
 - State management
lead: "React recently released support for Hooks in version 16.8.0, making it
easier to handle state without including yet another library."
---

All the basic building blocks needed to make an easy to use state store are now
included with React.js. The foundation started in React 16.3.0 with the
introduction of the stable React Context API, and continued with the addition of
Hooks.

In combination, the Context and Hooks API make for a simple and extendable
solution to the state management problem, as you will see in the following
example and explanation.

## Example: Todo list

As ever, the handy todo list is (ab)used for example state management code.

### State management

Our most basic and essential part of the equation is the state store we create
using `createContext`, `useContext`, and `useReducer`. The resulting store is a
simple and reusable boilerplate.

```js
// state-store.js
import React, {createContext, useContext, useReducer} from 'react';

const StateContext = createContext();

export function StateProvider({children, initialState, reducer}) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateStore() {
  return useContext(StateContext);
}
```

It is in our reducer we define how we'll operate on state. Here we specify how
state will change in response to actions we send to our store. All state is
stored in a single object.

```js
// reducer.js
import {actionTypes} from './actions';

export default function reducer(state, action) {
  const {id, text} = action;

  switch(action.type) {
    case actionTypes.ADD_TODO: {
      return {
        ...state,
        todos: state.todos.concat({completed: false, id, text})
      }
    }

    case actionTypes.TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
      }
    }

    default: {
      return state;
    }
  }
}
```

In order to avoid typos and related problems when using `dispatch`, we define
our action types for use later. We can also set up boilerplate for creating the
actions we'll `dispatch` in our application.

```js
// actions.js
export const actionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO'
}

let nextTodoId = 0

export function addTodo(text) {
  return {
    type: actionTypes.ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export function toggleTodo(id) {
  return {
    type: actionTypes.TOGGLE_TODO,
    id
  }
}
```

### In use

In our main app component we'll set up the state provider as a top level
component, giving it our reducer and some initial state. This will make our
state available for components deeper down in the component tree.

```js
// app.js
import React from 'react';
import {StateProvider} from './state-store';
import reducer from './reducer';
import TodoList from './todo-list';

export default function App() {
  const initialState = {
    todos: []
  };

  return (
    <StateProvider {...{initialState, reducer}}>
        // App components here...
        <TodoList />
    </StateProvider>
  );
}
```

Using the `useStateStore` hook to grab our state, we can make a simple render of
our initial todos. By using `dispatch` and our predefined action creators to set
up some quick handlers, we can qickly test our store in the browser

```js
// todo-list.js
import React from 'react';
import {useStateStore} from './state-store';
import {addTodo, toggleTodo} from './actions';

function TodoToggle({id}) {
  const [, dispatch] = useStateStore();

  function handleComplete() {
    dispatch(toggleTodo(id))
  }

  return (
    <button onClick={handleComplete}>Toggle complete</button>
  );
}

function TodoItem({completed, id, text}) {
  return (
    <li>
      {completed ? (<s>{text}</s>) : text}
      <TodoToggle {...{id}}/>
    </li>
  );
}

export default function TodoList() {
  const [{todos}, dispatch] = useStateStore();

  function handleAddTodo() {
    dispatch(addTodo('A test todo'));
  }

  return (
    <>
      <ul>
        {todos.map((todo) => (<TodoItem key={todo.id} {...todo}/>))}
      </ul>
      <button onClick={handleAddTodo}>Add test todo</button>
    </>
  );
}
```
