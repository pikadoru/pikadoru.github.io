import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../layouts/SiteLayout'
import { HomePage } from '../pages/home/HomePage'
import { GamesPage } from '../pages/games/GamesPage'
import { MinigamesPage } from '../pages/games/minigames/MinigamesPage'
import { TicTacToePage } from '../pages/games/minigames/TicTacToePage'
import { ToolsPage } from '../pages/tools/ToolsPage'
import { InfoPage } from '../pages/info/InfoPage'

export function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/minigames" element={<MinigamesPage />} />
        <Route path="/games/minigames/tic-tac-toe" element={<TicTacToePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </SiteLayout>
  )
}
