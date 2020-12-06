document.addEventListener('DOMContentLoaded', function(){
    let movieItemList = document.querySelector('#movieItemList');
    const MOVIE_OMDAPI_URL = 'https://www.omdbapi.com/?apikey=abf73aa0&s='; //인증키
    //페이지 로딩시 'man'이라는 키워드로 영화 리스트 요청
    let xhr;
    let searchWord ='';
    let reqURL ='';
    searchWord ='man'
    //reqURL = MOVIE_OMDAPI_URL+searchWord;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else{
        //IE5, IE6일때
        xhr = new ActiveXObject('Microsofr.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            addMovieItemlist(xhr,movieItemList);
        } else{
            alert('통신실패');
        }
    }
    xhr.open('GET',MOVIE_OMDAPI_URL+searchWord,true); //open(method,url,async)
    xhr.send();

    //검색버튼 클릭시
    let searchInp = document.querySelector('#searchInp');
    let searchBtn = document.querySelector('#searchBtn');
    searchBtn.addEventListener('click',function(){
        while (movieItemList.firstChild)  {
                    movieItemList.removeChild(movieItemList.firstChild);
                };
        searchWord = searchInp.value;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else{
            //IE5, IE6일때
            xhr = new ActiveXObject('Microsofr.XMLHTTP');
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                addMovieItemlist(xhr,movieItemList);
            } else{
                alert('통신실패');
            }
        }
        xhr.open('GET',MOVIE_OMDAPI_URL+searchWord,true); //open(method,url,async)
        xhr.send();    
    
    });
});

function addMovieItemlist(xhr,movieItemList){
    const strRes = xhr.responseText;
    const jsonRes = JSON.parse(strRes);
    console.log(typeof(strRes));
    console.log(typeof(jsonRes));
    console.log(xhr.responseText);
    //Search객체배열사용
    //class 한개 받아오는 거 ..반복문뿐이 없나봄..?
    let movieItemCnt = jsonRes.Search.length; //받아온 Search객체배열 개수
    let movieItemLi = ''; //동적으로 생성될 li태그
    let movieImg =''; //영화이미지
    let movieTit ='';//영화제목
    for(let i=0; i<movieItemCnt; i++){
        //li태그 
        let li = document.createElement('li');
        movieItemLi = movieItemList.appendChild(li);
        movieItemLi.classList.add('movieItem');
        //li>img
        let img = document.createElement('img');
        movieImg = movieItemLi.appendChild(img);
        movieImg.classList.add('movieImg');
        movieImg.setAttribute('src',jsonRes.Search[i].Poster);
        //li>p
        let p = document.createElement('p');   
        movieTit =  movieItemLi.appendChild(p);
        movieTit.classList.add('movieTit');
        movieTit.innerHTML = jsonRes.Search[i].Title;
    }
}