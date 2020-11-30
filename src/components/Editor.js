import React, { useState } from 'react'
//importing codemirror - a JavaScript component that provides a code editor in the browser
// codemirror css file
import 'codemirror/lib/codemirror.css'
// codemirror theme file
import 'codemirror/theme/material.css'
// codemirror languages file - xml for html, javascript for js code, css for css code
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
// controlled - a code editor that we will use with our onchange attributes
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange
  } = props
  // open - to handle expansion and collapse feature
  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    // function come as a prop
    onChange(value)
  }

  return (
    //  ternary operation to handle collapse and expand feature on clicking on collapse button
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
      // similar to onchange handler
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        // options from codemirror library
        // mode - language for the text editor
        // theme - material - for dark theme of text editor
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />
    </div>
  )
}
