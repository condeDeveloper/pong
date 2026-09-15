// Constantes do jogo
const W = 800, H = 500;
const PADDLE_W = 12, PADDLE_H = 90, PADDLE_MARGIN = 24;
const PADDLE_SPEED = 520;      // px/s (teclado)
const BALL_R = 7;
const BALL_SPEED = 380;        // px/s inicial
const BALL_SPEED_UP = 1.045;   // multiplicador a cada rebatida
const BALL_MAX_SPEED = 1100;
const MAX_BOUNCE_ANGLE = Math.PI / 3.2; // ~56°
const WIN_SCORE = 7;
const SERVE_DELAY = 900;       // ms antes de sacar

// Dificuldade da IA: velocidade máxima e erro de mira (px)
const AI_LEVELS = {
  easy:   { speed: 260, error: 70, react: 0.45 },
  normal: { speed: 380, error: 35, react: 0.25 },
  hard:   { speed: 560, error: 8,  react: 0.08 },
};
