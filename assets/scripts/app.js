// const movieAdd = document.body.children[1];
const movieAdd = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const startAddMovieButton = document.querySelector('header button');
const cancelBtn = movieAdd.querySelector('.btn--passive');
const AddMovieBtn = cancelBtn.nextElementSibling;
const  userInputs = document.querySelectorAll('input');
const noMovieText= document.querySelector('#entry-text');
const ul = document.querySelector('#movie-list');
const deleteMovieModle = document.getElementById('delete-modal');

// const  userInputs = document.getElementsByTagName('input');
let movies = [];


const closeDeleteMovieModle = () =>
{
    deleteMovieModle.classList.remove('visible');
    // console.log("pratik");
    toggleBackdrop();
}

const deleteMovie = moviesId =>
{
    let movieIndex=0;
    for(const movie of movies)
    {
        if(movie.id === moviesId)
        {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex,1);
    ul.children[movieIndex].remove();
    closeDeleteMovieModle();
    if(movies.length === 0)
    {
        showMovie();
    }
    // ul.removeChild(ul.children[movieIndex]);
}

const deleteMovieHandler = moviesId =>
{
    deleteMovieModle.classList.add('visible');
    toggleBackdrop();  
    const no = deleteMovieModle.querySelector('.btn--passive');
    let yes = deleteMovieModle.querySelector('.btn--danger');
    
    yes.replaceWith(yes.cloneNode(true));
    
    yes = deleteMovieModle.querySelector('.btn--danger');
    no.removeEventListener('click',closeDeleteMovieModle);
    no.addEventListener('click',closeDeleteMovieModle); // overwrite even if we have declare const no in function but it 
    // is not every time add new event in no button it is only add new event every time if there is something new pass with 
    // function (bind) or we have declared anonymous functionb
    yes.addEventListener('click',deleteMovie.bind(null,moviesId));
}
const backdropHandler = () =>
{
    closeMovieModle();
    closeDeleteMovieModle();
};
const toggleBackdrop = () =>
{
    backdrop.classList.toggle('visible');
};
const clearUserInput = () =>
{
    for(const input of userInputs)
    {
        input.value = '';
    }
}

const showMovie = () =>
{
    if(movies.length ===  0)
    {
        noMovieText.style.display = 'block';
    }
    else 
    {
        noMovieText.style.display = 'none';
    }
}

const newMovieAdder = (id,title,image,rating) => 
{
    const li = document.createElement('li');
    li.className = 'movie-element';
    li.innerHTML = `
    <div class="movie-element__image">
        <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p> ${rating} /5 stars</p>
    </div>
    `;
    li.addEventListener('click',deleteMovieHandler.bind(null,id));
    ul.append(li);
}
const AddMovieBtnHandler = () =>
{
    const title = userInputs[0].value;
    const imageurl = userInputs[1].value;
    const rating = userInputs[2].value;

    if(title.trim() === '' || imageurl.trim() === '' || rating.trim() === '' || +rating < 0 || +rating > 5)
    {
        alert("PLEASE ENTER VALID INPUT RATING IS BETWEEN 1 to 5");
        return;
    }
    const newMovie = {
        id : Math.random().toString(),
        title : title,
        imageurl : imageurl,
        rating : rating
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModle();
    clearUserInput();
    toggleBackdrop();
    newMovieAdder(newMovie.id,title,imageurl,rating);
    showMovie();
}

const showMovieModle = () => {
    movieAdd.classList.add('visible');
    toggleBackdrop();
};

const cancelBtnHandler = () =>
{
    closeMovieModle();
    clearUserInput();   
    toggleBackdrop();
}

const closeMovieModle = () => {
    movieAdd.classList.remove('visible');
};
startAddMovieButton.addEventListener('click',showMovieModle);
AddMovieBtn.addEventListener('click',AddMovieBtnHandler);     
cancelBtn.addEventListener('click',cancelBtnHandler);
backdrop.addEventListener('click',backdropHandler);


