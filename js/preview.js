import { removeChildren, showAlert } from './utils/utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

function createPreview (src, options) {
  const {WIDTH, HEIGHT, ALT} = options;
  const newPreview = document.createElement('img');
  newPreview.src = src;
  newPreview.width = WIDTH;
  newPreview.height = HEIGHT;
  newPreview.alt = ALT;
  newPreview.style.objectFit = 'cover';

  return newPreview;
}

function showPreview (fileSelector, imageContainer, options) {
  const file = fileSelector.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (!matches) {
    showAlert('Поддерживание типы изображений: jpeg, png');
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    removeChildren(imageContainer);
    imageContainer.appendChild(createPreview(reader.result, options));
  });
  reader.readAsDataURL(file);
}

export { showPreview };
