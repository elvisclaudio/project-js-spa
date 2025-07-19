
document.addEventListener("DOMContentLoaded", function () {

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((posts) => {

            posts[posts.length - 1].userId = 111;
            console.log(posts, 'posts');

            for (let post of posts) {
                post.content = "Lorem " + post.id;
            }
            posts = posts.sort((a, b) => {
                return a.userId - b.userId;
            }).reverse();

            let root = document.querySelector("#root > .row");
           

            let counter = 0;
            for (let post of posts) {
                let postElement = document.createElement("div");
                
                postElement.className = `col-6 x-${counter} text-left px-4 border-end my-3`;
                postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                        <p><strong>User ID:</strong> ${post.userId}</p>
                `;

                root.appendChild(postElement);
                counter++;
                let postHtmlElem = `
                    <div class="col-6 x-i${counter} text-left px-4 border-end my-3">
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                        <p><strong>User ID:</strong> ${post.userId}</p>
                    </div>
                `;

                root.innerHTML += postHtmlElem;
                counter++;
            }


        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });



}); //we use DOMContentLoaded to ensure the DOM is fully loaded before running the script
