document.querySelector('.apply')?.addEventListener('click', () => {
  const selects = document.querySelectorAll('.filters select');
  const segment = selects[0]?.value;
  const region = selects[1]?.value;
  document.querySelector('.range').textContent = `Last 30 days · ${segment} · ${region}`;
});

document.querySelector('.reset')?.addEventListener('click', () => {
  document.querySelectorAll('.filters select').forEach((select) => { select.selectedIndex = 0; });
  document.querySelector('.range').textContent = 'Last 30 days';
});
