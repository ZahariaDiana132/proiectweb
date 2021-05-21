function myfunction(){
    document.getElementById("textt").innerHTML = "Deci esti un suflet curios, huh?";
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 1000);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  const body = document.getElementById('body');
  const main = document.getElementById('main');
  const formTitle = document.getElementById('formTitle');
  const formimaginereprezentativa = document.getElementById('formimaginereprezentativa');
  const formtextpoezie = document.getElementById('formtextpoezie');
  let saveButton = document.getElementById('save');
  const cancelButton = document.getElementById('cancel');
  const poezieLink = document.getElementById('poezie-link');
  const desprenoiLink = document.getElementById('desprenoi-link');

  
  function getpoeziiFromServer() {
      fetch('http://localhost:3000/poezii')
          .then(function (response) {
  
              response.json().then(function (poezii) {
                  renderpoeziiListPage(poezii);
              });
          });
  };
  
  function getpoezieFromServer(id) {
      fetch(`http://localhost:3000/poezii/${id}`)
          .then(function (response) {
  
              response.json().then(function (poezii) {
                  renderpoeziePage(poezii);
              });
          });
  };
  
  function addpoezieToServer() {
  
      const postObject = {
          title: formTitle.value,
          imaginereprezentativa: formimaginereprezentativa.value,
          textpoezie: formtextpoezie.value
      }
 
      fetch('http://localhost:3000/poezii', {
        
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
          body: JSON.stringify(postObject)
      }).then(function () {
        console.log(1111111111);
          getpoeziiFromServer();
          resetForm();
          closeModal();
      });
  }
  
  function deletepoezieFromServer(id) {
  
      fetch(`http://localhost:3000/poezii/${id}`, {
          method: 'DELETE',
        
      }).then(function () {
  
          getpoeziiFromServer();
      });
  }
  
  function updatepoezieToServer(id) {
  
      const putObject = {
          title: formTitle.value,
          imaginereprezentativa: formimaginereprezentativa.value,
          textpoezie: formtextpoezie.value
      }
  
      fetch(`http://localhost:3000/poezii/${id}`, {
          method: 'PUT',
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(putObject)
      }).then(function () {
  
          getpoeziiFromServer();
  
          resetForm();
  
          closeModal();
      });
  }
  
  function clearSaveButtonEvents() {
    let newUpdateButton = saveButton.cloneNode(true);
    saveButton.parentNode.replaceChild(newUpdateButton, saveButton);
    saveButton = document.getElementById('save');
}
  function openAddModal() {
  
      clearSaveButtonEvents();
  
      saveButton.addEventListener('click', function () {
          addpoezieToServer()
      });
  
      body.className = 'show-modal';
  }
  
  function openEditModal(poezie) {
  
    formTitle.value = poezie.title;
    formimaginereprezentativa.value = poezie.imaginereprezentativa;
    formtextpoezie.value = poezie.content;

    clearSaveButtonEvents();

    saveButton.addEventListener('click', function () {
        updatepoezieToServer(poezie.id)
    });

    body.className = 'show-modal';
}
  
  function removeOldpoeziiFromDOM() {
      while (main.firstChild) {
          main.removeChild(main.firstChild);
      }
  }
  
  function createpoezieListDOMNodes(poezie) {
  
      let title = document.createElement('h2');
      title.className = "title";
      title.textContent = poezie.title;
  
      let img = document.createElement('img');
      img.src = poezie.imaginereprezentativa;
      
       let imgContainer = document.createElement('li');
       imgContainer.className = "info__item";
       imgContainer.appendChild(img)
      
      let paragraph = document.createElement('p');
      paragraph.textContent = poezie.textpoezie;
      
      let paragraphContainer = document.createElement('li');
      paragraphContainer.className = "content__container";
      paragraphContainer.appendChild(paragraph);
      
      let partialinfoContainer = document.createElement('li');
      partialinfoContainer.appendChild(imgContainer);
      partialinfoContainer.className = "content__container";    
      
          let infoContainer = document.createElement('ul');
      infoContainer.className = "info__container";
      infoContainer.appendChild(partialinfoContainer);
      infoContainer.appendChild(paragraphContainer)
  
      let deleteButton = document.createElement('button');
      deleteButton.className = "actions__btn";
      
      deleteButton.addEventListener('click', function () {
          deletepoezieFromServer(poezie.id);
      });
      deleteButton.textContent = 'Delete';
  
      let buttonsContainer = document.createElement('div');
      buttonsContainer.className = "actions__container";
      buttonsContainer.appendChild(deleteButton);
  
      let readMoreButton = document.createElement('button');
      readMoreButton.className = "button";
      
      readMoreButton.addEventListener('click', function () {
          getpoezieFromServer(poezie.id);
      });
      readMoreButton.textContent = "Expand";
  
      let readMoreButtonContainer = document.createElement('div');
      readMoreButtonContainer.className = "button__container";
      readMoreButtonContainer.appendChild(readMoreButton);
  
      let articleListNode = document.createElement('article');
      articleListNode.appendChild(title);
      articleListNode.appendChild(buttonsContainer);
      articleListNode.appendChild(infoContainer);
      articleListNode.appendChild(readMoreButtonContainer);
      return articleListNode;
  }
  
  function createpoezieDOMNodes(poezie) {
  
      let title = document.createElement('h2');
      title.className = "title";
      title.textContent = poezie.title;

      let img = document.createElement('img');
      img.src = poezie.imaginereprezentativa;
  
      let imgContainerli = document.createElement('li');
      let imgContainer = document.createElement('div');
      imgContainer.className = "info__item__single";
      imgContainer.appendChild(img)
      imgContainerli.appendChild(imgContainer)
  
      let paragraph = document.createElement('p');
      paragraph.textContent = poezie.textpoezie;
  
      let paragraphContainer = document.createElement('li');
      paragraphContainer.className = "content__container__single";
      paragraphContainer.appendChild(paragraph);
  
      let infoContainer = document.createElement('ul');
      infoContainer.className = "info__container__single";
      infoContainer.appendChild(imgContainer);
      infoContainer.appendChild(paragraphContainer);
  
      let poezieNode = document.createElement('article');
      poezieNode.appendChild(title);
      poezieNode.appendChild(infoContainer);
      return poezieNode;
  }
  
  function createdesprenoiDOMNodes() {
  
      let title = document.createElement('h2');
      title.className = "title title--spaced";
      title.textContent = 'Bunaaaaa!';
      let paragraph = document.createElement('p');
      paragraph.textContent = "Acest site a fost creat pentru poetii timizi care vor sa isi expuna lucrarea 100% anonim, fara cont si pentru oamenii care cauta noi poezii de citit";
      let paragraphContainer = document.createElement('div');
      paragraphContainer.className = "content__container__desprenoi";
      paragraphContainer.appendChild(paragraph);

      let imgdiv = document.createElement("div");
      let img = document.createElement('img');
      img.src = "https://www.thesprucecrafts.com/thmb/yeL5iYBMON-H_zs6q4grOWoqqSc=/2121x1414/filters:fill(auto,1)/GettyImages-155067464-581acc3e5f9b581c0b6bc67a.jpg";
      imgdiv.appendChild(img);
      imgdiv.className ="desprenoi__img__div" ;
  
      
  
      let poezieNode = document.createElement('article');
      poezieNode.appendChild(title);
      poezieNode.appendChild(paragraphContainer);
      poezieNode.appendChild(imgdiv);
      
      
      return poezieNode;
  }
  
  function renderpoeziiListPage(poezii) {
  
      removeOldpoeziiFromDOM();
  
          let addButton = document.createElement('button');
          addButton.className = "button";
     
          addButton.addEventListener('click', openAddModal);
          addButton.textContent = " Adauga Poezie ";
      
          let addButtonContainer = document.createElement('div');
          addButtonContainer.className = "add__container";
          addButtonContainer.appendChild(addButton);
  
          main.appendChild(addButtonContainer);
  
      for (let i = 0; i < poezii.length; i++) {
          let poezieDOMNode = createpoezieListDOMNodes(poezii[i]);
          main.appendChild(poezieDOMNode);
      }
  }
  
  function renderpoeziePage(poezie) {
      removeOldpoeziiFromDOM();
  
      let poezieDOMNode = createpoezieDOMNodes(poezie);
      main.appendChild(poezieDOMNode);
  }
  
  function renderdesprenoiPage() {
      removeOldpoeziiFromDOM();
  
      let poezieDOMNode = createdesprenoiDOMNodes();
      main.appendChild(poezieDOMNode);
  }
  
  function resetForm() {
      formTitle.value = '';
      formimaginereprezentativa.value = '';
      formtextpoezie.value = '';
  }
  
 
  
  function closeModal() {
      body.className = '';
  }
  
  cancelButton.addEventListener('click', closeModal);
  poezieLink.addEventListener('click', getpoeziiFromServer);
  desprenoiLink.addEventListener('click', renderdesprenoiPage);
  
  getpoeziiFromServer();