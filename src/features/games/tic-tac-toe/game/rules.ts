export type Player = 'X' | 'O'
export type Cell = Player | null
export type Board = Cell[]

export const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const

export function getWinner(board: Board): Player | null {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return null
}

export function isDraw(board: Board) { return !getWinner(board) && board.every(Boolean) }
export function getAvailableMoves(board: Board) { return board.flatMap((cell, index) => cell ? [] : [index]) }
