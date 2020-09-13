var todos = [];

// локальное хранилище
let setToLocal = () => {
	localStorage.setItem('todo', null);
	localStorage.setItem('todo', JSON.stringify(todos));

}
window.onload = () =>{
	for (key of filters){
		if(key.classList.contains('active-filter')) window.key.onclick();
	}
	if(localStorage.getItem('todo') != null){
		todos = JSON.parse(localStorage.getItem('todo'));
		renderLists(todos);
		todos.forEach((i,index) => {
			if(i.active != '') renderMyTasks(index);
		})
	}
}

//вывод списков
let domLists = document.querySelector('.lists');

let renderLists = (arr) => {
	domLists.innerHTML = '';
	arr.forEach((i,index) => domLists.innerHTML += `<div class="list ${i.active}">
														<span  onclick="renderMyTasks(${index})">${i.listName}</span>
														<button onclick="deleteList(${index})" type="button">&#10006;</button>
													</div>`);
	removeActiveFilter();
	setToLocal();
};

//вывод задач
let domTasks = document.querySelector('.tasks');

let renderMyTasks = (index) =>{
	domTasks.innerHTML = '';
	todos[index].tasks.forEach((i, ind) => {
		domTasks.innerHTML += `<li class="task ${i.checked}">
									<input ${i.checked} onchange="checkbox(event,${index},${ind})" type="checkbox">
									<b>${i.taskName}</b>
									<button onclick="deleteTask(event,${index},${ind})" type="button">&#10006;</button>
								</li>`;
	});
	activeList(index);
	removeActiveFilter();
}
//cоздание списка
class List{
	constructor(listName){
		this.listName = listName;
		this.tasks = [];
		this.active = 'active';
	}
};

let addNewList = (nameList) => {
	todos.push(new List(nameList));
	activeList(todos.length - 1);
	renderLists(todos);
	domTasks.innerHTML = '';
	removeActiveFilter();
};

//удаление списка
let deleteList = index => {
	todos.splice(index,1);
	domTasks.innerHTML = '';
	renderLists(todos);
	removeActiveFilter();
};

//создание задачи
class Task{
	constructor(taskName){
		this.taskName = taskName;
		this.checked = '';
	}
};

let addNewTask = (newTask) => {
	let index = todos.findIndex(i => i.active != '')
	todos[index].tasks.push(new Task(newTask));
	renderMyTasks(index);
	removeActiveFilter();

};
//удаление задачи
let deleteTask = (e,item, index) => {
	if(e.target.tagName === 'BUTTON'){
		todos[item].tasks.splice(index,1);
		e.target.parentNode.remove();
	}

};
//выполненные задачи (checbox)
let checkbox = (e,i,index) =>{
	let next = e.target.parentNode.classList.toggle('checked');
	let item = todos[i].tasks[index];
	item.checked != '' ? item.checked = '' : item.checked = 'checked';
};
//активный список
let domActive = document.querySelectorAll('div .list');

let activeList = (index) => {
	domActive.forEach(i => i.classList.remove('active'));
	todos.map(i => i.active = '');
	todos[index].active = 'active';
	renderLists(todos);
	removeActiveFilter();
};
//Проверка фильтров на активность
let filters = document.querySelectorAll('.filter');
	
let checkFilters = () => {
	
}
//удаление класса активности у фильтров
let removeActiveFilter = () => {
	filters.forEach(i => i.classList.remove('active-filter'));
}
//Фильтр "Все"
let filterToAll = document.querySelector('.btn-all');

filterToAll.addEventListener('click', ()  => {
	domTasks.innerHTML = '';
	todos.forEach((i,index) => todos[index].tasks.forEach((i, ind) => {
		domTasks.innerHTML += `<li class="task ${i.checked}">
									<input ${i.checked} onchange="checkbox(event,${index},${ind})" type="checkbox">
									<b>${i.taskName}</b>
									<button onclick="deleteTask(event,${index},${ind})" type="button">&#10006;</button>
								</li>`;
	}));
	removeActiveFilter();
	filterToAll.classList.add('active-filter');
});
//Фильтр "Выполненные"
let filterToDone = document.querySelector('.btn-done');

filterToDone.addEventListener('click', () => {
	domTasks.innerHTML = '';
	let filter = todos.forEach((i,index) => {
		todos[index].tasks.filter(i => i.checked != '').forEach((i, ind) => {
			domTasks.innerHTML += `<li class="task ${i.checked}">
									<input ${i.checked} onchange="checkbox(event,${index},${ind})" type="checkbox">
									<b>${i.taskName}</b>
									<button onclick="deleteTask(event,${index},${ind})" type="button">&#10006;</button>
								</li>`;
		});
	});
	removeActiveFilter();
	filterToDone.classList.add('active-filter');
});
//Фильтр "Не выполненные"
let filterToNotDone = document.querySelector('.btn-not-done');

filterToNotDone.addEventListener('click', () => {
	domTasks.innerHTML = '';
	let filter = todos.forEach((i,index) => {
		todos[index].tasks.filter(i => i.checked != 'checked').forEach((i, ind) => {
			domTasks.innerHTML += `<li class="task ${i.checked}">
									<input ${i.checked} onchange="checkbox(event,${index},${ind})" type="checkbox">
									<b>${i.taskName}</b>
									<button onclick="deleteTask(event,${index},${ind})" type="button">&#10006;</button>
								</li>`;
		});
	});
	removeActiveFilter();
	filterToNotDone.classList.add('active-filter');
});

//Кнопка добавления списка
let newList = document.querySelector('.newList');
document.querySelector('.addList').addEventListener('click', () =>  {
	let toggle = newList.classList.toggle('none');
	if(newList.value != '') {
		addNewList(newList.value);
		newList.value = '';
		toggle;
	}
	toggle;
});
//Кнопка добавления задачи
let newTask = document.querySelector('.newTask');
document.querySelector('.addTask').addEventListener('click', () =>  {
	let toggle = newTask.classList.toggle('none');
	if(newTask.value != '') {
		addNewTask(newTask.value);
		newTask.value = '';
		toggle;
	}
	toggle;
});



