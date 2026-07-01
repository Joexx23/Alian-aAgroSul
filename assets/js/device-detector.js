/**
 * Aliança Agro Sul - Sistema Inteligente de Detecção de Dispositivo
 * Executa em poucos milissegundos para evitar flashes da interface errada.
 */
(function () {
  // 1. Identificar a página atual para evitar loops de redirecionamento
  const currentPath = window.location.pathname;
  const isMobilePage = currentPath.includes('mobile.html');
  const isTabletPage = currentPath.includes('tablet.html');
  const isDesktopPage = !isMobilePage && !isTabletPage; // index.html ou raiz /

  // 2. Critérios robustos de detecção (além do User Agent)
  const width = window.innerWidth || document.documentElement.clientWidth;
  
  // Detecção de Touch Capacitivo e Pointer Fino/Grosso
  const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  
  // Verificação de Media Queries modernas para tablets/smartphones
  const isMobileQuery = window.matchMedia('(max-width: 768px)').matches;
  const isTabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;

  // 3. Classificação do Dispositivo
  let detectedDevice = 'desktop';

  if (isMobileQuery && hasTouch) {
    detectedDevice = 'smartphone';
  } else if ((isTabletQuery && hasTouch) || (width <= 1024 && hasTouch && isCoarsePointer)) {
    // Tratamento especial para iPads modernos que se passam por Mac Desktop mas possuem touch ativo
    detectedDevice = 'tablet';
  } else if (width <= 768) {
    detectedDevice = 'smartphone';
  }

  // 4. Mapeamento de Destinos (Altere os caminhos aqui facilmente)
  const routes = {
    smartphone: 'mobile.html',
    tablet: 'tablet.html',
    desktop: 'index.html' // Página principal padrão
  };

  // 5. Execução do Redirecionamento Direto Sem Flash de Tela
  if (detectedDevice === 'smartphone' && !isMobilePage) {
    window.location.replace(routes.smartphone);
  } else if (detectedDevice === 'tablet' && !isTabletPage) {
    window.location.replace(routes.tablet);
  } else if (detectedDevice === 'desktop' && !isDesktopPage) {
    window.location.replace(routes.desktop);
  }

  // Adiciona uma classe ao documento caso queira usar estilos CSS específicos baseados no dispositivo
  document.documentElement.classList.add(`device-${detectedDevice}`);
})();