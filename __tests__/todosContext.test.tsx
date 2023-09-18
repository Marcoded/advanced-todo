// https://testing-library.com/docs/example-react-context/
// @ts-nocheck
import React, { useContext } from "react"
import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"
import exp from "constants"
import e from "express"

import { TodosContext, TodosProvider } from "@/components/context/todosContext"

describe("TodosContext", () => {
  let testTodos
  let testSelectedTodos

  beforeEach(() => {
    const TestComponent = () => {
      const { todos, selectedTodos } = useContext(TodosContext)

      testTodos = todos
      testSelectedTodos = selectedTodos

      return null
    }

    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    )
  })

  it("Should populate the context with todos", () => {
    expect(testTodos.length).toBe(7)
  })

  it("Should not include done todo by default", () => {
    const doneTodos = testSelectedTodos.filter((todo) => todo.done)
    expect(doneTodos.length).toBe(0)
  })
})

describe("FilterContext", () => {
  let testFilters

  beforeEach(() => {
    const TestComponent = () => {
      const { filters } = useContext(TodosContext)

      testFilters = filters

      return null
    }

    render(
      <TodosProvider>
        <TestComponent />
      </TodosProvider>
    )
  })

  it("Should initialize with ShowActive turned on by default", () => {
    expect(testFilters.showActive).toBe(true)
  })

  it("Should initialize all other filters to false", () => {
    expect(testFilters.todayOnly).toBe(false)
    expect(testFilters.showFinished).toBe(false)
    expect(testFilters.showLate).toBe(false)
    expect(testFilters.showFuture).toBe(false)
  })
})
