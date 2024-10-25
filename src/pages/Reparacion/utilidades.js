export const validaMinutos = (value) => {
    const minutes = (value - Math.trunc(value)) * 100;
    return minutes <= 59;
};
export const validaHoras = (value) => {
    const horas = Math.trunc(value);
    return horas < 24 && horas > 0;
};

export const calculaminutos = (value) => {
    const difminutos = ((Math.trunc(Number(value))) * 60) + (((Number(value)) - Math.trunc(Number(value))) * 100)
    return difminutos
}

export const convhoraminutos = (value, valorhoramot1) => {
    const horas = Math.floor(value / 60);
    const minutos = value % 60;
    const impMot1 = ((value) * (valorhoramot1 / 60)).toFixed(2)

    return { horas, minutos, impMot1 }
}
export const convertToMinutes = (value) => {
    const hours = Math.trunc(value) * 60;
    const minutes = (value - Math.trunc(value)) * 100;
    return hours + minutes;
};

export const calculateDuration = (desde, hasta) => {
    const durationInMinutes = convertToMinutes(hasta) - convertToMinutes(desde);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return { hours, minutes };
};