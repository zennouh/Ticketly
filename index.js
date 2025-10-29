let selectedId = 0

async function readData() {
  try {
    const res = await fetch('data.json')
    if (!res.ok) throw new Error('Failed to fetch data.json')
    return await res.json()
  } catch (error) {
    console.error('Error while reading the file:', error)
    throw error
  }
}

function changeBorderColor() {
  const div = document.getElementById(selectedId)
  document.querySelectorAll('.item').forEach((el) => {
    el.style.borderColor = '#0c0e1c'
  })
  div.style.borderColor = 'red'
}

async function setData() {
  try {
    const dataList = await readData()
    const content = document.getElementById('content-one')
    dataList.forEach((element) => {
      const card = document.createElement('div')
      card.id = `${element.id}`
      card.className =
        'item m-5 bg-black/54 h-fit rounded-3xl border-[#0c0e1c]  border-4 overflow-hidden'
      card.addEventListener('click', () => {
        selectedId = card.id
        changeBorderColor()
        console.log(card.id)
      })
      card.innerHTML = divCard(element)
      content.appendChild(card)
    })
  } catch (error) {}
}

function divCard({ cover, name, location, date, places, price }) {
  return `
    <div  class="bgimg grid items-end">
              <img
                src="${cover}"
                class="w-full h-auto row-[1/2] col-[1/2]"
                alt="Hallowen"
              />
              <div
                class="img-info m-2 row-[1/2] col-[1/2] flex justify-between"
              >
                <div class="reset bg-red-700 rounded-full px-3 py-2">
                  reset: ${places}
                </div>
                <div class="prix bg-black rounded-full px-3 py-2 text-white">
                  ${price} euro
                </div>
              </div>
            </div>
            <div class="info p-2">
              <div
                class="adress text-white bg-[#27234C]/75 rounded-full px-3 py-2"
              >
                ${location}
              </div>
              <div class="info m-2 row-[1/2] col-[1/2] flex justify-between">
                <div class="reset bg-yellow-400 rounded-full px-3 py-2">
                 ${name}
                </div>
                <div
                  class="prix bg-green-500 rounded-full px-3 py-2 text-white"
                >
                 ${date}
                </div>
              </div>
            </div>
  `
}

setData()
