"use client"

import { useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { TodosContext } from "@/components/context/todosContext"
import DropDownFilter from "@/components/dropDownFilter"
import TodoForm from "@/components/todo-form"
import TodoItem from "@/components/todo-item"

export default function IndexPage() {
  const { todos, selectedTodos } = useContext(TodosContext)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-center text-sm md:text-3xl mx-auto">
      Bienvenue ! Jetons un œil à tes tâches en cours
      </h1>
      <div className="flex w-full justify-evenly gap-7 mx-auto">
        <div className="w-full mx-auto container">
          <TodoForm />
        </div>
        <DropDownFilter />
      </div>

      <motion.div
        className=" container mx-auto justify-center items-center  grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  "
        layout
      >
        <AnimatePresence>
          {selectedTodos &&
            selectedTodos.map((todo) => (
              <motion.div
                key={todo.id}
                className=""
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
              >
                <TodoItem todo={todo} />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
