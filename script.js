

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

			// add links
			grid_template_areas = "";
			grid_template_areas_row = "";
			for (let index = 0; index < num_links; index++) {
				// create div
				const newDiv = document.createElement("div");
				let i = Math.floor(index / num_colmuns);
				let j = index % num_colmuns;
				let item_str = "item" + i + j;
				newDiv.classList.add("link");
				newDiv.classList.add(item_str);

				grid_template_areas_row += item_str + " ";
				if (j == num_colmuns - 1) {
					grid_template_areas += "\"" + grid_template_areas_row + "\" ";
					grid_template_areas_row = ""; // reset row
				}

				// create a tag
				const newA = document.createElement("a");
				newA.href = links[index]["page_url"];

				// create img
				const newImg = document.createElement("img");
				newImg.src = links[index]["img_url"];

				newA.appendChild(newImg);
				newDiv.appendChild(newA);
				wrapper.appendChild(newDiv);

			}

			// 列数で割り切れず、最後の行の情報が残っている場合は追加する
			if (grid_template_areas_row != "") {
				grid_template_areas += "\"" + grid_template_areas_row + "\" ";
			}

			// add style
			wrapper.style.gridTemplateAreas = grid_template_areas;


			// wrapper.innerHTML += "num_columns:" + num_colmuns + "<br>";
			// wrapper.innerHTML += "num_links:" + num_links + "<br>";
			// wrapper.innerHTML += "num_rows:" + num_rows + "<br>";
		}
	);
}

add_links();
