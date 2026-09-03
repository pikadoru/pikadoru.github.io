import type { Board, Player } from './rules'
import { getAvailableMoves, getWinner } from './rules'

export function chooseComputerMove(board: Board, computer: Player = 'O'): number | null {
  const moves = getAvailableMoves(board)
  if (!moves.length) return null
  const opponent = computer === 'X' ? 'O' : 'X'
  for (const move of moves) {
    const next = [...board]
    next[move] = computer
    if (getWinner(next) === computer) return move
  }
  for (const move of moves) {
    const next = [...board]
    next[move] = opponent
    if (getWinner(next) === opponent) return move
  }
  if (board[4] === null) return 4
  return moves[0]
}
