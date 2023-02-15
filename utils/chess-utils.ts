import { Chess } from "chess.js";

export const p0 = "rnbqkp";
export const pw = "♖♘♗♕♔♙";
export const pb = "♜♞♝♛♚♟";

export const chess = new Chess();

export const getBoard = () =>
    chess.ascii().split("\n").splice(1, 8).map((rank) => rank.slice(5, 27).split("  "));
    
