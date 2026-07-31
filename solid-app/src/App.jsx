import { createSignal, createEffect } from 'solid-js'
import Page from './Page'
import { fs } from './fs.js'

function App() {
  const [history, setHistory] = createSignal(["/"])
  const [historyIndex, setHistoryIndex] = createSignal(0)
  const path = () => history()[historyIndex()]

  function navigate(newPath) {
    if (!newPath) newPath = "/"
    if (newPath === path()) return
    const trimmed = history().slice(0, historyIndex() + 1)
    trimmed.push(newPath)
    setHistory(trimmed)
    setHistoryIndex(trimmed.length - 1)
  }

  function goUp() {
    const parts = path().split("/").filter(Boolean)
    parts.pop()
    navigate("/" + parts.join("/"))
  }

  function goBack() {
    setHistoryIndex((i) => Math.max(0, i - 1))
  }

  function goForward() {
    setHistoryIndex((i) => Math.min(history().length - 1, i + 1))
  }

  const [inputPath, setInputPath] = createSignal(path())
  createEffect(() => setInputPath(path()))

  function submitPath(e) {
    e.preventDefault()
    navigate(inputPath())
  }

  const [refresh, setRefresh] = createSignal(0)

  async function createFile() {
    const name = window.prompt("New file name:")
    if (!name) return
    const base = path() === "/" ? "" : path()
    await fs.createFile(`${base}/${name}`)
    setRefresh((r) => r + 1)
  }
//svg credits:
//<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
  return (
    <div id="page">
      <div id="header">
        
        <button onClick={goUp} disabled={path() === "/"}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg></button>
        <button onClick={goBack} disabled={historyIndex() === 0}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>
        <button onClick={goForward} disabled={historyIndex() === history().length - 1}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button>
        <form id="pathbar" onSubmit={submitPath}>
          <input
            type="text"
            value={inputPath()}
            onInput={(e) => setInputPath(e.currentTarget.value)}
          />
        </form>
        <button onClick={createFile} title="new file"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg></button>
      </div>
      <div id="body">
        <Page path={path()} onNavigate={navigate} refresh={refresh()}></Page>
      </div>
    </div>
  )
}

export default App
