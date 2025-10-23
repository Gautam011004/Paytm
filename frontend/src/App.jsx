import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { Transfer } from "./pages/transfer"
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="signup" element={<Signup/>}/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="transfer" element={<Transfer/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
