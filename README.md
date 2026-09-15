# 🏓 Pong

Pong clássico em HTML5 Canvas + JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/pong/

## Rodar local

```bash
npx serve -l 5183 .
```

## Modos

| Modo         | Descrição                                           |
|--------------|-----------------------------------------------------|
| Fácil        | CPU lenta, reage devagar e erra bastante            |
| Normal       | CPU equilibrada                                     |
| Difícil      | CPU rápida com previsão quase perfeita              |
| 2 Jogadores  | Sem CPU: W/S contra ↑/↓, ou multi-touch no celular  |

Teclas `1` a `4` trocam de modo. Primeiro a fazer 7 pontos vence.

## Controles

| Ação                    | Tecla / gesto                     |
|-------------------------|-----------------------------------|
| Raquete esquerda        | W / S, mouse ou toque à esquerda  |
| Raquete direita (2P)    | ↑ / ↓ ou toque à direita          |
| Pausar                  | Espaço, P ou Esc                  |

## Funcionalidades

- Ângulo da rebatida depende de onde a bola toca a raquete
- Bola acelera a cada rebatida, com limite de velocidade
- IA que prevê a trajetória (incluindo quiques na parede) com erro e tempo de reação por dificuldade
- Efeito da velocidade da raquete na bola
- Rastro da bola, flash de ponto, saque piscando
- Sons via WebAudio

## Estrutura

```
js/config.js   # constantes e níveis da IA
js/paddle.js   # raquete
js/ball.js     # física da bola
js/ai.js       # oponente
js/render.js   # desenho
js/audio.js    # sons
js/input.js    # teclado, mouse, toque
js/game.js     # estados e loop
```

## Licença

MIT
