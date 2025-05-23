function gerarNumero() {
    // Gerando um número aleatório entre 0 e 50
    const numeroAleatorio = Math.floor(Math.random() * 51); // 51 é o limite superior exclusivo
    // Exibindo o número na página
    document.getElementById('randomNumber').innerText = numeroAleatorio;
}