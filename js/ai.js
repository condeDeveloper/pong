// Oponente controlado pelo computador
class AI {
  constructor(paddle, level) {
    this.paddle = paddle;
    this.setLevel(level);
    this.aim = H / 2;
    this.timer = 0;
  }

  setLevel(level) {
    this.cfg = AI_LEVELS[level] || AI_LEVELS.normal;
    this.paddle.maxSpeed = this.cfg.speed;
  }

  update(dt, ball) {
    // A IA só "olha" para a bola a cada `react` segundos, e mira com um erro aleatório.
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = this.cfg.react;
      if (ball.vx > 0) {
        // prevê onde a bola cruza a linha da raquete, considerando quiques nas bordas
        const t = (this.paddle.x - ball.x) / ball.vx;
        let y = ball.y + ball.vy * t;
        const span = H - BALL_R * 2;
        y = Math.abs(((y - BALL_R) % (2 * span) + 2 * span) % (2 * span));
        if (y > span) y = 2 * span - y;
        y += BALL_R;
        this.aim = y + (Math.random() * 2 - 1) * this.cfg.error;
      } else {
        // bola indo embora: volta ao centro devagar
        this.aim = H / 2 + (Math.random() * 2 - 1) * 30;
      }
    }
    this.paddle.target = this.aim;
  }
}
