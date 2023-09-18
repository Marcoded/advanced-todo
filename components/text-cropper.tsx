import React from "react"

interface TtextCropperProps {
  text: string
  charCount: number
}

export default function TextCropper(props: TtextCropperProps) {
  const processText = () => {
    if (props.text.length > props.charCount) {
      return props.text.substring(0, props.charCount) + "..."
    }
    return props.text
  }

  return <>{processText()}</>
}
