import React, { useState, useEffect } from 'react';
import Editor from './Editor'
// custom hook - useLocalStorage
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  // srcDoc- variable that holds the html, css and js code
  // setSrcDoc - function to change the value of srcDoc
  const [srcDoc, setSrcDoc] = useState('')

  // useEffect hook to handle change in html, css or js value
  useEffect(() => {
    // setTimeout - to show the changes after a little delay
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      {/*top section for html, css and js code  */}
      <div className="pane top-pane">
        {/* 
        3 editor components
        language - language that the text editor supports
        displayName - title of the text editor
        value, setHtml - value and function to handle change in that value
         */}
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      {/* bottom section where the output is shown */}
      <div className="pane">
        {/* 
        using iframe to render custom html, css and js code output
        title - title of the iframe
        sandbox - allow-scripts - to only allow scripts not other things like document cookies
        frameBorder - 0 - don't have any border
         */}
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
