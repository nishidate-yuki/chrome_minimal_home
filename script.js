

function add_links() {
    chrome.storage.sync.get(
        ["json_text"],
        function (items) {
            // get json
            let jsonObject = JSON.parse(items.json_text);

            const wrapper = document.getElementById("wrapper");
            links = jsonObject.links;
            num_colmuns = jsonObject.num_colmuns;
            num_links = links.length;
            num_rows = Math.ceil(num_links / num_colmuns);
            document.title = jsonObject.title;

            // add links
            for (let index = 0; index < num_links; index++) {
                // create div
                const newDiv = document.createElement("div");
                newDiv.classList.add("link");
                newDiv.style.width = 100 / num_colmuns + "%";

                // create a tag
                const newA = document.createElement("a");
                newA.href = links[index]["page_url"];

                // create img
                const newImg = document.createElement("img");
                newImg.src = links[index]["img_url"];
                newImg.style.width = jsonObject.img_size + "%";
                newImg.style.margin = "auto " + jsonObject.img_size / 2 + "%";

                newA.appendChild(newImg);
                newDiv.appendChild(newA);
                wrapper.appendChild(newDiv);

            }

            // add style
            let aspect = num_rows / num_colmuns;
            let width = jsonObject.width;
            let height = width * aspect;
            wrapper.style.width = width + "vw";
            wrapper.style.height = height + "vw";
            wrapper.style.marginTop = "calc( 50vh - " + height / 2 + "vw" + ")";
            document.body.style.backgroundColor = jsonObject.back_color;
        }
    );
}

add_links();
