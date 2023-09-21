"use client"

import { useContext, useEffect } from "react"
import { Separator } from "@radix-ui/react-separator"
import { AnimatePresence, motion } from "framer-motion"
import { Loader } from "lucide-react"

import { TodosContext } from "@/components/context/todosContext"
import DropDownFilter from "@/components/dropDownFilter"
import Stats from "@/components/stats"
import TodoForm from "@/components/todo-form"
import TodoItem from "@/components/todo-item"

export default function IndexPage() {
  const { todos, selectedTodos, loadDemoTodos, todoAreLoading } =
    useContext(TodosContext)

  const isTodo = () => {
    return todos && todos.length > 0
  }

  const computeGreetingText = () => {
    if (todoAreLoading) return "Bienvenue"
    if (isTodo()) return "Bienvenue ! Jetons un œil à vos tâches en cours."
    return "Bienvenue, vous n'avez aucune tâche en cours !"
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <AnimatePresence>
        <motion.div
      
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }} 
          transition={{ duration: 0.2, ease: "easeInOut" }} 
          className="text-center text-sm md:text-3xl mx-auto "
        >
          {computeGreetingText()}
        </motion.div>
      </AnimatePresence>
      {/* <div className="w-full container mx-auto">
        <Stats />
        <Separator className="my-4" />
      </div> */}

      <div className="flex flex-col md:flex-row items-center w-full justify-evenly md:flex-nowrap flex-wrap gap-7 mx-auto container">
        <div className="w-auto md:w-full mx-auto ">
          <TodoForm />
        </div>
        <DropDownFilter />
      </div>

      <motion.div
        className=" container mx-auto justify-center items-center   grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  "
        layout
      >
        {isTodo() && !todoAreLoading && (
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
        )}
      </motion.div>
      {todoAreLoading && <Loader className="animate-spin w-full mx-auto" />}
      {!isTodo() && !todoAreLoading ? (
        <h1 className="text-center text-muted-foreground w-full mx-auto">
          <TodoForm displayValue=" Créer votre première tâche" /> ou{" "}
          <button className="underline" onClick={loadDemoTodos}>
            importer des exemples
          </button>
        </h1>
      ) : null}
    </section>
  )
}
