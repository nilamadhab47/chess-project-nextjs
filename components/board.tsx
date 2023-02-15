/* eslint-disable */
import { Chess, Move } from "chess.js"
import styles from "./board.module.scss"
import { useEffect, useState } from "react"
import { p0, pw, pb, chess, getBoard } from "@/utils/chess-utils"
import { calculateBestMove, initGame } from "chess-ai";

export default function Board() {
    const [pieces, setPieces] = useState(new Array(8).fill(0).map(() => new Array(8).fill("")))
    useEffect(() => {
        initGame(chess, 1)
        setPieces(getBoard())
    }, [])
    const [highlighted, setHighlighted] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState()
    return (
        <div className={styles.board}>
            {
                // eslint-disable-next-line react/jsx-key
                new Array(8).fill(0).map((_, i) => <div className={styles.row} key={i}>
                    {
                        // eslint-disable-next-line react/jsx-key
                        new Array(8).fill(0).map((_, j) => {
                            let p = pieces[i][j];
                            let c = ""
                            if (p == ".") {
                                p = "";
                            } else if (p.match(/[A-Z]/)) {
                                p = pw[p0.indexOf(p.toLowerCase())]
                                c = "w"
                            } else {
                                p = pb[p0.indexOf(p)]
                                c = "b"
                            }
                            const square = `${"abcdefgh".charAt(j)}${8 - i}`
                            return (
                                <div className={[styles.col, (i + j) % 2 == 0 ? styles.w : styles.b, p && chess.turn() == c && styles.pointer, highlighted.slice(1).includes(square) && styles.highlighted,].join(" ")} key={`${i} ${j}`}
                                    onClick={() => {
                                        if (highlighted.slice(1).includes(square)) {
                                            chess.move({ to: square, from: highlighted[0] })
                                            const computerMove = calculateBestMove()
                                            if (computerMove) {
                                                const move = chess.move(computerMove)
                                                setPieces(getBoard())
                                                setHighlighted([move?.to, move?.from])
                                            }

                                        } else if (p && chess.turn() == c) {
                                            //@ts-ignore
                                            const mvs = chess.moves(({ square, verbose: true })) as Move[];
                                            setHighlighted([square, ...mvs.map(({ to }) => to)])
                                        } else {
                                            setHighlighted([])
                                        }

                                    }}
                                >
                                    {p}
                                </div>
                            )
                        })
                    }
                </div>)
            }
        </div>
    )
}