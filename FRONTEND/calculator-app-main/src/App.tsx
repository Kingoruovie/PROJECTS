import { useState, useRef } from "react"
import React from "react"
import themeClasses from "./utils/utils"

import Header from "./components/Header"
import Screen from "./components/Screen"
import Keypad from "./components/Keypad"

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [input, setInput] = useState('')
  const ref = useRef({
    previousValue: 0,
    nextValue: 0,
    operation: '',
    equalState: false
  })

  const changeTheme = (colorScheme: string) => {
    setTheme(colorScheme)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.value === '-' || String(Number(event.target.value.split(',').join(''))) !== 'NaN') {
      setInput(Calculator.handleDisplayRep(event.target.value))
      ref.current.nextValue = Number(Calculator.handleNumberRep(event.target.value))
    }
  }

  
  class Calculator {
    static handleDisplayRep (value: string): string {
      value = value.split(',').join('')
      let wholePart: string
      let decimalPart: string = ''
      if (value.includes('.')) {
        [wholePart, decimalPart] = value.split('.') 
      } else {
        wholePart = value
      }
      let x: number = Number(wholePart)
      let rep: string = ''
      while (x >= 1000) {
        const rem: string = x % 1000 === 0 ? '000': 
          x % 1000 < 10 ? '00' + String(x % 1000) :
          x % 1000 < 100 ? '0' + String(x % 1000) :
          String(x % 1000)
        x = Math.floor(x / 1000)
        rep = ',' + rem + rep
      }
      rep = String(x) + rep + (decimalPart ? '.' + decimalPart: '')
      return rep
    }

    static handleNumberRep (value: string): string {
      return value.split(',').join('')
    }

    handleKeys (value: string) {
      if (input.length >= 11) return
      if (!ref.current.equalState) {
        setInput(Calculator.handleDisplayRep(input + value))
        ref.current.nextValue = Number(Calculator.handleNumberRep(input + value))
      } else{
        setInput(String(value))
        ref.current.nextValue = Number()
        ref.current.equalState =  false
      }
    }

    handleDel () {
      if (input !== '') {
        const newInput: string[] = input.split('')
        newInput.pop()
        setInput(Calculator.handleDisplayRep(newInput.join('')))
        ref.current.nextValue = Number(Calculator.handleNumberRep(newInput.join('')))
      }
    }

    handleReset () {
      setInput('')
      ref.current.nextValue = 0
      ref.current.previousValue = 0
    }

    handleDecimal () {
      if (!input.includes('.')) {
        setInput(input + '.')
        ref.current.nextValue = Number(Calculator.handleNumberRep(input + '.'))
      }
    }

    handleEqual () {
      ref.current.equalState = true
      let maxDec = 0
      if (String(ref.current.previousValue).includes('.') && String(ref.current.previousValue).includes('.')) {
        maxDec = Math.max(String(ref.current.previousValue).split('.').length, String(ref.current.nextValue).split('.').length)
      }
      let total: number = 0
      if (ref.current.operation === '+') {
        total = ref.current.previousValue + ref.current.nextValue
      } else if (ref.current.operation === '-') {
        total = ref.current.previousValue - ref.current.nextValue
      } else if (ref.current.operation === '×') {
        total = ref.current.previousValue * ref.current.nextValue
      } else if (ref.current.operation === '/') {
        total = ref.current.previousValue / ref.current.nextValue
        if (total === Infinity) {
          setInput('Error')
          return
        }
      }

      if (maxDec !== 0) {
        total = Number(total.toFixed(maxDec))
      }
      ref.current.previousValue = total
      ref.current.nextValue = 0
      setInput(Calculator.handleDisplayRep(String(total)))
      ref.current.operation = ''
    }

    handleOperation (operation: string) {
      switch (operation) {
        case '+':
          ref.current.previousValue = ref.current.nextValue
          ref.current.nextValue = 0
          ref.current.operation = operation
          setInput('')
          break
        case '-':
          if (ref.current.nextValue === 0) {
            setInput('-')
          } else {
            ref.current.previousValue = ref.current.nextValue
            ref.current.nextValue = 0
            ref.current.operation = operation
            setInput('')
          }
          break
        case '/':
          ref.current.previousValue = ref.current.nextValue
          ref.current.nextValue = 0
          ref.current.operation = operation
          setInput('')
          break
        case '×':
          ref.current.previousValue = ref.current.nextValue
          ref.current.nextValue = 0
          ref.current.operation = operation
          setInput('')
          break
      }
    }
  }
  const calculator = new Calculator()

  return (
    <main className={`font-display min-h-[100vh] md:flex justify-center items-center ${themeClasses[theme].mainBg} ${themeClasses[theme].textColor1}`}>
      <div className="w-[90%] max-w-lg mx-auto pt-8">
        <section>
          <Header theme={theme} changeTheme={changeTheme}/>
        </section>
        <section className="mt-8">
          <Screen theme={theme} value={input} handleInput={handleInput}/>
          <Keypad 
            theme={theme} 
            handleKeys={calculator.handleKeys} 
            handleDel={calculator.handleDel}
            handleReset={calculator.handleReset}
            handleDecimal={calculator.handleDecimal}
            handleOperation={calculator.handleOperation}
            handleEqual={calculator.handleEqual}
          />
        </section>
      </div>
    </main>
  )
}