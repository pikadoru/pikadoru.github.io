import type { Board } from '../game/rules'

export function GameBoard({ board, onMove, disabled }: { board: Board; onMove: (index: number) => void; disabled: boolean }) {
  return <div className="game-board" role="grid" aria-label="Tic-tac-toe board">
    {board.map((cell, index) => <button className={`game-cell ${cell ? `cell-${cell.toLowerCase()}` : ''}`} key={index} type="button" role="gridcell" aria-label={cell ? `Square ${index + 1}, ${cell}` : `Square ${index + 1}, empty`} onClick={() => onMove(index)} disabled={disabled || cell !== null}>{cell}</button>)}
  </div>
}
