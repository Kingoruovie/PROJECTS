import { useState } from "react"
import themeClasses from "./utils/utils"

import Header from "./components/Header"

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [input, setInput] = useState('')

  const changeTheme = (colorScheme: string) => {
    setTheme(colorScheme)
  }

  return (
    <main className={`font-display min-h-[100vh] ${themeClasses[theme].mainBg} ${themeClasses[theme].textColor1}`}>
      <div className="w-[90%] max-w-lg mx-auto pt-8">
        <section>
          <Header theme={theme} changeTheme={changeTheme}/>
        </section>
        <section className="mt-10">
            <input value={input} onChange={(event) => setInput(event.target.value)} type="number" name="" id="" className={`text-5xl w-full rounded-lg ${themeClasses[theme].screenBg}`}/>
          <article>

          </article>
        </section>
      </div>
    </main>
  )
}