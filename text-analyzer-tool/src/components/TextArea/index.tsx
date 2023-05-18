import './index.scss'
import React, {
  Dispatch,
  SetStateAction
} from 'react';


interface TextAreaProps {
  setTextArea: Dispatch<React.SetStateAction<string>>,
  text: string
}

const TextArea = ({
  setTextArea,
  text
}: TextAreaProps) => {
  return <textarea className="text-area"
    placeholder="Paste your text here..."
    value={text}
    onChange={(event) => setTextArea(event.target.value)}
  />
}

export default TextArea;
