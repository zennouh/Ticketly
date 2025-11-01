let selectedId = 0
let currentStep = 0
let dataList
//////////////////////////
let choisenData = 0
let choisenPlace = 0
let numberOfbillet = 0
let participList = []

const contentList = [
  'content-one',
  'content-two',
  'content-tree',
  'content-four',
]

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

function changeBorderColor(id) {
  const div = document.getElementById(id)
  document.querySelectorAll('.item').forEach((el) => {
    el.style.borderColor = '#0c0e1c'
  })
  if (id !== selectedId) {
    div.style.borderColor = 'red'
    selectedId = id
    choisenData = dataList[id - 1]
  } else {
    div.style.borderColor = '#0c0e1c'
    selectedId = 0
    choisenData = 0
  }
}

async function contentOne() {
  const content = document.getElementById('content-one')
  try {
    dataList = await readData()
    console.log('done')

    const cardContainer = document.createElement('div')
    console.log('done2')
    cardContainer.className =
      'grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    dataList.forEach((element) => {
      console.log('done3')
      const card = document.createElement('div')
      console.log('done4')

      card.id = `${element.id}`
      card.className =
        'item  my-5 bg-black/54 h-fit rounded-3xl border-[#0c0e1c]  border-4 overflow-hidden'
      card.addEventListener('click', () => {
        changeBorderColor(card.id)
      })
      card.innerHTML = divCard(element)
      cardContainer.appendChild(card)
    })
    content.appendChild(cardContainer)
    addEventListenerToBtns()
  } catch (error) {
    // const card = document.createElement('div')
    // card.innerHTML = `<h1>Error While loading data</h1>`
    // content.appendChild(card)
  }
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

function submitBtnListener() {
  const form = document.getElementById('myForm')
  const parti = document.querySelector('.people')
  let id = 0
  form.addEventListener('submit', (event) => {
    console.log('we click on submit')
    const noDataElement = document.querySelector('.nodataele')

    event.preventDefault()
    try {
      const name = document.getElementById('name').value.trim()
      const lastName = document.getElementById('lastname').value.trim()
      const email = document.getElementById('email').value.trim()
      const mobile = document.getElementById('mobile').value.trim()
      id++

      const data = { name, lastName, email, mobile, id }

      const emailreqexp = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.(com|net|org)$/
      const mobilereqexp = /^0(6|7)\d{8}$/
      const namereqexp = /^[a-zA-Z]+$/
      console.log(
        emailreqexp.test(email),
        mobilereqexp.test(mobile),
        namereqexp.test(name),
        namereqexp.test(lastName)
      )

      if (
        emailreqexp.test(email) &&
        mobilereqexp.test(mobile) //&&
        // namereqexp.test(name) &&
        // namereqexp.test(lastName)
      ) {
        noDataElement.style.display = 'none'
        if (numberOfbillet == 0) {
          // call next btn
          console.log('no parti left')

          return
        } else {
          form.reset()
          const resultDiv = participantCard(data)
          parti.appendChild(resultDiv)
          participList.push(data)
          numberOfbillet--
          document
            .getElementById(`delete-${data.id}`)
            .addEventListener('click', () => {
              parti.removeChild(resultDiv)
              numberOfbillet++
              console.log(parti.children.length)
              if (parti.children.length == 0) {
                noDataElement.style.display = 'block'
                id = 0
              }
            },)
        }
      }
    } catch (error) {
      console.log(error.message || error)
    }
  })
}

function participantCard(data) {
  const div = document.createElement('div')
  div.className =
    'particip flex justify-between items-center p-3 w-full bg-[#151932] rounded-2xl'
  div.innerHTML = `  <div class="info w-[75%]">
                    <div>Nom: ${data.name}</div>
                    <div>Prenom: ${data.lastName}</div>
                    <div>E-mail: ${data.email}</div>
                    <div>Telephone: ${data.mobile}</div>
                  </div>
                  <div id="delete-${data.id}" class="delete-${data.id}  bg-red-800 px-3 py-1 rounded-lg">
                    <i class="fa-solid fa-trash"></i>
                  </div>
                  `

  return div
}

