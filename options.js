// chrome.storageに保存
function save_options() {
	var json_text = document.getElementById('json_text').value;
	chrome.storage.sync.set(
		{
			json_text: json_text
		},
		function () { }
	);
}

// // chrome.storageに保存されている環境設定を使用して、セレクトボックスとチェックボックスの状態を復元します。
// function restore_options() {
// 	// デフォルト値 color = 'red' と likesColor = true を使用します。
// 	chrome.storage.sync.get({
// 		favoriteColor: 'red',
// 		likesColor: true
// 	}, function (items) {
// 		document.getElementById('color').value = items.favoriteColor;
// 		document.getElementById('like').checked = items.likesColor;
// 	});
// }
// document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);