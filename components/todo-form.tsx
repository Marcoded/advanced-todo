"use client"

import { useContext, useEffect, useState } from "react"


import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Ttodos } from "@/types/todos"

import { DatePickerWithPresets } from "./DatePickerWithPresets"
import { TodosContext } from "./context/todosContext"

interface TtodoFormProps {
  todo?: Ttodos
  mode?: "create" | "edit"

}

export interface TtodoForm {
  mode : "edit" | "create";
  title : string;
  content? : string
  DueDate: Date | undefined
  id: string 
}

export default function TodoForm(props: TtodoFormProps) {
  const { addTodo, updateTodo } = useContext(TodosContext)

 

  const [todoFormState, setTodoFormState] = useState<TtodoForm>({
    mode: props.mode ? props.mode : "create",
    title: props.todo ? props.todo.title : "",
    content: props.todo ? props.todo.content : "",
    DueDate: props.todo? props.todo.dueDate : undefined,
    id: props.todo ? props.todo.id : crypto.randomUUID(),
  })

  const resetInput = () => {
    setTodoFormState(state => ({
      ...state,
      title: "",
      content: "",
      DueDate: undefined
    }));
  };

  const [titleValidation, setTitleValidation] = useState(false)

  useEffect(() => {
    setTitleValidation(isTitlePresent)
  
  }, [todoFormState])

  const setDueDate = (newDate: Date | undefined) => {
    setTodoFormState((prev) => ({ ...prev, DueDate: newDate }))
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoFormState({
      ...todoFormState,
      [e.target.name]: e.target.value,
    })
  }

  const isTitlePresent = () => {
    if (todoFormState.title.length > 0) {
      return true
    }
    return false
  }



  const computeBorderColor = () => {
    if (titleValidation) {
      return ""
    }
    return "border-destructive"
  
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // We're not creating the task if there is no title provided
    if (!isTitlePresent()) {
      e.preventDefault()
      return
    }

    if (todoFormState.mode === "create") {
      const newTodo = {
        title: todoFormState.title,
        content: todoFormState.content ? todoFormState.content : "",
        dueDate: todoFormState.DueDate ? todoFormState.DueDate : undefined,
        done: false,
        id: crypto.randomUUID(),
      }
      resetInput()
      return addTodo(newTodo)
    }

    if (todoFormState.mode === "edit") {
      const updatedTodo = {
        title: todoFormState.title,
        content: todoFormState.content ? todoFormState.content : "",
        dueDate: todoFormState.DueDate ? todoFormState.DueDate : undefined,
        done: false,
        id: todoFormState.id,
      }
      return updateTodo(updatedTodo)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="hover:bg-mceAccent whitespace-nowrap "
            variant="outline"
          >
            {todoFormState.mode === "create" ? "Nouvelle tâche" : "Modifier"}
          </Button>
        </DialogTrigger>
        <DialogContent>
        
          <CardHeader>
            <CardTitle className="text-mcePrimary">
              {todoFormState.mode === "create"
                ? "Nouvelle tâche"
                : "Modifier tâche"}
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-mceAccent" htmlFor="name">
                  Titre
                </Label>
                <Input
                  id="name"
                  onChange={handleTextChange}
                  name="title"
                  placeholder="Un titre sympa"
                  value={todoFormState.title}
                  className={computeBorderColor()}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-mceAccent" htmlFor="content">
                  Description
                </Label>
                <Textarea
                  value={todoFormState.content}
                  onChange={handleTextChange}
                  name="content"
                  placeholder="Ma description"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-mceAccent" htmlFor="Date">
                  Date
                </Label>
                <DatePickerWithPresets existingDate={props.todo?.dueDate}  setDueDate={setDueDate} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <DialogTrigger asChild>
              <Button variant="outline">Retour</Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button onClick={(e) => handleSubmit(e)} className="bg-mceAccent">
                {props.mode === "create" ? "Créer" : "Modifier"}
              </Button>
            </DialogTrigger>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
