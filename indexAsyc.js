 // 1. Hacer una funcion para crear, modificar y eliminar
// 2. Dos get para la lista entera y otro para una en particular
// 3. Un put
// 4. Un  get

const baseUrl = "https://jsonplaceholder.typicode.com/todos";
let lista = [];
let todo = {
  title: "",
  userId: null,
  completed: false
};
const handleError = err => {
  // va sin parentesis porque es un solo parametro y se puede omitar las parentesis
  alert(`Hubo un error. ${err}`); //  esta funcion la hago para repetirla en los siguientes cathc
};
const getTodos = () => {
  return axios
    .get(baseUrl) //me devuleve la promesa
    .then(res => {
      lista = res.data;
    })
    .catch(handleError);
};

const getTodos2=  async () =>{
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/todos"); // el await te devuelve el resultado no la promesa
        lista=res.data // guardandando la info que obtuve de arriba 
        armarHtml()
    } catch(err){ // por parametro no se pasa la funcion
        handleError(err)
}
const getTodo = id => {
    axios
      .get(`${baseUrl}/${id}`)
      .then(res => {
        todo = res.data;
      })
      .catch(handleError);
  };
const getTodo2= async (id) =>{
    const info= axios.get ("https://jsonplaceholder.typicode.com/todos/id");
}

const cargar = () => {
  for (let i = 0; i < lista.length; i++) {
    return lista;
  }
};
const createTodo = (title, userId) => {
  let data = {
    title,
    userId,
    completed: false
  };
  return axios
    .post(baseUrl, data) //pongo data porque es la info de la variable de arriba el returno devuelve la promesa
    .then(res => {
      lista.push(res.data); //hago un push al array vacio con el post que cree
    })
    .catch(handleError);
};

const deleteTodo = id => {
  return axios
    .delete(`${baseUrl}/${id}`) // el `${baseUrl} es la variable que tiene el url
    .then(res => {
      const index = lista.findIndex(todo => {
        return todo.id == id; // busco en la lista el id que pase por parametro para que despues lo borre
      });
      lista.splice(index, 1);
      //armarHtml lo puedo poner aca tambien sin el retunr porque despues de que se ejecute lo primero se va a ejecutar esta funcion
    })
    .catch(handleError);
};
const modifyTodo = (id, title, userId, completed) => {
  let data = {
    id,
    title,
    userId,
    completed
  };
  return axios
    .put(`${baseUrl}/${id}`, data)
    .then(res => {
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == id) {
          lista[i] = res.data;
        }
      }
    })
    .catch(handleError);
};

const armarHtml = () => {
  const ul = document.querySelector("#todo-list"); //seleccionamos el padre, el elemento de la lista
  ul.innerHTML = ""; // aca vacio la lista para que cuando recargo la lista no queden dos listas, vacio lista y despues vuelo a recargar
  lista.map(item => {//mientas loopea va ir creando lo ul, li, span, que me loope por cada item de lista
    let li = document.createElement("li"); //creamos li
    let titulo = document.createElement("span"); // creamos span
    let userId = document.createElement("span");
    let completado = document.createElement("span");
    titulo.innerHTML = item.title; // decimos que titulo va a tener la info del item de la lista que se llame title
    li.appendChild(titulo);
    li.className = "todo-item"; // usamos el class name para que se le sumen los estilos que pongo en el css
    titulo.className = "todo-title";
    userId.className = "todo-user";
    completado.className = "todo-completed";
    userId.innerHTML = item.id;
    li.appendChild(userId);
    completado.innerHTML = item.completed ? "completado" : "incompleto"; //?=if es para que si esta completo me escriba complete :=sino inclompleto
    li.appendChild(completado); // el completado es un check pero con texto

    //este va a dentro porque yo no lo tengo en el html, es dinamico porque lo voy creando a medida que los necesito
    let borrar = document.createElement("button");
    borrar.innerText = "Eliminar";
    borrar.addEventListener("click", () => {
      deleteTodo(item.id).then(armarHtml); //aca digo que elimine el item del todo y que despues ejecute la funcion armarHtml
    });

    li.appendChild(titulo);
    li.appendChild(userId);
    li.appendChild(completado);
    li.appendChild(borrar);
    ul.appendChild(li);
    document.querySelector("#todo-list").appendChild(li);
  });
};

//getTodos().then(() => {
  //armarHtml();
//});
getTodos2()
//esto puede ir afuera porque ya esta creado y es uno solo, es contenido estatico porque existe en el HTML
let addButton = document.querySelector("#todo-create");
addButton.addEventListener("click", event => {
  let agregarTitle = document.querySelector("#todo-title-create").value; //aca agregro el valor del input
  let agregarUser = document.querySelector("#todo-user-create").value;
  createTodo(agregarTitle, agregarUser).then(armarHtml); // y aca le paso a la api los valores que obtuve de arriba
}); // el then te segura que se termina de modificar el html, te aseguras que se termino de modificar la lista

let addModificar = document.querySelector("#todo-update");
addModificar.addEventListener("click", event => {
  let agregarId = document.querySelector("#todo-id-update").value;
  let agregarText = document.querySelector("#todo-title-update").value;
  let agregarNumber = document.querySelector("#todo-user-update").value;
  let agregarCheck = document.querySelector("#todo-completed-update").checked;
  modifyTodo(agregarId, agregarText, agregarNumber, agregarCheck).then(
    armarHtml
  ); //then se usa cada vez que tengo una promesa
});

//googlear stuck flow y errores en consola copio y pego en el buscador pero con ""  las palabras claves las puedo poner con +
// fetch y axion hacen lo mismo pero axios es una libreria que facilita escribir el codigo, nos resuelve una parte , un problema en particular
