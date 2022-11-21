let input_color = document.getElementById("fcolor");
let listColors = document.getElementById("listColors");
let finput = document.getElementById("finput");

const COLORS = ['aqua', 'aquamarina', 'azure', 'beige', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'gold', 'gray', 'green', 'indigo', 'ivory', 'lavender', 'magenta', 'maroon', 'mistyRose', 'navy', 'olive', 'orange', 'pink', 'plum', 'purple', 'red', 'salmon', 'silver', 'sky', 'tan', 'teal', 'turquoise', 'white', 'yellow']

const handlerSubmit = (e) => {
  e.preventDefault();
  if (listColors) {
  
    if (finput && finput.value) {
      let c = `No existe el color: ${finput.value}`;
      if (COLORS.includes(finput.value.toLowerCase())) {
        c = finput.value.toLowerCase();
      }
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.style.cssText = `color: ${c}; background: black`;
      let color = document.createTextNode(c);

      span.appendChild(color);
      li.appendChild(span);
      listColors.appendChild(li);
    }

  }

}

if (input_color) {
  input_color.addEventListener("submit", handlerSubmit);
}








