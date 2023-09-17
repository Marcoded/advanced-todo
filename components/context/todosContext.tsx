"use client"

import React, { createContext, useEffect, useState } from "react"
import { addDays, isFuture, isPast, isToday, subDays } from "date-fns"

import { Ttodos } from "@/types/todos"

export interface TFilters {
  todayOnly: boolean
  showFinished: boolean
  showLate: boolean
  showFuture: boolean
  showActive: boolean
}

interface TtodosContext {
  todos: Ttodos[] | null
  selectedTodos: Ttodos[] | null
  filters: TFilters 

  addTodo: (newTodo: Ttodos) => void
  updateTodo: (todo: Ttodos) => void
  deleteTodo: (id: string) => void
  toggleDone: (id: string) => void
  resetAllFilters: () => void

  toggleFilterState: (filter: keyof TFilters) => void
}

const today = new Date()
const pastDate = subDays(today, 2)
const futureDate = addDays(today, 2)

const demoTodos: Ttodos[] = [
  {
    title: "Embaucher Marc",
    dueDate: futureDate,
    content: "",
    done: false,

    id: "1",
  },
  {
    title: "Todo 2",
    dueDate: futureDate,
    content:
      "Le content de celle ci est un peu long, mais n'ayez crainte ! tout est prévue (enfin pas tout tout quand même) tttttttttttttttttttttttttttttttttttttttttttt overflow is hidden",
    done: true,

    id: "2",
  },
  {
    title: "Todo 3",
    dueDate: today,
    content: "Celle ci pour ajd",
    done: true,

    id: "3",
  },
  {
    title: "Finir le responsive",
    dueDate: futureDate,
    content: "You're late on this one",
    done: false,

    id: "4",
  },
  {
    title: "Finie, et en retard",
    dueDate: pastDate,
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
    title: "For today, already done !",
    dueDate: today,
    content: "C'est une démo!",
    done: true,

    id: "7",
  },
]

export const TodosContext = createContext<TtodosContext>({
  todos: [],
  selectedTodos: [],
  filters:{
    todayOnly: false,
    showFinished: false,
    showLate: false,
    showFuture: false,
    showActive: true,
  },
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleDone: () => {},
  toggleFilterState: () => {},
  resetAllFilters: () => {},
})

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Ttodos[]>(demoTodos)

  const [selectedTodos, setSelectedTodos] = useState<Ttodos[]>(todos)

  const [filters, setFilters] = useState({
    todayOnly: false,
    showFinished: false,
    showLate: false,
    showFuture: false,
    showActive: true,
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
        // Task for todays were also considered "late"
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
    return currentTodos
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
    setTodos(todos.map((modifiedTodo) => (modifiedTodo.id === todo.id ? todo : modifiedTodo)))
  }

  const toggleFilterState = (filterKey: keyof TFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }))
  }

  const resetAllFilters = () => {
    const updatedFilters: TFilters = { ...filters }

    for (const key in updatedFilters) {
      updatedFilters[key as keyof TFilters] = false
    }
    setFilters(updatedFilters)
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
        resetAllFilters,
        filters
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
