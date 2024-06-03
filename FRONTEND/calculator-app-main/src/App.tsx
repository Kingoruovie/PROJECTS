import { useState } from "react"
import themeClasses from "./utils/utils"

import Header from "./components/Header"
import Screen from "./components/Screen"
import Keypad from "./components/Keypad"

export default function App() {
  const [theme, setTheme] = useState('dark')
  // const [input, setInput] = useState('')

  // function handleInputRep(num: number): string {
  //   const [wholePart, decimalPart] = String(num).split('')
  //   let rep: string
  //   let i == 0
  //   while () {
      
  //   }
  // }

  const changeTheme = (colorScheme: string) => {
    setTheme(colorScheme)
  }

  return (
    <main className={`font-display min-h-[100vh] md:flex justify-center items-center ${themeClasses[theme].mainBg} ${themeClasses[theme].textColor1}`}>
      <div className="w-[90%] max-w-lg mx-auto pt-8">
        <section>
          <Header theme={theme} changeTheme={changeTheme}/>
        </section>
        <section className="mt-8">
          <Screen theme={theme}/>
          <Keypad theme={theme}/>
        </section>
      </div>
    </main>
  )
}