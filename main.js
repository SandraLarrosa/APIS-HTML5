const uploadFile = document.querySelector('#videoFile');

const handlerLoaderFile = (ev) => {
  const contentVideo = document.querySelector('#contentVideo');
  const contentActionButtons = document.querySelector('.contentActionButtons');
  const video = ev.target.files[0];
  contentActionButtons.classList.add('hiddenButtons');

  if (!video.type.match('video.*')) {
    contentVideo.innerHTML = `<p class="error">El archivo seleccionado no es un video</p>`;
  } else {
    const fileVideoReader = new FileReader();
    fileVideoReader.onload = (function () {
      return function (ev) {
        contentVideo.innerHTML = `<video class="contentVideo" id='video' src=${ev.target.result} width="620"></video>`;
        contentActionButtons.classList.remove('hiddenButtons');
      };
    })(video);
    fileVideoReader.onprogress = function () {
      contentVideo.innerHTML = `<p><i class="fas fa-spinner fa-pulse"></i>Cargando...</p>`;
    };
    fileVideoReader.readAsDataURL(video);
    actionsButtons();
  }
};

const actionsButtons = () => {
  document.querySelector('#play').addEventListener('click', () => {
    document.querySelector('#video').play();
  });

  document.querySelector('#pause').addEventListener('click', () => {
    document.querySelector('#video').pause();
  });

  document.querySelector('#upVol').addEventListener('click', () => {
    document.querySelector('#video').volume += 0.2;
  });
  document.querySelector('#lowVol').addEventListener('click', () => {
    document.querySelector('#video').volume -= 0.2;
  });
};

uploadFile.addEventListener('change', handlerLoaderFile);
