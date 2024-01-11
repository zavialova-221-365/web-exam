document.addEventListener('DOMContentLoaded', function () {
    const routesTableBody = document.getElementById('routesTableBody');
    const pagination = document.getElementById('pagination');
    const guidesTableBody = document.getElementById('guidesTableBody');
    let currentPage = 1;
    const itemsPerPage = 10; // Определение количества записей на странице
    let allRoutesData = []; // Данные о всех маршрутах

    function getRoutesData() {
        const apiUrl = `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=3990d76f-4908-438c-a2e9-90a0a642eb96`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                allRoutesData = data;
                updateTable(currentPage);
            })
            .catch(error => {
                console.error('Ошибка получения данных о маршрутах:', error);
            });
    }


    const searchInput = document.getElementById('searchInput');
    const applyButton = document.querySelector('.btn-primary');

    applyButton.addEventListener('click', function () {
        event.preventDefault(); // Предотвращаем действие по умолчанию - перезагрузку страницы

        const searchTerm = searchInput.value.toLowerCase(); // Получаем введенный текст из поля поиска

        // Фильтруем данные по введенному тексту
        const filteredRoutes = allRoutesData.filter(route => {
            return route.name.toLowerCase().includes(searchTerm);
        });

        // Очищаем и обновляем таблицу с отфильтрованными данными
        routesTableBody.innerHTML = '';
        filteredRoutes.forEach(route => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const descriptionCell = document.createElement('td');
            const objectsCell = document.createElement('td');
            const buttonCell = document.createElement('td');
            const selectButton = document.createElement('button');

            nameCell.textContent = route.name;
            descriptionCell.textContent = route.description;
            objectsCell.textContent = route.mainObject;

            selectButton.textContent = 'Выбрать';
            selectButton.classList.add('btn', 'btn-secondary', 'selectRouteBtn');
            selectButton.addEventListener('click', function () {
                row.classList.toggle('selected');
                const routeId = route.id;
                const routeName = route.name;
                loadGuidesForRoute(routeId, routeName);
                updateSelectedRoute(routeName);
                populateLanguagesSelect(routeId);
            });

            buttonCell.appendChild(selectButton);

            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(objectsCell);
            row.appendChild(buttonCell);

            routesTableBody.appendChild(row);
        });

        // Пересчитываем и создаем пагинацию для отфильтрованных данных
    });
    function updateTable(page) {

        routesTableBody.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const routesData = allRoutesData.slice(startIndex, endIndex);

        routesData.forEach(route => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const descriptionCell = document.createElement('td');
            const objectsCell = document.createElement('td');
            const buttonCell = document.createElement('td');
            const selectButton = document.createElement('button');

            nameCell.textContent = route.name;
            descriptionCell.textContent = route.description;
            objectsCell.textContent = route.mainObject;

            selectButton.textContent = 'Выбрать';
            selectButton.classList.add('btn', 'btn-secondary', 'selectRouteBtn');
            selectButton.addEventListener('click', function () {
                row.classList.toggle('selected');
                const routeId = route.id;
                const routeName = route.name;
                loadGuidesForRoute(routeId, routeName);
                populateLanguagesSelect(routeId);
                updateSelectedRoute(routeName);
            });

            buttonCell.appendChild(selectButton);

            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(objectsCell);
            row.appendChild(buttonCell);

            routesTableBody.appendChild(row);
        });

        createPagination();


        const searchInput = document.getElementById('searchInput').value.toLowerCase();

        // Фильтрация данных по поисковому запросу
        const filteredRoutesData = allRoutesData.filter(route =>
            route.name.toLowerCase().includes(searchInput)
        );

        // Отображение только отфильтрованных данных на странице

        // Остальной код отображения данных остается без изменений

        createPagination();
    }
    function createPagination() {

        pagination.innerHTML = '';
        const totalPages = Math.ceil(allRoutesData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = '#';
            a.textContent = i;

            if (i === currentPage) {
                li.classList.add('page-item', 'active');
            } else {
                li.classList.add('page-item');
            }

            a.addEventListener('click', function (event) {
                event.preventDefault();
                currentPage = i;
                updateTable(currentPage);
            });

            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

});