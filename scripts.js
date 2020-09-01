const root = document.body;
const modal = document.getElementById('modal');
const buttonOpen = document.getElementById('button-open');
const buttonClose = document.getElementById('button-close');
const buttonScrim = document.getElementById('button-scrim');

const focusableElements = 'a[href], button:not(disabled), input:not(disabled), select:not(disabled), textarea:not(disabled), [tabindex]:not([tabindex="-1"]), [contenteditable]';

const setOpenFocus = () => {
  document.getElementById('modal-title').focus();
}

const setCloseFocus = () => {
  document.querySelector('[aria-controls="'+modal.id+'"]').focus();
}

const fixBodyPosition = () => {
  root.style.setProperty('--top', `-${window.scrollY}px`);
  root.classList.add('has-open-modal');
}

const releaseBodyPosition = () => {
  const top = root.style.getPropertyValue('--top');
  root.classList.remove('has-open-modal');
  const topOffset = parseInt(top, 10) * -1;

  root.style.removeProperty('--top');
  window.scrollTo(0, topOffset);
}

const setFocusTrap = () => {
  const focusableChildren = modal.querySelectorAll(focusableElements);

  const firstChild = focusableChildren[0];
  const lastChild = focusableChildren[focusableChildren.length - 1];

  firstChild.addEventListener('blur', e => {
    e.preventDefault();
    if (!e.relatedTarget || !modal.contains(e.relatedTarget)) {
      lastChild.focus();
    }
  });

  lastChild.addEventListener('blur', e => {
    e.preventDefault();
    if (!e.relatedTarget || !modal.contains(e.relatedTarget)) {
      firstChild.focus();
    }
  });
}

const openModal = () => {
  modal.setAttribute('open', true);
  modal.removeAttribute('inert');
  modal.removeAttribute('aria-hidden');

  buttonScrim.classList.remove('is-hidden');

  fixBodyPosition();

  setOpenFocus();

  setFocusTrap();
}

const closeModal = () => {
  modal.removeAttribute('open');
  modal.setAttribute('inert', true);
  modal.setAttribute('aria-hidden', true);

  buttonScrim.classList.add('is-hidden');

  releaseBodyPosition();

  setCloseFocus();
}

buttonOpen.addEventListener('click', openModal);
buttonClose.addEventListener('click', closeModal);
buttonScrim.addEventListener('click', closeModal);
document.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
