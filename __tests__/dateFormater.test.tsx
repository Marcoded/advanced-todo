// @ts-nocheck
import React from "react"
import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom/extend-expect"
import { addDays, format, subDays } from "date-fns"
import { fr } from "date-fns/locale"

import DateFormater from "@/components/dateFormater"

describe("DateFormater", () => {
  it("should render 'Aujourd'hui' if the date is today", () => {
    render(<DateFormater date={new Date()} />)

    const dateText = screen.getByText("Aujourd'hui")
    expect(dateText).toBeInTheDocument()
  })
  it("should render 'Pas de date définie' if no date is provided", () => {
    render(<DateFormater />)

    const fallBackText = screen.getByText("Pas de date définie")
    expect(fallBackText).toBeInTheDocument()
  })
  it("Should format date with the FR locale", () => {
    const testDate = addDays(new Date(), 1)
    const formattedDate = format(testDate, "dd  LLLL yyyy", { locale: fr })

    render(<DateFormater date={testDate} />)

    const dateOutput = screen.getByTestId("date-output")
    expect(dateOutput.textContent).toBe(formattedDate)
  })
  it("Should color the text in red (text-destructive) if the DueDate has passed", () => {
    const testDate = subDays(new Date(), 1)

    render(<DateFormater date={testDate} />)

    const dateOutput = screen.getByTestId("date-output")
    expect(dateOutput).toHaveClass("text-destructive")
  })
})
