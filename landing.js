window.addEventListener('DOMContentLoaded',()=>{
  const leftGate=document.querySelector('.gate-left');
  const rightGate=document.querySelector('.gate-right');
  const btn=document.getElementById('openBtn');

  leftGate.classList.remove('open');
  rightGate.classList.remove('open');
  btn.classList.remove('clicked');

  btn.addEventListener('click',()=>{
    btn.classList.add('clicked');
    leftGate.classList.add('open');
    rightGate.classList.add('open');
    sessionStorage.setItem('fromLanding','true');
    setTimeout(()=>{window.location.href='index.html';},1800);
  });
});
