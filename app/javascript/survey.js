  // Allow drop in survey container
  function allowDrop(event) {
    event.preventDefault();
  }

  // Handle drag start
  function drag(event) {
    event.dataTransfer.setData("type", event.target.getAttribute("data-type"));
  }

  // Handle drop in survey container
  function drop(event) {
    event.preventDefault();
    
    let componentType = event.dataTransfer.getData("type");
    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;

    let newComponent;
    if (componentType === 'label') {
      newComponent = document.createElement('div');
      newComponent.classList.add('component');
      newComponent.setAttribute('draggable', true);
      newComponent.setAttribute('data-type', 'label');
      newComponent.style.left = `${x}px`;
      newComponent.style.top = `${y}px`;
      newComponent.innerHTML = '<span contenteditable="true">Label</span>';
    } else if (componentType === 'input') {
      newComponent = document.createElement('div');
      newComponent.classList.add('component');
      newComponent.setAttribute('draggable', true);
      newComponent.setAttribute('data-type', 'input');
      newComponent.style.left = `${x}px`;
      newComponent.style.top = `${y}px`;
      newComponent.innerHTML = '<input type="text">';
    }

    newComponent.ondragstart = dragComponent;
    event.target.appendChild(newComponent);
  }

  // Handle component dragging inside the survey container
  function dragComponent(event) {
    event.dataTransfer.setData("id", event.target.getAttribute("data-id"));
  }

  document.querySelectorAll('.component span[contenteditable="true"]').forEach(span => {
    span.addEventListener('dblclick', function () {
      let parent = span.closest('.component');
      parent.setAttribute('draggable', false);
      span.focus();

      // After editing, restore drag-ability
      span.addEventListener('blur', function () {
        parent.setAttribute('draggable', true);
      });
    });
  });

  document.getElementById('save-survey').addEventListener('click', function () {
    let components = [];
    document.querySelectorAll('#survey-container .component').forEach((component) => {
      let id = component.getAttribute('data-id') || null;  // Handle new components
      let type = component.getAttribute('data-type');
      let content = (type === 'label') ? component.querySelector('span').innerText : component.querySelector('input').value;
      let x = parseInt(component.style.left, 10);
      let y = parseInt(component.style.top, 10);

      components.push({ id, type, content, x, y });
    });

    let surveyId = document.getElementById('survey-container').getAttribute('data-survey-id');
    
    console.log('Saving survey ID:', surveyId);  // Debugging log

    fetch(`/surveys/${surveyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ components })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      console.log('Survey saved successfully:', data);  // Debugging log
      alert(data.message);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  });

  document.getElementById('save-survey').addEventListener('click', function (event) {
    event.preventDefault();  // Prevent form submission
    
    let components = [];
    document.querySelectorAll('#survey-container .component').forEach((component) => {
      let id = component.getAttribute('data-id') || null;  // Handle new components
      let type = component.getAttribute('data-type');
      let content = (type === 'label') ? component.querySelector('span').innerText : component.querySelector('input').value;
      let x = parseInt(component.style.left, 10);
      let y = parseInt(component.style.top, 10);

      components.push({ id, type, content, x, y });
    });

    let surveyId = document.getElementById('survey-container').getAttribute('data-survey-id');
    
    console.log('Saving survey ID:', surveyId);  // Debugging log

    fetch(`/surveys/${surveyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ components })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      console.log('Survey saved successfully:', data);  // Debugging log
      alert(data.message);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  });