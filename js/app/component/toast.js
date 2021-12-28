let toast_id = 1;

const getContainer = () => {
  return document.getElementById('toast-container');
}

const createToast = (color, color_text, id) => {
  var newDiv = document.createElement("div");
  newDiv.classList.add('toast');
  newDiv.classList.add('align-items-center');
  newDiv.classList.add(color);
  newDiv.classList.add(color_text);
  newDiv.classList.add('border-0');
  newDiv.id = "toast-"+id;
  newDiv.setAttribute("role", "alert");
  newDiv.setAttribute("aria-live", "assertive");
  newDiv.setAttribute("aria-atomic", "true");
  return newDiv;
}

const createSnack = (message, id) => {
  var newDiv = document.createElement("div");
  newDiv.classList.add("toast-body");
  newDiv.classList.add("d-flex");
  newDiv.appendChild(createMessage(message, id));
  return newDiv;
}

const createMessage = (message, id) => {
  var newDiv = document.createElement("div");
  newDiv.id = "message-"+id;
  newDiv.innerHTML = message;
  return newDiv;
}

const notify = (message, color, time, hide) => {

  var color_text = 'text-white';

  switch(color) {
    case 'primary':
      color = 'bg-quiz-primary';
      color_text = 'text-white';
      break;
    default:
      color = 'bg-quiz-primary';
      color_text = 'text-white';
      break;
  };

  if(time == null){
    time = 2000;
  }

  if(hide == null){
    hide = true;
  }

  var option = {
    animation: true,
    delay: time,
    autohide: hide
  };

  var toast_container = getContainer();
  
  toast = createToast(color, color_text, toast_id);
  toast_container.appendChild(toast);

  toast.appendChild(createSnack(message, toast_id));

  var toast = new bootstrap.Toast(toast, option);
  
  setTimeout(() => {
    toast.show();
  }, 0)
  

  toast_id += 1;
}

export default { notify }