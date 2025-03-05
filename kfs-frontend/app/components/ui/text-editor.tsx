"use client"

import { useState } from "react"
import { Button } from "./button"
import { Bold, Italic, Underline, Heading, List, ListOrdered } from "lucide-react"

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
}

export function TextEditor({ value, onChange, maxLength = 4000 }: TextEditorProps) {
  const [textArea, setTextArea] = useState<HTMLTextAreaElement | null>(null)

  const handleCommand = (command: string, value?: string) => {
    if (!textArea) return

    const start = textArea.selectionStart
    const end = textArea.selectionEnd
    const selectedText = textArea.value.substring(start, end)
    let newText = textArea.value

    switch (command) {
      case "bold":
        newText = newText.substring(0, start) + `**${selectedText}**` + newText.substring(end)
        break
      case "italic":
        newText = newText.substring(0, start) + `_${selectedText}_` + newText.substring(end)
        break
      case "underline":
        newText = newText.substring(0, start) + `__${selectedText}__` + newText.substring(end)
        break
      case "heading":
        newText = newText.substring(0, start) + `# ${selectedText}` + newText.substring(end)
        break
      case "bullet-list":
        newText = newText.substring(0, start) + `\n- ${selectedText}` + newText.substring(end)
        break
      case "number-list":
        newText = newText.substring(0, start) + `\n1. ${selectedText}` + newText.substring(end)
        break
    }

    onChange(newText)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("underline")}>
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("heading")}>
          <Heading className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("bullet-list")}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("number-list")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        <textarea
          ref={setTextArea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          className="w-full min-h-[100px] p-2 border rounded-md resize-y"
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  )
}


