
import './App.css'
import {Show , SignInButton, SignOutButton, UserAvatar}from "@clerk/react"
function App() {
  return (
    <div>
      <h1>my app</h1>
      <header>
        <Show when="signed-out">
        <SignInButton mode = "modal" />
        </Show>
        <Show when="signed-in">
          <h1 ><UserAvatar/></h1>
          
          <SignOutButton/>
        </Show>
      </header>
    </div>
  )
}

export default App
