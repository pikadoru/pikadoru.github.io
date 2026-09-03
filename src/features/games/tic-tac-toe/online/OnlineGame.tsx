import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { io, type Socket } from 'socket.io-client'
import { GameBoard } from '../components/GameBoard'
import { getWinner, isDraw, type Board, type Player } from '../game/rules'
import type { OnlineSnapshot } from '../../../../services/realtime/socket'

type OnlineGameProps = { onBack: () => void }
type Stage = 'ready' | 'queue' | 'matched' | 'playing' | 'finished' | 'error'
const apiOrigin = import.meta.env.VITE_ONLINE_API_ORIGIN as string | undefined

export function OnlineGame({ onBack }: OnlineGameProps) {
  const [stage, setStage] = useState<Stage>('ready')
  const [message, setMessage] = useState('')
  const [queueInfo, setQueueInfo] = useState<{ position: number | null; total: number } | null>(null)
  const [snapshot, setSnapshot] = useState<OnlineSnapshot | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const tokenRef = useRef<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    tokenRef.current = token
    socketRef.current = socket
  }, [token, socket])

  useEffect(() => () => {
    const activeToken = tokenRef.current
    if (activeToken && apiOrigin) void fetch(`${apiOrigin}/v1/queue/leave`, { method: 'POST', headers: { Authorization: `Bearer ${activeToken}` }, keepalive: true })
    socketRef.current?.disconnect()
  }, [])

  async function startQueue() {
    if (!apiOrigin) { setStage('error'); setMessage('Online play is not configured for this build.'); return }
    socket?.disconnect()
    setSocket(null)
    setSnapshot(null)
    setStage('queue'); setMessage('Finding a random player…')
    try {
      const sessionResponse = await fetch(`${apiOrigin}/v1/sessions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      if (!sessionResponse.ok) throw new Error('Could not create a player session')
      const session = await sessionResponse.json() as { token: string }
      setToken(session.token)
      const nextSocket = io(apiOrigin, { auth: { token: session.token }, transports: ['websocket', 'polling'] })
      await new Promise<void>((resolve, reject) => {
        nextSocket.once('connect', resolve)
        nextSocket.once('connect_error', () => reject(new Error('Could not connect to the online server')))
      })
      const queueResponse = await fetch(`${apiOrigin}/v1/queue/join`, { method: 'POST', headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ gameType: 'tic-tac-toe' }) })
      if (!queueResponse.ok) { nextSocket.disconnect(); throw new Error('Could not join matchmaking') }
      nextSocket.on('room:matched', ({ roomId }: { roomId: string }) => { setStage('matched'); setMessage('Opponent found. Starting the game…'); nextSocket.emit('room:join', roomId) })
      nextSocket.on('queue:position', (info: { position: number | null; total: number }) => setQueueInfo(info))
      nextSocket.on('room:snapshot', (nextSnapshot: OnlineSnapshot) => { setSnapshot(nextSnapshot); setStage(nextSnapshot.outcome === 'active' ? 'playing' : 'finished'); setMessage('') })
      nextSocket.on('room:error', ({ message: errorMessage }: { message?: string }) => { setStage('error'); setMessage(errorMessage || 'The server rejected that action.') })
      nextSocket.on('connect_error', () => { setStage('error'); setMessage('Could not connect to the online server.') })
      nextSocket.on('room:opponent-disconnected', () => { setMessage('Your opponent disconnected. Waiting for them to reconnect…') })
      nextSocket.on('room:abandoned', () => { setStage('error'); setMessage('The room ended after the reconnect window expired.') })
      setSocket(nextSocket)
    } catch (error) { setStage('error'); setMessage(error instanceof Error ? error.message : 'Online play is unavailable.') }
  }

  function sendMove(index: number) {
    if (!socket || !snapshot || snapshot.board[index] || snapshot.outcome !== 'active') return
    socket.emit('room:move', { roomId: snapshot.roomId, clientMoveId: crypto.randomUUID(), version: snapshot.version, index })
  }

  async function leaveQueue() {
    if (token && apiOrigin) await fetch(`${apiOrigin}/v1/queue/leave`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
    socket?.disconnect(); setSocket(null); setSnapshot(null); setQueueInfo(null); setStage('ready'); setMessage('')
  }

  async function queueAgain() {
    await leaveQueue()
    await startQueue()
  }

  const winner = snapshot ? getWinner(snapshot.board as Board) : null
  const draw = snapshot ? isDraw(snapshot.board as Board) : false
  if (stage === 'ready' || stage === 'error') return <section className="game-panel online-placeholder" aria-live="polite"><p className="eyebrow">Online / Random player</p><h2>{stage === 'error' ? 'Connection unavailable.' : 'Find someone to play.'}</h2><p className="lede">{stage === 'error' ? message : 'Join the matchmaking queue and we will pair you with a random opponent.'}</p><div className="online-actions"><button className="primary-button" type="button" onClick={() => void startQueue}>Find a player</button><button className="text-button" type="button" onClick={onBack}>← Select another mode</button></div></section>
  if (stage === 'queue' || stage === 'matched') return <section className="game-panel online-placeholder" aria-live="polite"><p className="eyebrow">Online / Step 02</p><h2>{message}</h2><p className="lede">{stage === 'queue' ? `Players are matched in a randomized 10-second window. ${queueInfo?.position ? `You are #${queueInfo.position} of ${queueInfo.total}.` : ''}` : 'Your room is being prepared.'}</p><button className="text-button" type="button" onClick={() => void leaveQueue()}>Leave queue</button></section>
  return <div className="game-layout"><section className="game-panel" aria-label="Online tic-tac-toe game"><div className="game-stage-label"><span>Online / Play</span><span>You are {snapshot?.yourPlayer ?? '—'} · {snapshot?.version ?? 0} moves</span></div><p className="game-status" aria-live="polite">{winner ? `${winner} wins!` : draw ? 'A draw.' : snapshot?.turn === snapshot?.yourPlayer ? 'Your turn' : 'Opponent’s turn'}</p><GameBoard board={snapshot?.board ?? Array(9).fill(null)} onMove={sendMove} disabled={!snapshot || snapshot.outcome !== 'active' || snapshot.turn !== snapshot.yourPlayer} />{(winner || draw) && <div className="result-backdrop"><section className="result-dialog" role="dialog" aria-modal="true" aria-labelledby="online-result-heading"><p className="eyebrow">Step 03 / Next move</p><h2 id="online-result-heading">{winner ? `${winner} wins!` : 'A draw.'}</h2><p className="dialog-copy">Play another random match or leave online play.</p><div className="game-actions"><button type="button" onClick={() => void queueAgain()}>Queue and play again</button><button type="button" onClick={async () => { await leaveQueue(); onBack() }}>Select mode</button><Link to="/games/minigames">Back to minigames</Link><Link to="/">Back to home</Link></div></section></div>}</section><aside className="game-aside"><span className="aside-number">01</span><p>The server owns the board, turn, and result. Your browser only sends a move intent.</p></aside></div>
}
