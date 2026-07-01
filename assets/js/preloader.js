/**
 * Aliança Agro Sul - Gerenciador Premium do Preloader
 */
document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURAÇÕES FACILMENTE CUSTOMIZÁVEIS:
  const MIN_DURATION = 1500; // Tempo mínimo de exibição em milissegundos
  const preloader = document.getElementById("custom-preloader");
  const startTime = Date.now();

  if (!preloader) return;

  // Função para fechar o preloader de forma elegante (Premium Fade + Blur)
  function hidePreloader() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_DURATION - elapsedTime);

    setTimeout(() => {
      // Transição premium suave (Reduz opacidade e aplica desfoque leve)
      preloader.style.opacity = "0";
      preloader.style.filter = "blur(10px)";
      
      // Remove do fluxo após o término da transição CSS (500ms)
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.style.overflow = ""; // Restaura o scroll do Lenis
        
        // Dispara evento nativo para ativar o Scroll Reveal
        window.dispatchEvent(new Event('preloaderFinished'));
      }, 500);

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
