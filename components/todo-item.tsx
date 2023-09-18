"use client"

import { Check, Trash2 } from "lucide-react"
import { useContext } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Ttodos } from "@/types/todos"

import { TodosContext } from "./context/todosContext"
import DateFormater from "./dateFormater"
import TodoForm from "./todo-form"
import { Button } from "./ui/button"
import TextCropper from "./text-cropper"

interface TodoItemProps {
  todo: Ttodos
}

export default function TodoItem(props: TodoItemProps) {
  const todoContext = useContext(TodosContext)

  const { title, done, dueDate, content, id } = props.todo

  const baseCardClass =
    "w-[15rem] min-h-[17rem] flex flex-col mx-auto justify-around hover:scale-105 transition-all ease-in-out duration-100"
  const variable = done === true ? "bg-muted " : " "

  return (
    <>
      <Card className={variable + baseCardClass}>
        <CardHeader>
          <CardTitle className="text-base ">
            {done === true ? (
              <p className="line-through truncate">{title}</p>
            ) : (
              <p className="truncate">{title}</p>
            )}
          </CardTitle>

          {done === false ? (
            <DateFormater date={dueDate} />
          ) : (
            <div className="text-sm">Tâche terminée</div>
          )}

          <Separator />
        </CardHeader>

        <CardContent className=" text-sm max-h-[5rem] overflow-hidden text-ellipsis "><TextCropper text={content? content : ""} charCount={70}></TextCropper></CardContent>
        <CardFooter className="flex w-full justify-around items-end">
          <Button
            onClick={() => todoContext.toggleDone(id)}
            className="hover:bg-mcePrimary"
            variant="outline"
            size="icon"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => todoContext.deleteTodo(id)}
            className="hover:bg-mceAccent"
            variant="outline"
            size="icon"
          >
            <Trash2 className="h-4 w-4 " />
          </Button>

          <TodoForm mode="edit" todo={props.todo}></TodoForm>
        </CardFooter>
      </Card>
    </>
  )
}
