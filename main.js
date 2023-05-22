//Seleciona os elementos HTML que serão usados aqui
const currentTime = document.querySelector("h1"), //Seleciona o elemento h1 para exibir a hora atual
    content = document.querySelector('.content'),//Seleciona a classe content que será desativada quando o alarme for ativado
    selectMenu = document.querySelectorAll('select'),//Seleciona o array de elementos select no HTML para escolher a hora, minutos e AM/PM para definir o alarme
    btnSetAlarm = document.querySelector('button');//Seleciona um elemento button que, quando clicado ativa ou desativa o alarme


setInterval(() => { //O setInterval é o responsável por executar cada segundo
                 //Atualiza a hora atual do relógio e verifica se o horário do alarme foi atingido
    let date = new Date(), //A variável date é definida como um novo objeto Date() que contém a hora atual.
        hours = date.getHours(),//Hora atual
        minutes = date.getMinutes(),//Minuto atual
        seconds = date.getSeconds(),//Segundo atual
        ampm = "AM";

    if (hours >= 12) {
        hours = hours - 12;
        ampm = "PM";//Atualiza o relógio para PM depois do meio dia
    }

    hours = hours == 0 ? hours = 12 : hours;//As horas são atualizadas para o formato 12 horas, com zero adicionado para representar as horas de 1 a 9.
    hours = hours < 10 ? "0" + hours : hours;
    //Os minutos e segundos são atualizados para ter dois dígitos, com um zero adicionado para representar números menores que 10.
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    //o currentTime serve para atualizar a hora atual no fotmato "hh:mm:ss AM/PM"
    currentTime.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;

    if (alarmTime === `${hours}:${minutes} ${ampm}`) {
        ringTone.play();
        ringTone.loop = true;
    }

});

let alarmTime, isAlarmSet, ringTone = new Audio("/audio/alarme clock_audio_ringtone.mp3");
//Este for cria a opção paras as horas, indo de 12 a 1.
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

//Este for cria a opção para os minutos, indo de 59 a 0
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

//Este for cria a opção para AM/PM
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//Serve para ativar e desativar o botão "Ativar Alarme" quando clicado
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringTone.pause();
        ringTone.currentTime = 0;
        isAlarmSet = false;
        content.classList.remove('inactive');
        btnSetAlarm.innerHTML = "Definir Alarme";
    } else {
        const selectedDate = document.querySelector('#start-date').value;
        const currentDate = new Date().toISOString().slice(0, 10);

        if (selectedDate === currentDate) {
            const selectedHour = document.querySelector('#hour').value;
            const selectedMinute = document.querySelector('#minute').value;
            const selectedAmPm = document.querySelector('#ampm').value;

            alarmTime = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;
            isAlarmSet = true;
            content.classList.add('inactive');
            btnSetAlarm.innerHTML = "Desativar Alarme";
        } else {
            alert('Selecione a data correta para ativar o alarme.');
        }
    }
}


//O evento click é adicionado ao botão "Ativar Alarme" para chamar a função setAlarm() quando o botão é clicado.
btnSetAlarm.addEventListener("click", setAlarm);