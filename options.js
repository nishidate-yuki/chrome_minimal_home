function save_options() {
    var json_text = document.getElementById('json_text').value;
    chrome.storage.sync.set(
        {
            json_text: json_text
        },
        function () { }
    );
}

function write_options() {
    chrome.storage.sync.get(
        ["json_text"],
        function (items) {
            document.getElementById('json_text').value = items.json_text;
        }
    )
}

document.addEventListener('DOMContentLoaded', write_options);
document.getElementById('save').addEventListener('click', save_options);