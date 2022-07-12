let post = [];
let post1 = [];

function getElment(id) {
    return document.getElementById(id)
}



const mainDiv = getElment("info");
const nav = getElment("bar");

let i;
function load() {
    navigation();

    thumbnail();

}
function aboutLoad() {
    navigation()

}

function contactLoad() {
    navigation();
}


// gets a json wrodpress 
async function getJsonWP() {

    const response = await fetch("http://localhost:8888/wordpress/wp-json/wp/v2/posts?_embed");
    const jsonData = await response.json();

    return jsonData;

}
// gets the json data 
async function getJson() {

    const response = await fetch("../json/data.json");
    const jsonData = await response.json();

    return jsonData;

}

console.log("this is me again", post);
function postContent() {

    document.getElementById("info").onclick = button;

}
// function buton() {

//     console.log(post.length);
//     let section = getElment("content");
//     for (i = 0; i <= post.length; i++) {

//         {
//             console.log(post[i].title);
//             section = `<h1> ${post[i].title}</h1>
//             <img src=${post[i].image}/>`;

//         }


//     }
//     //  = "window.location.href='page2.html'"
//     // window.location.href = this.id + 'content.html';
//     // e = window.location.href;
//     //alert(e.target.className);

// }
// function contentLoad() {

//     button();


// }


function contentLoad() {
    navigation();
    clikedBtn();
}



function clikedBtn() {
    //document.addEventListener('click', function (event) {
    fetch("http://localhost:8888/wordpress/wp-json/wp/v2/posts?_embed").then(res => res.json())
        .then(data => {
            console.log("this is my data", data)


            data.forEach(function (items) {
                console.log("item", items);

                post.push({

                    id: items.id,
                    title: items.title.rendered,
                    image: items._embedded["wp:featuredmedia"][0]["source_url"],
                    shortSummary: items.excerpt.rendered,
                    content: items.content.rendered,
                    date: items.date

                })
                for (let i = 0; i < post.length; i++) {
                    let div = getElment("div_cont");


                    console.log(post[i].title);

                    div.innerHTML += `<h1> ${post[i].title}</h1><img src=${post[i].image} alt="image"/><<p class="content_p1"> ${post[i].date}</p><p class="content_p1"> ${post[i].content}</p>`;

                }
            })

        });
    //});

}
// function clikedBtn() {

//     document.body.addEventListener("click", function (event) {

//         getJsonWP().then(data1 => {

//             data1.forEach(function (items) {
//                 console.log("item", items);

//                 post.push({

//                     id: items.id,
//                     title: items.title.rendered,
//                     image: items._embedded["wp:featuredmedia"][0]["source_url"],
//                     shortSummary: items.excerpt.rendered,
//                     content: items.content.rendered.rendered,
//                     date: items.date

//                 })
//                 console.log("ccc", post);


//             })
//             console.log(post.length);
//             return post;

//         })
//             .then((postData) => {


//                 console.log(post.length);
//                 let div = getElment("div_cont");


//                 for (let i = 0; i < postData.length; i++) {

//                     if (event.target.id == postData[i].id) {

//                         console.log((postData[i].title));

//                         div.innerHTML += `<h1> ${post[i].title}</h1><img src=${postData[i].image} alt="image"/>`;
//                     }


//                 }

//             });


//     });
// }

function button() {
    window.location.href = "http://127.0.0.1:5500/blog/content.html";
}
// let btnID = window.event.target.id;
// console.log(btnID);



// console.log();














function creatTag(tag, name) {
    const elment = document.createElement(tag);
    elment.className = name;

    return elment;

}
function appendParent(parent, children) {
    children.forEach(function (child) {
        parent.append(child);

    });
}

function spanTag() {
    let spanList = [
        creatTag("span", "bar"),
        creatTag("span", "bar"),
        creatTag("span", "bar")
    ];
    return spanList;
}

console.log(post1);

function thumbnail() {
    getJson().then(data1 => {

        let count = 1;

        for (i = 0; i < data1.length; i++) {
            let h1 = creatTag("h1", "h_cont")
            let blockDiv = creatTag("div", "block");

            let img = creatTag("img", "img_Blog");
            let div;

            if ((data1[i].id) !== 1) {


                img.src = data1[i].image;
                const name = data1[i].name;
                div = creatTag("div", data1[i].name);


                div.innerHTML = `<h1>${data1[i].title}</h1><time>${data1[i].date}</time><p>${data1[i].shortSummary}</p><button onclick="button()" class="btn" id=${count}>Read More</button >`;
                blockDiv.append(img);
                blockDiv.append(div);
                mainDiv.append(blockDiv);
                count++;

            }

            else {
                count = 1;
            }
        }
    });
}



function navigation() {

    let blockDiv = creatTag("div", "nav_menu");
    let divLogo = creatTag("div", "nav_log");
    divLogo.innerHTML = `<a href="#">LazyLicious</a>`;
    let divList = creatTag("div", "nav_list");
    let navItems = creatTag("ul", "nav_items");


    getJson().then(data1 => {



        for (i = 0; i < data1[0].list.length; i++) {

            navItems.innerHTML += `<li><a href=${data1[0].navPath[i]}>${data1[0].list[i]}</a></li>`;

            divList.append(navItems);
        }
    });
    let aToggle = creatTag("a", "toggle");
    nav.append(blockDiv);
    blockDiv.append(divLogo);
    appendParent(aToggle, spanTag());
    blockDiv.append(aToggle);
    blockDiv.append(divList);


}


