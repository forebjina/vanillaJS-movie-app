document.addEventListener('DOMContentLoaded', function(){
    const MOVIE_OMDAPI_URL = 'https://www.omdbapi.com/?apikey=abf73aa0&s='; //인증키
   
    let movieItemList = document.querySelector('#movieItemList'); 
    let searchWord ='';//API검색키워드
    let apiUrl = '';
    searchWord = 'man';
    apiUrl = MOVIE_OMDAPI_URL + searchWord
    //페이지 로딩시 'man'이라는 키워드로 영화 리스트 요청
    reqAjax(apiUrl, movieItemList);

    const searchVal = document.querySelector('#searchVal'); 
    const searchBtn = document.querySelector('#searchBtn');
    //검색버튼 hover시
    searchBtn.addEventListener('mouseover', function(){
        searchBtn.getElementsByTagName('img')[0].classList.add('hide');
        searchBtn.getElementsByTagName('img')[1].classList.remove('hide');
    });
    searchBtn.addEventListener('mouseout', function(){
        searchBtn.getElementsByTagName('img')[0].classList.remove('hide');
        searchBtn.getElementsByTagName('img')[1].classList.add('hide');
    });
    // searchBtn.addEventListener('mouseover', function(){
    //     searchBtn.children[0].style.opacity=0;
    //     searchBtn.children[1].style.opacity=1;
    // });
    // searchBtn.addEventListener('mouseout',function(){
    //     searchBtn.children[0].style.opacity=1;
    //     searchBtn.children[1].style.opacity=0;
    // });

     //검색버튼 클릭시
    searchBtn.addEventListener('click',function(){
        while (movieItemList.firstChild) {
            movieItemList.removeChild(movieItemList.firstChild);
         };
        searchWord = searchVal.value;
        apiUrl = MOVIE_OMDAPI_URL + searchWord;
        reqAjax(apiUrl, movieItemList);
    });
});

function reqAjax(url, movieItemList){
    let xhr = '';
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else{
        //IE5, IE6일때
        xhr = new ActiveXObject('Microsofr.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 ){
            if( xhr.status == 200){
                addMovieItemlist(xhr,movieItemList);
            } else{
                alert('통신실패');
            }
        }
    }
    xhr.open('GET', url, true); //open(method,url,async)
    xhr.send();  
}

function addMovieItemlist(xhr,movieItemList){
    const strRes = xhr.responseText;
    const jsonRes = JSON.parse(strRes);

    //Search객체배열사용
    let movieItemCnt = '';//받아온 Search객체배열 개수
    let movieItemLi = ''; //동적으로 생성될 li태그
    let movieImg =''; //영화이미지
    let movieTit ='';//영화제목
    
    //if(typeof(jsonRes.Search) != 'undefined'){
    if(jsonRes.Search){    
        movieItemCnt = jsonRes.Search.length;
    } else{
        movieItemCnt = 0;
    }
    for(let i=0; i<movieItemCnt; i++){
        //li태그 
        let li = document.createElement('li');
        movieItemLi = movieItemList.appendChild(li);
        movieItemLi.classList.add('movieItem');
        //li>h2 영화제목
        let h4 = document.createElement('h4');   
        movieTit =  movieItemLi.appendChild(h4);
        movieTit.classList.add('movieTit');
        movieTit.innerHTML = jsonRes.Search[i].Title;
        //li>img 영화포스터이미지
        let img = document.createElement('img');
        movieImg = movieItemLi.appendChild(img);
        movieImg.classList.add('movieImg');
        movieImg.setAttribute('src',jsonRes.Search[i].Poster);
        //li>p //영화개봉년도
        let p = document.createElement('p');   
        movieTit =  movieItemLi.appendChild(p);
        movieTit.classList.add('movieYear');
        movieTit.innerHTML = jsonRes.Search[i].Year;
    }
}