function addEventListenerToBtns() {
  const btnPrev = document.querySelector('.btns > .btn-prev')
  const btnNext = document.querySelector('.btns > .btn-next')
  btnPrev.addEventListener('click', () => {
    console.log('Prev button')
    if (currentStep === 0) {
      console.log('you cannot go back')
    } else {
      for (let index = 0; index <= currentStep; index++) {
        document.querySelector(`.${contentList[index]}`).style.display = 'none'
      }
      currentStep--
      const div = document.querySelector(`.${contentList[currentStep]}`)
      div.style.display = 'block'
      stepColorChanger(0)
    }
  })

  btnNext.addEventListener('click', (event) => {
    if (currentStep >= 4) {
      console.log('you cannot go next')
    } else {
      switch (currentStep) {
        case 0: {
          if (selectedId === 0) {
            console.log('you cannot go next, i need toast or sneakbar')
            break
          } else {
            for (let index = 0; index <= currentStep; index++) {
              document.querySelector(`.${contentList[index]}`).style.display =
                'none'
            }
            currentStep++
            stepColorChanger(1)

            const div = document.querySelector(`.${contentList[currentStep]}`)
            div.style.display = 'flex'

            break
          }
        }
        case 1: {
          const value = Number(document.getElementById('Ncounter').value) || 0

          const resetPlace = Number(choisenData.places)

          console.log('le valur est: ', value)
          console.log('le resetPlace est: ', resetPlace)
          if (resetPlace < value) {
            console.log('no enough places')
            break
          } else {
            for (let index = 0; index <= currentStep; index++) {
              document.querySelector(`.${contentList[index]}`).style.display =
                'none'
            }
            currentStep++
            stepColorChanger(1)
            numberOfbillet = value
            const div = document.querySelector(`.${contentList[currentStep]}`)
            div.style.display = 'flex'
            submitBtnListener()
            break
          }
        }
        case 2: {
          console.log(numberOfbillet)
          if (numberOfbillet == 0) {
            for (let index = 0; index <= currentStep; index++) {
              document.querySelector(`.${contentList[index]}`).style.display =
                'none'
            }
            currentStep++
            console.log('the current step is ', currentStep)

            stepColorChanger(1)
            const div = document.querySelector(`.${contentList[currentStep]}`)
            div.style.display = 'flex'
            if (currentStep == 3) {
              console.log(participList.length);
              document.getElementsByClassName("btns")[0].style.display = "none"
              document.getElementsByClassName("reservation")[0].addEventListener("click", () => {
                window.alert("felecitation");

                currentStep = 0;
                for (let index = 0; index <= 3; index++) {
                  document.querySelector(`.${contentList[index]}`).style.display = 'none'
                }
                const div = document.querySelector(`.${contentList[0]}`)
                div.style.display = 'block'
                location.reload()
              })
              prepareAllData()
            }

          } else {
            console.log('you need to fill all people')
          }

          break;
        }

        default: {
          break
        }
      }
    }
  })
}

function prepareAllData() {


  const eventConainer = document.getElementsByClassName('event')[0]
  const particEvent = document.getElementsByClassName('partic-event-p')[0]
  const eventDiv = document.createElement('div')
  eventDiv.className = 'info bg-black/75 rounded-2xl overflow-hidden text-white p-5'
  eventDiv.innerHTML = `
          <img src="${choisenData.cover}" alt="hallowen" class="" />
                <div class="info w-[75%] text-white p-5">
                  <div>Nom: ${choisenData.name}</div>
                  <div>Date: ${choisenData.date}</div>
                  <div>Price: ${choisenData.price}</div>
                  <div>reset: ${choisenData.places}</div>
                  <div>place: ${choisenData.location}</div>
                </div>
               
                `
  eventConainer.appendChild(eventDiv)

  for (const p of participList) {
    console.log("===========:loop inside participList:===========");

    const particDiv = document.createElement("div")
    particDiv.className = "partic"
    particDiv.innerHTML = `<div>Nom: ${p.name}</div>
                  <div>Prenom: ${p.lastName}</div>
                  <div>E-mail: ${p.email}</div>
                  <div>Telephone: ${p.mobile}</div>
                  <hr />`
    particEvent.appendChild(particDiv)
  }
  let totalPrix = document.getElementsByClassName("totalPrix")[0];
  totalPrix.innerHTML = `Le prix total est: ${participList.length * Number(choisenData.price)}`;

}

function stepColorChanger(type = 1) {
  const stepNumber = document.querySelector('.step-number > span')
  const steps = document.querySelectorAll('.step')
  if (type) {
    stepNumber.textContent = currentStep + 1
    for (let index = 0; index <= currentStep; index++) {
      let step = steps[index]
      step.style.backgroundColor = 'red'
    }
  } else {
    stepNumber.textContent = currentStep + 1
    let step = steps[currentStep + 1]
    step.style.backgroundColor = 'white'
  }
}

function contenTwoNextFunction() { }

contentOne()
