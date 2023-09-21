import React, { useContext } from "react"

import { TodosContext } from "./context/todosContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { isToday } from "date-fns"

export default function Stats() {
  const { todos } = useContext(TodosContext)

  const totalTodos = todos.length

  const doneTodos = todos.filter((todo) => todo.done).length

  const todayTodo = todos.filter((todo) => {
    if (!todo.dueDate) return false
    return isToday(todo.dueDate)}).length

  const pendingTodos = todos.filter((todo) => !todo.done).length

  const doneRatio = (doneTodos / totalTodos) * 100

  const pendingRatio = (pendingTodos / totalTodos) * 100

  return (
    <div className="flex gap-x-10 w-fit">
      <Card className="">
        <CardHeader className="text-sm">
            Tâche Terminées
        </CardHeader>
        <CardContent>
            <CardTitle>{doneTodos} / {totalTodos}</CardTitle>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="text-sm">
            Pour aujourd'hui
        </CardHeader>
        <CardContent>
            <CardTitle>{todayTodo}</CardTitle>
        </CardContent>
      </Card>
    </div>
  )
}
