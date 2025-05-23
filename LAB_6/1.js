let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

window.onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  const image = new Image();
  image.src = 'bulbassauro.png';  // Certifique-se de ter uma imagem chamada 'image.png'

  const imageWidth = 50;  // Largura da imagem
  const imageHeight = 50; // Altura da imagem

  let mouseX = 0;
  let mouseY = 0;

  // Atualiza a posição do mouse
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  // Desenha a imagem no canvas com base na posição do mouse
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpa o canvas
    ctx.drawImage(image, mouseX - imageWidth / 2, mouseY - imageHeight / 2, imageWidth, imageHeight);  // Desenha a imagem no canvas
    requestAnimationFrame(draw);  // Atualiza o desenho
  }

  image.onload = function() {
    draw();  // Começa a animação assim que a imagem estiver carregada
  };

  // Garante que a imagem não desapareça quando o mouse sair do canvas
  canvas.addEventListener('mouseleave', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpa o canvas quando o mouse sai
  });
};

 // Ajusta a posição da imagem para não sair do canvas
 let drawX = mouseX - imageWidth / 2;
 let drawY = mouseY - imageHeight / 2;



 // Garante que a imagem não saia do canvas à direita ou à esquerda
 if (drawX < 0) drawX = 0;
 if (drawX + imageWidth > canvas.width) drawX = canvas.width - imageWidth;

 // Garante que a imagem não saia do canvas para cima ou para baixo
 if (drawY < 0) drawY = 0;
 if (drawY + imageHeight > canvas.height) drawY = canvas.height - imageHeight;

 // Desenha a imagem no canvas
 ctx.drawImage(image, drawX, drawY, imageWidth, imageHeight);
    
 requestAnimationFrame(draw);  // Atualiza o desenho
s