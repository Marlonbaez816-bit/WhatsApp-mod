const airdropTarget = document.getElementById('airdrop-target');
const modal = document.querySelector('.airdrop-modal');
const audio = document.getElementById('haptic-audio');

function triggerRecibir() {
    // Resetear estados
    airdropTarget.classList.remove('hidden');
    modal.classList.remove('animate-in', 'animate-impact', 'animate-out');
    document.getElementById('status-text').innerText = "Nuevo mensaje detectado";

    // 1. Entrada de AirDrop
    void modal.offsetWidth; // Reiniciar animación
    modal.classList.add('animate-in');

    // 2. El Choque (Impacto visual + Vibración)
    setTimeout(() => {
        modal.classList.add('animate-impact');
        
        // Vibración háptica real de iPhone
        if (navigator.vibrate) {
            // Patrón de choque: Fuerte - Pausa - Doble suave
            navigator.vibrate([100, 30, 50, 30, 50]);
        }
    }, 500);

    // Ocultar solo después de 4 segundos
    setTimeout(() => { 
        if(!modal.classList.contains('animate-out')) {
            airdropTarget.classList.add('hidden');
        }
    }, 4500);
}

function triggerEnviar() {
    modal.classList.remove('animate-in', 'animate-impact', 'animate-out');
    airdropTarget.classList.remove('hidden');
    document.getElementById('status-text').innerText = "Enviando por AirDrop...";
    
    modal.style.opacity = "1";
    modal.style.transform = "scale(1)";

    // Efecto de salida (vuelo) + Vibración corta
    setTimeout(() => {
        modal.classList.add('animate-out');
        if (navigator.vibrate) {
            navigator.vibrate(20); 
        }
    }, 400);

    setTimeout(() => { airdropTarget.classList.add('hidden'); }, 1200);
}

function reproducirEstado() {
    // Al abrir un estado, vibra sutilmente y suena
    if (navigator.vibrate) {
        navigator.vibrate([15, 20, 15]);
    }
    
    // Intentar reproducir el audio
    audio.play().catch(e => {
        console.log("El iPhone requiere un toque previo para sonar.");
        // Si falla, mostramos un mensaje sutil
        document.getElementById('status-text').innerText = "Toca para activar sonido";
        triggerRecibir();
    });
        }
