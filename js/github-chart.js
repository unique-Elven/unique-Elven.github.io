(function () {
  const chartHtml = `<img src="https://ghchart.rshah.org/409ba5/unique-Elven" alt="unqique-Elven's Blue Github Chart" class="medium-zoom-image github-chart-img">`;

  function createChart(locationClass) {
    const wrapper = document.createElement('div');
    wrapper.className = `github-chart-card ${locationClass}`;
    wrapper.innerHTML = chartHtml;
    return wrapper;
  }

  function isPostPage() {
    return window.GLOBAL_CONFIG && window.GLOBAL_CONFIG.pageType === 'post';
  }

  function injectPostChart() {
    if (!isPostPage()) return;
    const article = document.querySelector('#article-container');
    if (!article || article.querySelector('.github-chart-post')) return;
    article.insertBefore(createChart('github-chart-post'), article.firstChild);
  }

  function injectAsideChart() {
    const aside = document.querySelector('#aside-content');
    if (!aside || aside.querySelector('.github-chart-aside')) return;
    const authorCard = aside.querySelector('.card-info') || aside.querySelector('.card-widget');
    if (!authorCard) return;
    authorCard.insertAdjacentElement('afterend', createChart('github-chart-aside'));
  }

  function injectGithubCharts() {
    injectPostChart();
    injectAsideChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGithubCharts);
  } else {
    injectGithubCharts();
  }

  if (window.btf && typeof window.btf.addGlobalFn === 'function') {
    window.btf.addGlobalFn('pjaxComplete', injectGithubCharts, 'githubChart');
  }
})();
