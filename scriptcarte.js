const body = document.getElementById('body');
const main = document.getElementById('main');

const formtitlu = document.getElementById('formtitlu');
const formtema = document.getElementById('formtema');
const formautor = document.getElementById('formautor');
const formimaginereprezentativa = document.getElementById('formimaginereprezentativa');
const formpoezie = document.getElementById('formpoezie');

let saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

const desprenoilink = document.getElementById('desprenoi-link');
const poezielink = document.getElementById('poezie-link');


// Fetch the articles list
function getpoeziiFromServer() 
{
    fetch('http://localhost:3000/poezii')
        .then(function (response) {
            // Trasform server response to plain object
            response.json().then(function (poezii) {
                renderpoeziiListPage(poezii);
            });
        });
};

function getpoezieFromServer(id) {
    fetch(`http://localhost:3000/poezii/${id}`)
        .then(function (response) {
            // Trasform server response to plain object
            response.json().then(function (poezii) {
                renderpoeziiPage(poezii);
            });
        });
};


// Add article
function addpoezieToServer() {
    // creat post object
    const postObject = {
        titlu: formtitlu.value,
        tema: formtema.value,
        autor: formautor.value,
        imaginereprezentativa: formimaginereprezentativa.value,
        poezie: formpoezie.value
    }
    // Call post request to add a new article
    fetch('http://localhost:3000/poezii', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () 
    {
        getpoezieFromServer();
        resetForm();
        closeModal();
    });

}

function deletepoezieFromServer(id) 
{ fetch(`http://localhost:3000/poezii/${id}`, {
        method: 'DELETE',
    }).then(function () {
     getpoeziiFromServer();
    });
}

function updatepoezieToServer(id) {

    const putObject = {
        titlu: formtitlu.value,
        tema: formtema.value,
        autor: formautor.value,
        imaginereprezentativa: formimaginereprezentativa.value,
        poezia: formpoezie.value
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

function openAddModal() {

    clearSaveButtonEvents();

    saveButton.addEventListener('click', function () {
        addpoezieToServer()
    });

    body.className = 'show-modal';
}

function openEditModal(poezie) {

   formtitlu.value = poezie.titlu
   formtema.value = poezie.tema
   formautor.value = poezie.autor
   formimaginereprezentativa.value= poezie.imagine
   formpoezie.value= poezie.poezia

    clearSaveButtonEvents();

    saveButton.addEventListener('click', function () {
        updatepoezieToServer(poezie.id)
    });

    body.className = 'show-modal';
}

function removepoeziivechiFromDOM() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}


function createalbumpoeziiDOMNodes(poezie) {

    let title = document.createElement('h2');
    title.className = "title";
    title.textContent = poezie.titlu;

    let tema = document.createElement('span');
    tema.className = "info__item";
    tema.textContent = poezie.tema;

    let autor = document.createElement('span');
    autor.className = "info__item";
    autor.textContent = poezie.autor;

    let img = document.createElement('img');
    img.src = poezie.imaginereprezentativa;
    
    let imgContainer = document.createElement('li');
    imgContainer.className = "info__item";
    imgContainer.appendChild(img)
    
    let paragraph = document.createElement('p');
    paragraph.textContent = poezie.poezia;
    
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
        getpoezieFromServer(dish.id);
    });
    readMoreButton.textContent = "mai mult";

    let readMoreButtonContainer = document.createElement('div');
    readMoreButtonContainer.className = "button__container";
    readMoreButtonContainer.appendChild(readMoreButton);

    let poezieListNode = document.createElement('poezie');
    poezieListNode.appendChild(title);
    poezieListNode.appendChild(buttonsContainer);
    poezieListNode.appendChild(infoContainer);
    poezieListNode.appendChild(readMoreButtonContainer);
    return poezieListNode;
}


