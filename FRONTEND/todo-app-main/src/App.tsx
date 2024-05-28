import Header from "./components/Header"

export default function App () {

  return (
    <main className="min-h-[100vh] bg-bg-mobile-light md:bg-bg-desktop-light bg-no-repeat bg-top bg-[length:100%_auto] bg-very-light-gray dark:bg-very-dark-blue dark:bg-bg-mobile-dark md:dark:bg-bg-desktop-dark">
      <div className="max-w-[500px] w-[85%] mx-auto">
        <Header />
      </div>
    </main>
  )
}