let fruits = [
	{ id: 1, title: 'Яблоки', price: 20, img: 'https://klike.net/uploads/posts/2019-06/1561279314_5.jpg' },
	{ id: 2, title: 'Апельсины', price: 30, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg' },
	{ id: 3, title: 'Манго', price: 40, img: 'https://e0.edimdoma.ru/data/ingredients/0000/1089/1089-ed4_wide.jpg?1482770262' }
]

const toHTML = fruit => `
<div class="col">
				<div class="card">
					<img class="card-img-top" style="height: 300px" alt="${fruit.title}"
						src="${fruit.img}">
					<div class="card-body">
						<h5 class="card-title">${fruit.title}</h5>
						<a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
						<a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
					</div>
				</div>
			</div>
`

function render() {
	const html = fruits.map(toHTML).join('')
	document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
	title: 'Цена на тоовар',
	closable: true,
	width: '400px',
	footerButtons: [
		{
			text: 'Закрыть', type: 'primary', handler() {
				priceModal.close()
			}
		},
	]
})


document.addEventListener('click', event => {
	event.preventDefault()
	const btnType = event.target.dataset.btn
	const id = +event.target.dataset.id
	const fruit = fruits.find(f => f.id === id)

	if (btnType === 'price') {
		priceModal.setContent(`
		<p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p> 
		`)
		priceModal.open()
	} else if (btnType === 'remove') {
		$.confirm({
			title: 'Вы уверены?',
			content: `<p>Вы удаляеете фрукт: <strong>${fruit.title}</strong></p>`
		}).then(() => {
			fruits = fruits.filter(f => f.id !== id)
			render()
		}).catch(() => {
			console.log('cancel')
		})
	}
})
