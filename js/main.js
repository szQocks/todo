var lists = [];
var tasks = [];
const innerLists = document.querySelector('.todo_lists');
const innerTasks = document.querySelector('.todo_tasks');
//onload
window.onload = () => {
	if(localStorage.getItem('lists')){
		lists = JSON.parse(localStorage.getItem('lists'));
		lists.forEach((i,index) => {
		innerLists.innerHTML += `<div data="${i.attribute}" class="list ${i.active}">
									<span onclick="toggleActiveList(${index})">${i.name}</span>
									<button class="deleteList" onclick="deleteList(event,${index})">&#10006</button>
								</div>`;
		});
		if(localStorage.getItem('tasks').length > 10){
			tasks = JSON.parse(localStorage.getItem('tasks'));
			let attr = lists.find(i => i.active != '')
			tasks.forEach((i,index) => {
				if(i.parentAttribute == attr.attribute){
					innerTasks.innerHTML += `<li data="${i.parentAttribute}" class="task">
												<input onchange="check(event,${index})" type="checkbox" ${i.checked}>
												<span class="${i.checked}">${i.name}</span>
												<button onclick="deleteTask(event,${index})">&#10006</button>
											</li>`;
				}
			})
		}
		else{
			innerTasks.innerHTML = '';
		}
	}
}

//set to local
var setToLocal = () => {
	localStorage.setItem('lists', JSON.stringify(lists));
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
//data attribute
var data = (arr) => {
	let attribute = [];
	for (let i = 0; i<10; i++){
		let random = Math.floor(Math.random() * arr.length)
		attribute.push(arr[random])
	}
	return attribute.join('');
}
//render my lists
var renderMyTasks = () => {
	innerTasks.innerHTML = '';
	let attr = lists.find(i => i.active != '')
	tasks.forEach((i,index) => {
		if(i.parentAttribute == attr.attribute){
			innerTasks.innerHTML += `<li data="${i.parentAttribute}" class="task">
										<input onchange="check(event,${index})" type="checkbox" ${i.checked}>
										<span class="${i.checked}">${i.name}</span>
										<button onclick="deleteTask(event,${index})">&#10006</button>
									</li>`;
		}
	})
	setToLocal();
}
//check
var check = (e,index) => {
	if(e.target.hasAttribute('checked')){
		tasks[index].checked = '';
		e.target.removeAttribute('checked');
		e.target.nextElementSibling.classList.remove('checked');
	}
	else{
		tasks[index].checked = 'checked';
		e.target.setAttribute('checked','');
		e.target.nextElementSibling.classList.add('checked');
	}
	setToLocal();
}
//delete task
var deleteTask = (e,index) => {
	tasks.splice(index,1);
	setToLocal();
	e.target.parentElement.remove();
}
//remove all active
var removeAllActive = () => {
	lists.forEach(i => i.active = '');
}
//toggle active list
var toggleActiveList = (index) => {
	removeAllActive();
	lists[index].active = 'active';
	renderLists(lists);
	renderMyTasks();
	setToLocal();
}
//delete list
var deleteList = (e,index) => {
	if(e.target.parentElement.classList.contains('active')) innerTasks.innerHTML = '';
	lists.splice(index,1);
	renderLists(lists);
	let attr = e.target.parentElement.getAttribute('data');
	tasks = tasks.filter(i => i.parentAttribute !== attr);
	setToLocal();
}
//render lists
var renderLists = (lists) => {
	innerLists.innerHTML = '';
	lists.forEach((i,index) => {
	innerLists.innerHTML += `<div data="${i.attribute}" class="list ${i.active}">
								<span onclick="toggleActiveList(${index})">${i.name}</span>
								<button class="deleteList" onclick="deleteList(event,${index})">&#10006</button>
							</div>`;
	})
	setToLocal();
}
//createList
var createList = (value) => {
	let attribute = data([...'qwertyuiopasdfghjklzxcvbnm1234567890'])
	let list = new List(value,attribute);
	removeAllActive();
	lists.push(list);
	renderLists(lists);
	innerTasks.innerHTML = '';
}
//create task
var createTask = (value) => {
	let activeList = lists.find(i => i.active != '');
	let task = tasks.push(new Task(value, activeList.attribute));
	renderMyTasks()
}
//btn list
let btnList = document.querySelector('.btn_list');
let inputList = document.querySelector('.inputList');
btnList.addEventListener('click', () => {
	inputList.classList.toggle('animate-input');
	inputList.classList.toggle('none');
	if(inputList.value.trim() != '') createList(inputList.value.trim());
	inputList.value = '';
});
//btn task
let btnTask = document.querySelector('.btn_task');
let inputTask = document.querySelector('.inputTask');
btnTask.addEventListener('click', () => {
	inputTask.classList.toggle('animate-input');
	inputTask.classList.toggle('none');
	if(inputTask.value.trim() != '') createTask(inputTask.value.trim());
	inputTask.value = '';
});

//filter to all
document.querySelector('.all').addEventListener('click', () => {
	innerTasks.innerHTML = '';
	tasks.forEach((i,index) => {
	innerTasks.innerHTML += `<li data="${i.parentAttribute}" class="task">
								<input onchange="check(event,${index})" type="checkbox" ${i.checked}>
								<span class="${i.checked}">${i.name}</span>
								<button onclick="deleteTask(event,${index})">&#10006</button>
							</li>`;
	})
})
//filter to done
document.querySelector('.done').addEventListener('click', () => {
	innerTasks.innerHTML = '';
	tasks.forEach((i,index) => {
	if(i.checked != ''){
		innerTasks.innerHTML += `<li data="${i.parentAttribute}" class="task">
									<input onchange="check(event,${index})" type="checkbox" ${i.checked}>
									<span class="${i.checked}">${i.name}</span>
									<button onclick="deleteTask(event,${index})">&#10006</button>
								</li>`;
	}
	})
})
//filter to not done
document.querySelector('.not-done').addEventListener('click', () => {
	innerTasks.innerHTML = '';
	tasks.forEach((i,index) => {
	if(i.checked == ''){
		innerTasks.innerHTML += `<li data="${i.parentAttribute}" class="task">
									<input onchange="check(event,${index})" type="checkbox" ${i.checked}>
									<span class="${i.checked}">${i.name}</span>
									<button onclick="deleteTask(event,${index})">&#10006</button>
								</li>`;
	}
	})
})





