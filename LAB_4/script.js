function checkGuess() {
    const guess = parseInt(document.getElementById("ID_DO_ELEMENTO").value);
    const randomNumber = Math.floor(Math.random() * 10); 
    const result = document.getElementById("result");
    const container = document.getElementById("game-container");

  
    if (guess == randomNumber) {
      result.textContent = `Parabéns! Você acertou! O número era ${randomNumber}.`;
      container.style.setProperty("background-color", "lightgreen");
    }
    
else{
       result.textContent = `Errado, o número era ${randomNumber}.`;
      container.style.setProperty("background-color", "red");
    }
    
}