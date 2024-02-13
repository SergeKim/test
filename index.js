const json = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        },
    ]
};

const rootElement = document.querySelector('.list');
let tree = [...json.services];

function createListElement(item) {
    let elem = null;

    if (item.node === 0) {
        elem = document.createElement('li');
        elem.classList.add('list__li');
        elem.innerHTML = `
            <span class="list__li__content">
                ${item.name} - ${item.price}
            </span>`;
        return elem;
    }

    elem = document.createElement('li');
    elem.classList.add('list__li');
    elem.innerHTML = `
        <span class="list__li__content">
            ${item.name} - ${item.price}
        </span>
        <ul class="list__ul list__ul--inactive" id="${item.id}"></ul>`;
    return elem;
}

function appendItem(item, target = null) {
    const elem = createListElement(item);
    const targetElement = target || document.getElementById(`${item.head}`);
    if (!targetElement) return;
    targetElement.append(elem);
}

function headerSort() {
    tree.sort((a,b) => {
        const first = a.head, second = b.head;
        const firstSoftHead = a.sorthead, secondSoftHead = b.sorthead;
        if (first > second) {
            return 1;
        }
        if (first < second) {
            return -1;
        }

        if (first === second && firstSoftHead > secondSoftHead) {
            return 1;
        }

        if (first === second && firstSoftHead < secondSoftHead) {
            return -1;
        }

        return 0;
    })
}

function createTree() {
    headerSort();
    tree.forEach((item, index) => {
        if (item.head === null) {
            appendItem(item, rootElement);
            return;
        }
        appendItem(item);
    })
}

function initClickHandler() {
    rootElement.addEventListener('click', (e) => {
        const ulElement = e.target.querySelector('.list__ul');
        if (!ulElement) return;
        let classes = [...ulElement.classList];
        const isActive = classes.some((classItem) => classItem === 'list__ul--inactive')
        if (isActive) {
            ulElement.classList.remove('list__ul--inactive');
            return;
        }
        ulElement.classList.add('list__ul--inactive');
    });
}

(function () {
    createTree();
    initClickHandler();
})();
