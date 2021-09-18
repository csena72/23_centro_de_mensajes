const emailTxt = document.querySelector("#email");
const nameTxt = document.querySelector("#nombre");
const lastNameTxt = document.querySelector("#apellido");
const ageNum = document.querySelector("#edad");
const aliasTxt = document.querySelector("#alias");
const avatarUrl = document.querySelector("#avatar");
const compressionLbl = document.querySelector("#compression");

const messageTxt = document.querySelector("#mensaje");
const sendBtn = document.querySelector("#enviar");

const messages = document.querySelector("#mensajes");
const { denormalizeMessages } = require("../utils/normalizer");

socket.on("mensajes", (data) => {
  const denormalized = denormalizeMessages(data);
  const normalizedLength = JSON.stringify(data).length;
  const denormalizedLength = JSON.stringify(denormalized).length;
  const compression = Math.round(
    (1 - normalizedLength / denormalizedLength) * 100
  );

  if (compression > 0)
    compressionLbl.textContent = `(Compresión: ${compression}%)`;

  const { content } = denormalized;
  console.log("test");
  messages.innerHTML = "";
  content.forEach(
    ({ author: { id, avatar }, date, message }) =>
      (messages.innerHTML += `<p><strong style="color:blue"> ${id} </strong><span style="color:brown"> ${date} </span><span style="color:green"> ${message} </span><img src="${avatar}" width="15"/></p> `)
  );
});

sendBtn.addEventListener("click", () => {
  if (emailTxt.value !== "" && messageTxt !== "") {
    const data = {
      author: {
        id: emailTxt.value,
        nombre: nameTxt.value,
        apellido: lastNameTxt.value,
        edad: ageNum.value,
        alias: aliasTxt.value,
        avatar: avatarUrl.value,
      },
      message: messageTxt.value,
    };
    
    socket.emit("nuevo-mensaje", data);
  }
});
