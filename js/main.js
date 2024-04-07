let countWord = 0;
let lengthWord;
let counter;
let coin;

/* поиск активных улементов */
let inputs = document.getElementsByClassName('input-text');
let btns = document.getElementsByClassName('input-btn');
let coinCounter = document.getElementsByClassName('coin-counter')[0];

if (localStorage.getItem('coin') == null) {
  localStorage.setItem("coin", "0");
  coin = 0;
} else {
  coin = localStorage.getItem("coin");
}

coinCounter.innerHTML = coin;

/*изменения счётчика монет */
function reloadCoin(deferent) {
  coin = parseInt(localStorage.getItem('coin')) + parseInt(deferent);
  localStorage.setItem("coin", coin);
  coinCounter.innerHTML = coin;
}

/* перезапуск сцены */
function resetScene() {
  counter = 0;
  for (let i = 0; i < btns.length; i++) {
    btns[i].style.display = 'inline-block';
    btns[i].value = 'inline-block';
    inputs[i].style.display = 'inline-block';
    inputs[i].value = '';
  }
  lengthWord = 0;

  
  document.querySelector('.description').innerText = arrDescription[countWord];
  let buf = arrWords[countWord].slice();
  buf.sort(() => Math.random() - 0.5);
  buf.forEach(element => {
    btns[lengthWord].value = element;
    lengthWord++;
  });
  hiddenElem(countWord, lengthWord);
}

/* скрыть лишние элементы */
function hiddenElem (countWord, lengthWord) {
  let j = inputs.length - 1;
  while ( j >= lengthWord) {
    inputs[j].style.display = 'none';
    btns[j].style.display = 'none';
    j--;
  }
  j = inputs.length - 1;
}

/* проверка истинности */
function checkTrue() {
  for (let i = 0; i < lengthWord; i++) {
    if (arrWords[countWord][i] != inputs[i].value) {
      console.log(arrWords[countWord][i]);
      console.log(inputs[i].value);
      alert('провал');
      resetScene();
      break;
    } else if(i == lengthWord - 1) {
      alert('успех');
      reloadCoin(10);
      countWord++;
      if (countWord+1 > arrWords.length) {
        alert('Вы прошли уровень');
        document.querySelector('.coins__link').click();
      }
      resetScene();
      break;
    }
  }
}

/* запуск сцены */
function loadScene() {
  counter = 0;
  lengthWord = 0;

  document.querySelector('.description').innerText = arrDescription[countWord];

  let buf = arrWords[countWord].slice();
  buf.sort(() => Math.random() - 0.5);
  buf.forEach(element => {
    btns[lengthWord].value = element;
    lengthWord++;
  });

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
      inputs[counter].value = this.value;
      this.style.display = 'none';
      counter++;
    });
  }

  hiddenElem(countWord, lengthWord);
  reloadCoin(0);
}

loadScene();


// использование подсказки
document.getElementsByClassName('coins__help')[0].addEventListener('click', function () {
  if (parseInt(localStorage.getItem('coin')) >= 50) {
    reloadCoin(-50);
    for (let i = 0; i < arrWords[countWord].length; i++) {
      if (inputs[i].value == arrWords[countWord][i]) { // буквы сходятся
        if (counter < arrWords[countWord].length -2) {
          counter++;
          continue;
        } else if (i == arrWords[countWord].length -1) {
          reloadCoin(50);
          alert('слово заполнено правильно');
          break;
        }
      } else if (inputs[i].value == '') { //  не заполненно
        if (counter < arrWords[countWord].length -2) {
          counter++;
        }
        inputs[i].value = arrWords[countWord][i];
        for (let j = 0; j < btns.length; j++) {
          if (btns[j].value == arrWords[countWord][i] && btns[j].style.display != 'none') {
            btns[j].style.display = 'none';
            break;
          }
        }
        break;
      } else if (counter >= arrWords[countWord].length) { // слово полностью заполнено
        let buf = 0;
        for (let k = 0; k < arrWords[countWord].length; k++) {
          if (inputs[k].value != arrWords[countWord][k]) {
            for (let j = k+1; j < arrWords[countWord].length; j++) {
              if (inputs[j].value == arrWords[countWord][k]) {
                buf = inputs[k].value;
                inputs[k].value = inputs[j].value;
                inputs[j].value = buf;
                break;
              }
            }
            break;
          }
        }
        break;
      } else { // буквы не сходятся
        console.log(44);
        for (let j = 0; j < arrWords[countWord].length; j++) {
          if (btns[j].value == arrWords[countWord][i] && btns[j].style.display != 'none') {
            btns[j].value = inputs[i].value;
            inputs[i].value = arrWords[countWord][i];
            break;
          }
        }
        break;
      }
    }
  } else {
    alert('недостаточно монет');
  }
})