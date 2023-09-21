"use client"

import React, { createContext, useEffect, useState } from "react"
import {
  addDays,
  compareAsc,
  compareDesc,
  isFuture,
  isPast,
  isToday,
  isValid,
  subDays,
} from "date-fns"

import { Ttodos } from "@/types/todos"

export interface TFilters {
  todayOnly: boolean
  showFinished: boolean
  showLate: boolean
  showFuture: boolean
  showActive: boolean
  newestFirst: boolean
}

interface TtodosContext {
  todos: Ttodos[] | null
  selectedTodos: Ttodos[] | null
  filters: TFilters

  addTodo: (newTodo: Ttodos) => void
  updateTodo: (todo: Ttodos) => void
  deleteTodo: (id: string) => void
  toggleDone: (id: string) => void

  toggleFilterState: (filter: keyof TFilters) => void
}

const today = new Date()
const pastDate = subDays(today, 2)
const futureDate = addDays(today, 2)

const demoTodos: Ttodos[] = [
  {
    title: "Un Titre !",
    dueDate: futureDate,
    content: "Et une description",
    done: false,

    id: "1",
  },
  {
    title: "Todo 2",
    dueDate: addDays(futureDate, 2),
    content:
      "La descrption est un peu longue ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quae nobis corporis vitae sed laboriosam maiores nemo amet asperiores neque. Debitis fugiat modi totam laboriosam facere eaque ducimus quidem quo. ",
    done: false,

    id: "2",
  },
  {
    title: "Todo 3",
    dueDate: today,
    content: "Pour aujoud'hui -  Titre Orange MCE",
    done: false,

    id: "3",
  },
  {
    title: "Todo 4",
    dueDate: addDays(futureDate, 5),
    content: "Une tâche en retard",
    done: false,

    id: "4",
  },
  {
    title: "Finie, et en retard",
    dueDate: subDays(pastDate, 2),
    content: "Aussi en retard",
    done: true,

    id: "5",
  },
  {
    title: "Le titre est un peu trop lonnnnnnnng !",
    dueDate: pastDate,
    content: "En retard !",
    done: false,

    id: "6",
  },
  {
    title: "Terminée, titre rayer !",
    dueDate: today,
    content: "Terminée!",
    done: true,

    id: "7",
  },
]

// Default state
export const TodosContext = createContext<TtodosContext>({
  todos: [],
  selectedTodos: [],
  filters: {
    todayOnly: false,
    showFinished: false,
    showLate: false,
    showFuture: false,
    showActive: true,
    newestFirst: false,
  },
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleDone: () => {},
  toggleFilterState: () => {},
})

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Ttodos[]>(demoTodos)

  const [selectedTodos, setSelectedTodos] = useState<Ttodos[]>(todos)

  const [filters, setFilters] = useState<TFilters>({
    todayOnly: false,
    showFinished: false,
    showLate: false,
    showFuture: false,
    showActive: true,
    newestFirst: false,
  })

  useEffect(() => {
    setSelectedTodos(applyFilters(todos))
  }, [todos, filters])

  const applyFilters = (todos: Ttodos[]) => {
    let currentTodos = [...todos]

    if (filters.todayOnly) {
      currentTodos = currentTodos.filter((todo) => {
        if (!todo.dueDate) return false
        return isToday(todo.dueDate)
      })
    }

    if (filters.showFinished) {
      currentTodos = currentTodos.filter((todo) => todo.done)
    }

    if (filters.showLate) {
      currentTodos = currentTodos.filter((todo) => {
        if (todo.done) return false
        if (!todo.dueDate) return false
        // Task for today was also considered "late"
        return isPast(todo.dueDate) && !isToday(todo.dueDate)
      })
    }

    if (filters.showActive) {
      currentTodos = currentTodos.filter((todo) => !todo.done)
    }

    if (filters.showFuture) {
      currentTodos = currentTodos.filter((todo) => {
        if (!todo.dueDate) return false
        return isFuture(todo.dueDate)
      })
    }

    const noDatesTodos = currentTodos.filter(
      (todo) => !(todo.dueDate instanceof Date)
    )

    const todosWithDates = currentTodos.filter(
      (todo) => todo.dueDate instanceof Date
    )

    const sortedTodosWithDates = todosWithDates.sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0
      if (filters.newestFirst) {
        return compareDesc(a.dueDate, b.dueDate)
      } else {
        // sortByOldest
        return compareAsc(a.dueDate, b.dueDate)
      }
    })

    currentTodos = [...sortedTodosWithDates, ...noDatesTodos]

    return currentTodos
  }

  const saveTolocalStorage = () => {
    return 'todo'
  }

  const clearLocalStorage = () => {
    return "todo"
  }

  const loadFromLocalStorage = () => {
    return "todo"
  }

  const addTodo = (newTodo: Ttodos) => {
    setTodos([...todos, newTodo])
  }

  const toggleDone = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const updateTodo = (todo: Ttodos) => {
    setTodos(
      todos.map((modifiedTodo) =>
        modifiedTodo.id === todo.id ? todo : modifiedTodo
      )
    )
  }

  const toggleFilterState = (filterKey: keyof TFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }))
    ensureCoherentFilterState(filterKey)
  }

  // Guard clause
  const ensureCoherentFilterState = (lastFilter: keyof TFilters) => {
    if (lastFilter === "showActive" && filters.showFinished)
      setFilters((prevFilters) => ({ ...prevFilters, showFinished: false }))

    if (
      lastFilter === "showFinished" &&
      (filters.showActive || filters.showLate)
    )
      setFilters((prevFilters) => ({
        ...prevFilters,
        showActive: false,
        showLate: false,
      }))

    if (
      lastFilter === "showLate" &&
      (filters.todayOnly || filters.showFinished)
    )
      setFilters((prevFilters) => ({
        ...prevFilters,
        todayOnly: false,
        showFinished: false,
      }))

    if (lastFilter === "todayOnly" && filters.showLate)
      setFilters((prevFilters) => ({ ...prevFilters, showLate: false }))
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        selectedTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleDone,
        toggleFilterState,
        filters,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
