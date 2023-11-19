document.addEventListener('DOMContentLoaded', () => {
  const cards: string[] = [
    '<img src="assets/images/ablack.png" alt="king">',
    '<img src="assets/images/ablack.png" alt="king">',
    '<img src="assets/images/ablack2.png" alt="black queen">',
    '<img src="assets/images/ablack2.png" alt="black queen">',
    '<img src="assets/images/ared.png" alt="red queen">',
    '<img src="assets/images/ared.png" alt="red queen">',
  ];

  const shuffledCards: string[] = cards.sort(() => ((Math.random() > 0.5) ? 1 : -1));
  const element: HTMLElement | null = document.querySelector('.timer');
  let sec = 0;
  let timer: NodeJS.Timeout;

  function timerFunction(): void {
    timer = setInterval(() => {
      if (element) {
        element.innerHTML = sec.toString();
        sec += 1;
      }
    }, 1000);
  }

  function startTheGame(): void {
    const gameContainer: HTMLElement | null = document.querySelector('.game');
    if (gameContainer) {
      gameContainer.innerHTML = ''; // Clear existing cards

      shuffledCards.forEach((card) => {
        const box: HTMLDivElement = document.createElement('div');
        box.className = 'item';
        box.innerHTML = card;

        box.onclick = () => {
          if (box.classList) {
            box.classList.add('boxOpen');
            setTimeout(() => {
              if (document.querySelectorAll('.boxOpen').length > 1) {
                if (document.querySelectorAll('.boxOpen')[0].innerHTML
                                    === document.querySelectorAll('.boxOpen')[1].innerHTML) {
                  document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
                  document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');
                  document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                  document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                  if (document.querySelectorAll('.boxMatch').length === cards.length) {
                    alert('YOU WIN');
                    clearInterval(timer);
                  }
                } else {
                  document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                  document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                }
              }
            }, 1500);
          }
        };

        if (gameContainer) {
          gameContainer.appendChild(box);
        }
      });
    }
  }

  const startButton: HTMLElement | null = document.querySelector('.start');
  if (startButton) {
    startButton.addEventListener('click', () => {
      startTheGame();
      timerFunction();
    });
  }

  const resetButton: HTMLElement | null = document.querySelector('.reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      clearInterval(timer);
      sec = 0;
      if (element) {
        element.innerHTML = '0';
      }
      startTheGame();
      timerFunction();
    });
  }
});
