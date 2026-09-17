/* =========================================================
   Estatly — listing filters and sorting (properties.html only).
   Works on the cards already in the HTML, so the full list is
   visible and crawlable if JavaScript never runs.
   ========================================================= */
(function () {
  'use strict';

  var grid = document.getElementById('propertyGrid');
  if (!grid) return;

  // Original DOM order doubles as the "Recommended" sort.
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var selects = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var sortSelect = document.getElementById('f-sort');
  var countEl = document.getElementById('resultCount');
  var emptyEl = document.getElementById('noResults');
  var resetButtons = document.querySelectorAll('[data-reset]');

  // Prices live in data-price as lakhs, so the budget bands are plain numbers.
  function inBudget(price, band) {
    if (!band) return true;
    var parts = band.split('-');
    return price >= Number(parts[0]) && price < Number(parts[1]);
  }

  function currentFilters() {
    var values = {};
    selects.forEach(function (el) { values[el.dataset.filter] = el.value; });
    return values;
  }

  function matches(card, f) {
    if (f.city && card.dataset.city !== f.city) return false;
    if (f.type && card.dataset.type !== f.type) return false;
    if (f.beds && Number(card.dataset.beds) < Number(f.beds)) return false;
    return inBudget(Number(card.dataset.price), f.budget);
  }

  function sorted(list) {
    var mode = sortSelect ? sortSelect.value : 'default';
    if (mode === 'default') return list;

    return list.slice().sort(function (a, b) {
      if (mode === 'price-asc') return a.dataset.price - b.dataset.price;
      if (mode === 'price-desc') return b.dataset.price - a.dataset.price;
      if (mode === 'area-desc') return b.dataset.area - a.dataset.area;
      return 0;
    });
  }

  function apply() {
    var f = currentFilters();
    var shown = 0;

    cards.forEach(function (card) {
      var ok = matches(card, f);
      card.classList.toggle('is-hidden', !ok);
      if (ok) shown++;
    });

    // Re-append in sort order; appendChild moves nodes rather than copying.
    var frag = document.createDocumentFragment();
    sorted(cards).forEach(function (card) { frag.appendChild(card); });
    grid.appendChild(frag);

    if (countEl) {
      countEl.innerHTML = '<strong>' + shown + '</strong> ' +
        (shown === 1 ? 'property' : 'properties') +
        (shown === cards.length ? '' : ' of ' + cards.length);
    }
    if (emptyEl) emptyEl.classList.toggle('show', shown === 0);
  }

  selects.forEach(function (el) { el.addEventListener('change', apply); });
  if (sortSelect) sortSelect.addEventListener('change', apply);

  resetButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      selects.forEach(function (el) { el.value = ''; });
      if (sortSelect) sortSelect.value = 'default';
      apply();
    });
  });

  apply();
})();
