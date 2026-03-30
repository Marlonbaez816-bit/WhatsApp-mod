// Referencias a los elementos
const notifContainer = document.getElementById('notification-container');
const airdropBox = notifContainer.querySelector('.airdrop-pop');
const messagePreview = notifContainer.querySelector('.message-preview');

function simulateRecibir() {
    // 1. Cambiar el texto de la notificación
    messagePreview.innerText = "¡Mensaje de Choque Recibido!";

    // 2. Mostrar contenedor y reiniciar animaciones
    notifContainer.classList.remove('hidden');
    airdropBox.classList.remove('animate-airdrop', 'animate-choque');
    
    // Forzar un "reflow" para que el navegador reinicie la animación
    void airdropBox.offsetWidth;

    // 3. Aplicar animaciones: Combinación de AirDrop In y Choque Neón
    airdropBox.classList.add('animate-airdrop');
    
    // Esperar un poco a que entre para que dé el "choque"
    setTimeout(() => {
        airdropBox.classList.add('animate-choque');
        
        // Simular vibración háptica del iPhone si está soportado
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]); // Vibración doble corta
        }
    }, 400);

    // 4. Ocultar automáticamente después de unos segundos (como iOS)
    setTimeout(() => {
        notifContainer.classList.add('hidden');
    }, 4000);
               }
