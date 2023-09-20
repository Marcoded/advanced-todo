import React, { useContext, useState } from "react"
import { MoveHorizontal } from "lucide-react"

import { TFilters, TodosContext } from "./context/todosContext"
import { Button } from "./ui/button"

export default function DropDownFilter() {
  const { toggleFilterState, filters } = useContext(TodosContext)

  const handleClick = (filterName: keyof TFilters) => {
    toggleFilterState(filterName)
  }

  const getButtonStyle = (filterName: keyof TFilters) => {
    return filters[filterName] ? "default" : "outline"
  }

  const isAnyFilterActive = () => {
    return Object.values(filters).some((value) => value)
  }

  return (
    <div className="flex gap-5 sm:flex-nowrap flex-wrap  align-middle justify-center">
      <Button
        className="text-xs md:text-md"
        variant={getButtonStyle("newestFirst")}
        onClick={() => handleClick("newestFirst")}
      >
        <MoveHorizontal />
      </Button>
      
      {/* <div className="h-9 border-l-2"></div> */}

      <Button
        className="text-xs md:text-md"
        variant={getButtonStyle("todayOnly")}
        onClick={() => handleClick("todayOnly")}
      >
        Aujourd'hui
      </Button>

      <Button
        className="whitespace-nowrap text-xs  md:text-md"
        variant={getButtonStyle("showLate")}
        onClick={() => handleClick("showLate")}
      >
        En retard
      </Button>

      {/* <div className="h-9 border-l-2"></div> */}

      <Button
        className=" text-xs md:text-md"
        variant={getButtonStyle("showFinished")}
        onClick={() => handleClick("showFinished")}
      >
        Terminée
      </Button>
      
      <Button
        className="whitespace-nowrap  text-xs  md:text-md"
        variant={getButtonStyle("showActive")}
        onClick={() => handleClick("showActive")}
      >
        En cours
      </Button>
    </div>
  )
}
