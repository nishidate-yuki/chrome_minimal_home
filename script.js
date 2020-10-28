

function add_links() {
    chrome.storage.sync.get(
        ["json_text"],
        function (items) {
            if (items.json_text == undefined) {
                items.json_text = "{\r\n    \"num_colmuns\" : 4,\r\n\r\n    \"title\"       : \"New tab\",\r\n\r\n    \"width\"       : 40,\r\n\r\n    \"img_size\"    : 50,\r\n\r\n    \"back_color\"  : \"#ffffff\",\r\n\r\n    \"links\": [\r\n        {\r\n            \"page_url\" : \"https:\/\/www.youtube.com\/\",\r\n            \"img_url\"  : \"https:\/\/simpleicons.org\/icons\/youtube.svg\"\r\n        },\r\n        {\r\n            \"page_url\" : \"https:\/\/twitter.com\/\",\r\n            \"img_url\"  : \"https:\/\/simpleicons.org\/icons\/twitter.svg\"\r\n        },\r\n        {\r\n            \"page_url\" : \"https:\/\/music.apple.com\/\",\r\n            \"img_url\"  : \"https:\/\/simpleicons.org\/icons\/applemusic.svg\"\r\n        },\r\n        {\r\n            \"page_url\" : \"https:\/\/www.behance.net\/\",\r\n            \"img_url\"  : \"https:\/\/simpleicons.org\/icons\/behance.svg\"\r\n        }\r\n    ],\r\n    \r\n    \"img_css\"     : \"\"\r\n}\r\n";
                chrome.storage.sync.set(
                    {
                        json_text: items.json_text
                    },
                    function () { }
                );
            }
            const wrapper = document.getElementById("wrapper");

            // get json
            let jsonObject
            try {
                jsonObject = JSON.parse(items.json_text);
            } catch (e) {
                // alert("Minimal Home Options Error: \n" + e);
                const newMessage = document.createElement("h1");
                newMessage.innerHTML += "Minimal Home Options Error!<br>" + e;
                wrapper.appendChild(newMessage);
                return;
            }

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
                newImg.style.margin = "auto " + ((100 - jsonObject.img_size) / 2) + "%";
                newImg.style += jsonObject.img_css;

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
