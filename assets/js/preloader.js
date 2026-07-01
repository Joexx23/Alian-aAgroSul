/**
 * Aliança Agro Sul - Gerenciador Premium do Preloader
 */
document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURAÇÕES FACILMENTE CUSTOMIZÁVEIS:
  const MIN_DURATION = 1500; // Tempo mínimo de exibição em milissegundos
  const preloader = document.getElementById("custom-preloader");
  const startTime = Date.now();

  if (!preloader) return;

  // Função para fechar o preloader de forma elegante
  function hidePreloader() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_DURATION - elapsedTime);

    setTimeout(() => {
      // Transição elegante usando CSS (Fade + Escala)
      preloader.style.opacity = "0";
      preloader.style.transform = "scale(1.03)";
      
      // Remove do fluxo após o término da transição CSS (600ms)
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.style.overflow = ""; // Restaura o scroll
        
        // Dispara evento nativo para que outras animações saibam que o preloader acabou
        window.dispatchEvent(new Event('preloaderFinished'));
      }, 600);

    }, remainingTime);
  }

  // Monitora o carregamento total de imagens, fontes e scripts da página
  window.addEventListener("load", hidePreloader);

  // Fallback de segurança: Caso o evento 'load' demore demais, oculta em no máximo 5s
  setTimeout(() => {
    if (preloader.style.display !== "none") {
      hidePreloader();
    }
  }, 5000);
});