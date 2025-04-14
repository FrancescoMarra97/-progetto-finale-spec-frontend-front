import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import { GlobalContextProvider } from "./context/GlobalContext"
import FavouritesPage from "./pages/FavoritesPage"
function App() {

  return (

    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:id" element={<DetailsPage />} />
            <Route path="/favorites" element={<FavouritesPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </GlobalContextProvider>

  )
}

export default App
