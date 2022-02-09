export const NAME = 'Наименование';
export const FACULTY = 'Факультет';
export const TYPE = "Тип техники";
export const INVENT = "Инвентарный номер";
export const ZAVOD = "Заводской номер";
export const YEAR = "Год выпуска";
export const BUILD = "Корпус";
export const ROOM = "Кабинет";
export const USER = "Сотрудник";
export const MATFYO = "Материально ответственное лицо";
export const PRINT = "Наклейка";
export const PROBLEM = "Проблема";
export const DESCRIPTION = "Описание";
export const DATE = "Инвентарный номер";
export const GET_DATE = "Дата получения";
export const IS_TRUSTED = "Списание";
export const CARTRIDGE = "Картридж";

interface INames {
    [key: string]: string
}

export const names = {
    type: {
        title: TYPE,
        category: 0
    },
    name: {
        title: NAME,
        category: 0
    },
    invent: {
        title: INVENT,
        category: 1
    },
    matfyo: {
        title: MATFYO,
        category: 1
    },
    zavod: {
        title: ZAVOD,
        category: 1
    },
    print: {
        title: PRINT,
        category: 2
    },
    year: {
        title: YEAR,
        category: 2
    },
    build: {
        title: BUILD,
        category: 2
    },
    room: {
        title: ROOM,
        category: 0
    },
    user: {
        title: USER,
        category: 0
    },
    faculty: {
        title: FACULTY,
        category: 0
    },
}