function createpoezieDOMNodes(poezie) {

    let title = document.createElement('h2');
    title.className = "title";
    title.textContent = poezie.titlu;

    let tema = document.createElement('span');
    tema.className = "info__item__single";
    tema.textContent = poezie.tema;

    let autor = document.createElement('span');
    autor.className = "info__item__single";
    autor.textContent = poezie.autor;

    let img = document.createElement('img');
    img.src = poezie.imaginereprezentativa;

    let imgContainer = document.createElement('li');
    let imgContainer = document.createElement('div');
    imgContainer.className = "info__item__single";
    imgContainer.appendChild(img)


    let imgContainerli = document.createElement('li');
    let imgContainer = document.createElement('div');
    imgContainer.className = 
    imgContainer.appendChild(img)
    imgContainerli.appendChild(imgContainer)


    let paragraph = document.createElement('p');
    paragraph.textContent = poezie.poezia;

    let paragraphContainer = document.createElement('li');
    paragraphContainer.className = "content__container__single";
    paragraphContainer.appendChild(paragraph);

    let infoContainer = document.createElement('ul');
    infoContainer.className = "info__container__single";
    infoContainer.appendChild(imgContainer);
    infoContainer.appendChild(paragraphContainer);

    let poezieNode = document.createElement('poezie');
    poezieNode.appendChild(title);
    dishNode.appendChild(infoContainer);
    return poezieNode;
}


function createAboutDOMNodes() {

    let title = document.createElement('h2');
    title.className = "title title--spaced";
    title.textContent = 'Bunaaa poeti timizi si cititori dragi!';

    let imgdiv = document.createElement("div");
    let img = document.createElement('img');
    img.src = "https://thumbs.dreamstime.com/b/vintage-message-book-feather-pen-13029041.jpg";
    imgdiv.appendChild(img);
    imgdiv.className ="about__img__div" ;

    let paragraph = document.createElement('p');
    paragraph.textContent = "Aici vezi gasi o varietate de poezii de la oamenii din intreaga tara si posibilitatea de a face parte din ei!Am creat acest site deoarece mie mi-a fost mereu foarte greu sa public poeziile mele fara un mediu si m-am gandit ca sigur se afla si altii in sitatuia mea. Sper sa iti placa.";

    let paragraphContainer = document.createElement('div');
    paragraphContainer.className = "content__container__about";
    paragraphContainer.appendChild(paragraph);

    let poezieNode = document.createElement('poezie');
    poezieNode.appendChild(title);
    poezieNode.appendChild(imgdiv);
    poezieNode.appendChild(paragraphContainer);
    
    return poezieNode;
}

function renderpoeziiListPage(poezii) {

    removepoeziivechiFromDOM();

        let addButton = document.createElement('button');
        addButton.className = "button";
   
        addButton.addEventListener('click', openAddModal);
        addButton.textContent = " Adauga poezia ta";
    
        let addButtonContainer = document.createElement('div');
        addButtonContainer.className = "add__container";
        addButtonContainer.appendChild(addButton);

        main.appendChild(addButtonContainer);

    for (let i = 0; i < poezii.length; i++) {
        let poezieDOMNode = createpoeziistDOMNodes(poezii[i]);
        main.appendChild(poezieDOMNode);
    }
}

function renderpoeziePage(poezie) {
    removpoeziivechiFromDOM();

    let poezieDOMNode = createDishDOMNodes(poezie);
    main.appendChild(poezieDOMNode);
}

function renderAboutPage() {
    removpoeziivechiFromDOM();

    let poezieDOMNode = createAboutDOMNodes();
    main.appendChild(poezieDOMNode);
}

function resetForm() 
{
    formtitlu.value = '';
    formtema.value = '';
    formautor.value = '';
    formimaginereprezentativa.value=''; 
    formpoezie.value='';
}

function clearSaveButtonEvents() {
    let newUpdateButton = saveButton.cloneNode(true);
    saveButton.parentNode.replaceChild(newUpdateButton, saveButton);
    saveButton = document.getElementById('save');
}

function closeModal() {
    body.className = '';
}

cancelButton.addEventListener('click', closeModal);
dishLink.addEventListener('click', getpoeziiFromServer);
aboutLink.addEventListener('click', renderAboutPage);

getpoeziiFromServer();


