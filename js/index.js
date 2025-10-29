let selectedId = 0
let currentStep = 0
let dataList;
let choisenData= 0;

const contentList = ["content-one", "content-two", "content-tree", "content-four"];

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
    el.style.borderColor = '#0c0e1c';
  })
  if (id !== selectedId) {
    div.style.borderColor = 'red'
    selectedId = id;
    choisenData = dataList[id - 1];
  } else {
    div.style.borderColor = '#0c0e1c';
    selectedId = 0;
    choisenData= 0;
  }
}

async function contentOne() {
  try {
    dataList = await readData()
    const content = document.getElementById('content-one')

    dataList.forEach((element) => {
      const card = document.createElement('div')
      card.id = `${element.id}`
      card.className =
        'item m-5 bg-black/54 h-fit rounded-3xl border-[#0c0e1c]  border-4 overflow-hidden'
      card.addEventListener('click', () => {
        changeBorderColor(card.id)
      })
      card.innerHTML = divCard(element)
      content.appendChild(card)
    })
    addEventListenerToBtns()
  } catch (error) { }
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

async function contentTwo() {
}

async function contentTree() {
}

async function contentFour() {
}


function addEventListenerToBtns() {
  const btnPrev = document.querySelector(".btns > .btn-prev")
  const btnNext = document.querySelector(".btns > .btn-next")
  btnPrev.addEventListener("click", () => {
    console.log("Prev button");
    if (currentStep === 0) {
      console.log("you cannot go back");
    } else {
      for (let index = 0; index <= currentStep; index++) {
        document.querySelector(`.${contentList[index]}`).style.display = "none";
      }
      currentStep--;
      const div = document.querySelector(`.${contentList[currentStep]}`);
      div.style.display = "block";
      stepColorChanger(0);
    }
  },
  );

  btnNext.addEventListener("click", () => {
    if (currentStep >= 3 || selectedId === 0) {
      console.log("you cannot go next");
    } else {
      for (let index = 0; index <= currentStep; index++) {
        document.querySelector(`.${contentList[index]}`).style.display = "none";
      }
      currentStep++;
      const div = document.querySelector(`.${contentList[currentStep]}`);
      div.style.display = "block";
      stepColorChanger(1);
    }
  },
  );
}

function stepColorChanger(type = 1) {
  const stepNumber = document.querySelector(".step-number > span")
  const steps = document.querySelectorAll(".step");
  if (type) {
    stepNumber.textContent = currentStep + 1;
    for (let index = 0; index <= currentStep; index++) {
      let step = steps[index]
      step.style.backgroundColor = "red";
    }
  } else {
    stepNumber.textContent = currentStep + 1;
    let step = steps[currentStep + 1]
    step.style.backgroundColor = "white";

  }
}



contentOne()
