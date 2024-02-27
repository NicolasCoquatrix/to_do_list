let sections = document.querySelectorAll('section')

let dropBoxs = document.querySelectorAll('.card-body')

sections.forEach(function(section) {
    let addbButton = section.querySelector('.add')
    addbButton.addEventListener('click', function(){
        let addTask = section.querySelector('.new-task')
        addTask.addEventListener('click', function(){
            if(addTask.classList.contains('required-field')){
                addTask.classList.remove('required-field')
                addTask.placeholder = 'Nouvelle tâche'
            }
        })
        if(addTask.value){
            let cardBody = section.querySelector('.card-body')

            let newTask = document.createElement('div')
            newTask.classList.add('task', 'card', 'p-2', 'mb-2', 'gap-2', 'd-flex', 'flex-row', 'justify-content-between', 'align-items-center')
            newTask.setAttribute('draggable', true)

            newTask.addEventListener('dragstart', function(){
                newTask.classList.add('dragging')
            })

            newTask.addEventListener('dragend', function(){
                    newTask.classList.remove('dragging')
            })

            dropBoxs.forEach(function(dropBox) {
                dropBox.addEventListener('dragover', function(event){
                    event.preventDefault()
                })

                dropBox.addEventListener('drop', function(event){
                    event.preventDefault()
                    draggingTast = document.querySelector('.dragging')
                    dropBox.appendChild(draggingTast)
                })
            })

            let wordingBox = document.createElement('div')
            wordingBox.classList.add('wording-box', 'gap-2', 'd-flex', 'align-items-center')
            newTask.appendChild(wordingBox)

            let buttons = document.createElement('div')
            buttons.classList.add('d-flex', 'flex-column', 'gap-1')
            wordingBox.appendChild(buttons)

            let upButton = document.createElement('button')
            upButton.classList.add('btn', 'move-button', 'p-1', 'd-flex', 'justify-content-between', 'align-items-center')
            let upIcon = document.createElement('img')
            upIcon.classList.add('button-icon')
            upIcon.src = 'images/up.png'
            upIcon.alt = 'Monter la tâche'
            upButton.appendChild(upIcon)
            upButton.addEventListener('click', function(){
                dropBoxs.forEach(function(dropBox) {
                    tasks = dropBox.querySelectorAll('.task')
                    taskIndex = Array.from(tasks).findIndex(task => task.contains(document.activeElement))
                    if (taskIndex > 0 && taskIndex < tasks.length) {
                        dropBox.insertBefore(tasks[taskIndex], tasks[taskIndex-1])
                    }
                })
            })
            buttons.appendChild(upButton)

            let downButton = document.createElement('button')
            downButton.classList.add('btn', 'move-button', 'p-1', 'd-flex', 'justify-content-between', 'align-items-center')
            let downIcon = document.createElement('img')
            downIcon.classList.add('button-icon')
            downIcon.src = 'images/down.png'
            downIcon.alt = 'Dessendre la tâche'
            downButton.appendChild(downIcon)
            downButton.addEventListener('click', function(){
                dropBoxs.forEach(function(dropBox) {
                    tasks = dropBox.querySelectorAll('.task')
                    taskIndex = Array.from(tasks).findIndex(task => task.contains(document.activeElement))
                    if (taskIndex >= 0 && taskIndex < tasks.length) {
                        dropBox.insertBefore(tasks[taskIndex], tasks[taskIndex+2])
                    }
                })
            })
            buttons.appendChild(downButton)

            let wording = document.createElement('p')
            wording.classList.add('mb-0', 'wording')
            wording.textContent = addTask.value
            wordingBox.appendChild(wording)
            addTask.value = null

            let deleteButton = document.createElement('button')
            deleteButton.classList.add('btn', 'delete-button', 'p-2', 'd-flex', 'justify-content-between', 'align-items-center')
            let deleteIcon = document.createElement('img')
            deleteIcon.classList.add('delete-icon')
            deleteIcon.src = 'images/delete.png'
            deleteIcon.alt = 'Supprimer'
            deleteButton.appendChild(deleteIcon)
            deleteButton.addEventListener('click', function(){
                newTask.remove()
            })
            newTask.appendChild(deleteButton)

            cardBody.appendChild(newTask)
        } else {
            if(!addTask.classList.contains('required-field')){
                addTask.classList.add('required-field')
                addTask.placeholder = 'Champ obligatoire'
            }
        }
    })
})