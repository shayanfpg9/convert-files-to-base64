const againBtn = document.querySelector("button#again"),
  form = document.querySelector("form"),
  input = document.querySelector("#selectFile"),
  copyBtn = document.querySelector("#copy");

let preview;

input.addEventListener("input", () => {
  document
    .querySelector("#selectFile ~ label")
    .setAttribute("files", input.files.length);
});

function convert() {
  const file = input.files[0],
    reader = new FileReader();

  let type = file.type;

  reader.addEventListener("load", () => {
    document.getElementById("preview")
      ? document.body.removeChild(document.getElementById("preview"))
      : "";

    againBtn.style.display = "block";
    form.style.display = "none";
    copyBtn.style.display = "block";

    if (type.search("text") >= 0) {
      preview = document.createElement("p");
      preview.innerText = reader.result;
    } else if (type.search("video") >= 0) {
      preview = document.createElement("video");
      preview.src = reader.result;
      preview.setAttribute("controls", "");
      preview.setAttribute("autoplay", "");
    } else if (type.search("audio") >= 0) {
      preview = document.createElement("audio");
      preview.src = reader.result;
      preview.setAttribute("controls", "");
      preview.setAttribute("autoplay", "");
    } else {
      preview = document.createElement("object");
      preview.data = reader.result;
    }

    preview.id = "preview";

    document.body.insertBefore(preview, againBtn);
  });

  if (type.search("text") >= 0) {
    reader.readAsText(file);

    const getTextUrl = new FileReader();
    getTextUrl.addEventListener("load", () => {
      preview.setAttribute("data-url", getTextUrl.result);
    });
    getTextUrl.readAsDataURL(file);
  } else if (file) {
    reader.readAsDataURL(file);
  }
}

copyBtn.addEventListener("click", () => {
  const text = preview.data || preview.getAttribute("data-url") || preview.src;

  navigator.clipboard.writeText(text).then(() => {
    alert("The file address has been copied to your clipboard");
  });
});

againBtn.addEventListener("click", () => {
  document.body.removeChild(document.getElementById("preview"));

  againBtn.style.display = "none";
  copyBtn.style.display = "none";
  form.style.display = "flex";

  document.querySelector("#selectFile ~ label").setAttribute("files", 0);
});
