import { io, type Socket } from 'socket.io-client'

export type OnlineSnapshot = {
  roomId: string
  board: Array<'X' | 'O' | null>
  turn: 'X' | 'O'
  outcome: 'active' | 'X' | 'O' | 'draw'
  players: Record<string, 'X' | 'O'>
  yourPlayer: 'X' | 'O'
  version: number
}

export function createGameSocket(origin: string, token: string): Socket {
  return io(origin, { auth: { token }, transports: ['websocket', 'polling'] })
}
