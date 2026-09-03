import { useEffect, useState } from 'react'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { GameBoard } from '../../../features/games/tic-tac-toe/components/GameBoard'
import { chooseComputerMove } from '../../../features/games/tic-tac-toe/game/computerPlayer'
import { getWinner, isDraw, type Board, type Player } from '../../../features/games/tic-tac-toe/game/rules'
import { Link } from 'react-router-dom'

type Mode = 'local' | 'computer' | 'online'
const emptyBoard = (): Board => Array<Cell>(9).fill(null)
type Cell = Board[number]

export function TicTacToePage() {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [turn, setTurn] = useState<Player>('X')
  const [mode, setMode] = useState<Mode | null>(null)
  const [showResult, setShowResult] = useState(false)
  const winner = getWinner(board)
  const draw = isDraw(board)
  const computerTurn = mode === 'computer' && turn === 'O' && !winner && !draw

  useEffect(() => {
    if (!computerTurn) return
    const timer = window.setTimeout(() => {
      const move = chooseComputerMove(board)
      if (move === null) return
      setBoard((current) => { const next = [...current]; next[move] = 'O'; return next })
      setTurn('X')
    }, 350)
    return () => window.clearTimeout(timer)
  }, [board, computerTurn])

  function handleMove(index: number) {
    if (board[index] || winner || draw || computerTurn) return
    setBoard((current) => { const next = [...current]; next[index] = turn; return next })
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  function reset() { setBoard(emptyBoard()); setTurn('X'); setShowResult(false) }
  function selectMode(nextMode: Mode) { setMode(nextMode); reset() }
  function selectModeScreen() { setMode(null); reset() }
  const status = winner ? `${winner} wins!` : draw ? 'A draw. Well played.' : computerTurn ? 'The computer is thinking…' : `${turn}'s turn`

  const modeSelection = <section className="mode-selection" aria-labelledby="mode-heading">
    <p className="eyebrow">Step 01 / Choose your game</p>
    <h2 id="mode-heading">How do you want to play?</h2>
    <div className="mode-options">
      <button className="mode-option" type="button" onClick={() => selectMode('local')}><span className="mode-number">01</span><strong>Local two-player</strong><span>Share the board and take turns.</span><span className="card-arrow" aria-hidden="true">↗</span></button>
      <button className="mode-option mode-option-accent" type="button" onClick={() => selectMode('computer')}><span className="mode-number">02</span><strong>Vs computer</strong><span>Play against a local opponent.</span><span className="card-arrow" aria-hidden="true">↗</span></button>
      <button className="mode-option mode-option-disabled" type="button" onClick={() => selectMode('online')}><span className="mode-number">03</span><strong>Online</strong><span>Coming soon: find another player.</span><span className="card-arrow" aria-hidden="true">↗</span></button>
    </div>
  </section>

  const onlinePlaceholder = <section className="game-panel online-placeholder" aria-live="polite"><p className="eyebrow">Online mode</p><h2>Online play is still warming up.</h2><p className="lede">The local game is ready now. Online matches will arrive when the multiplayer service is connected.</p><button className="text-button" type="button" onClick={selectModeScreen}>← Select another mode</button></section>

  useEffect(() => {
    if (winner || draw) setShowResult(true)
  }, [winner, draw])

  const gameStage = <div className="game-layout">
    <section className="game-panel" aria-label="Tic-tac-toe game">
      <div className="game-stage-label"><span>Step 02 / Play</span><span>{mode === 'computer' ? 'Vs computer' : 'Two players'}</span></div>
      <p className={`game-status ${winner || draw ? 'game-over' : ''}`} aria-live="polite">{status}</p>
      <GameBoard board={board} onMove={handleMove} disabled={computerTurn || Boolean(winner) || draw} />
      {!winner && !draw && <button className="text-button game-change-mode" type="button" onClick={selectModeScreen}>← Change mode</button>}
      {showResult && <div className="result-backdrop" role="presentation"><section className="result-dialog" role="dialog" aria-modal="true" aria-labelledby="result-heading"><button className="dialog-close" type="button" aria-label="Close result dialog" onClick={() => setShowResult(false)}>×</button><p className="eyebrow">Step 03 / Next move</p><h2 id="result-heading">{winner ? `${winner} wins!` : 'A draw.'}</h2><p className="dialog-copy">{winner ? 'That was a good round. What should we do next?' : 'No spaces left. What should we do next?'}</p><div className="game-actions"><button type="button" onClick={reset}>Play again</button><button type="button" onClick={selectModeScreen}>Select mode</button><Link to="/games/minigames">Back to minigames</Link><Link to="/">Back to home</Link></div></section></div>}
    </section>
    <aside className="game-aside"><span className="aside-number">01</span><p>Take turns placing your mark. Three in a row wins the round.</p><p className="aside-note">X always starts.</p></aside>
  </div>

  return <div className="page game-page">
    <Breadcrumbs items={[{ label: 'Games', to: '/games' }, { label: 'Minigames', to: '/games/minigames' }, { label: 'Tic-tac-toe' }]} />
    <div className="game-heading"><div><p className="eyebrow">Games / Minigames</p><h1>Tic-tac-toe</h1><p className="lede">A classic, with room for one more rematch.</p></div></div>
    {!mode && modeSelection}
    {mode === 'online' && onlinePlaceholder}
    {mode && mode !== 'online' && gameStage}
  </div>
}
