var cl = console.log;

let baseUrl = `https://jsonplaceholder.typicode.com/posts`;
const postContainer = document.getElementById("postContainer");
const postForm = document.getElementById("postForm");
const titleControl= document.getElementById("title");
const contentControl= document.getElementById("content");
//GET  >> to get data from DB
//POST  >> send data in DB
//DELETE >> delete data from DB
//PACTH/PUT >> update data in DB

//myFlipcart.com/api  >>base API Url
//myFlipcart.com/api/products
//myFlipcart.com/api/products/123

const templating = (arr) => {
    let result = '';
    arr.forEach(post => {
        result += `
            <div class="card mb-4">
                <div class="card-header">
                    <h2>${post.title}</h2>
                </div>
                <div class="card-body">
                    <p>${post.body}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>
        `
    });
    postContainer.innerHTML = result;
}

const makeApiCall = (methodName,apiUrl,body)=>{
    let xhr = new XMLHttpRequest();
    xhr.open(methodName,apiUrl);
    xhr.onload = function () {
        if(xhr.status===200){
            cl(xhr.readyState);
            let data= JSON.parse(xhr.response);
            cl(data);
            templating(data);
            }else if(xhr.status===201){
                cl(xhr.response);
            }
        }
        xhr.send(JSON.stringify(body));
    }

    const onPostSubmit = (eve) => {
        eve.preventDefault();
        let obj = {
            title : titleControl.value,
            body : contentControl.value,
            userId : Math.ceil(Math.random()* 10)
        }
        cl(obj);
        postForm.reset();
        makeApiCall("POST",baseUrl,obj);
        
    }

    makeApiCall("GET",baseUrl,null);
    postForm.addEventListener("submit",onPostSubmit);

    //xhr.status  >> 200 or 201  >> API success
    //200 >> GET method
    //201 >> POST method

    //404  >> URL not found
    //403 >> forbidden 
    //503 >> service not available

    //before 500 >> client side error
    //after 500  >> backend side error

    //xhr.readyState
    //0 >> UNset >>open method not called yet
    //1 >> opened >> open method is called
    //2 >> send method is called
    //3 >> server is working on your request
    //4 >>operation is completed






