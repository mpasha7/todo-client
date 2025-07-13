export interface TaskLookupDto {
    id: number;
    title: string;
    status: TaskStatus;
}

export interface TaskListVm {
    tasks: TaskLookupDto[];
}

export interface TaskDetailsVm {
    id: number;
    title: string;
    description: string|undefined;
    status: TaskStatus;
}

export interface CreateTaskDto {
    title: string;
    description: string|undefined;
    status: TaskStatus;
}

export interface UpdateTaskDto {
    id: number;
    title: string;
    description: string|undefined;
    status: TaskStatus;
}

export enum TaskStatus {
    NotCompleted = "Не выполнено",
    AtWork = "В работе",
    Pause = "Приостановлено",
    Completed = "Выполнено",
}

export const initialTasksDb: TaskDetailsVm[] = [
    { id: 1, title: "Разработать приложение", 
        description: "Провести анализ предметной области\nСпроектировать архитектуру приложения и модель данных\nРазработать серверную часть приложения\nРазработать клиентскую часть приложения\nПровести тестирование\nРазвернуть приложение", 
        status: TaskStatus.NotCompleted
    },
    { id: 2, title: "Написать отчет", 
        description: "Сесть и написать отчет по разработке", 
        status: TaskStatus.NotCompleted
    },
    { id: 3, title: "Купить продукты на ужин", 
        description: "Зайти после работы в магазин и купить:\nХлеб,\nПельмени,\nКофе", 
        status: TaskStatus.NotCompleted
    },
    { id: 4, title: "Посмотреть фильм", 
        description: "Выбрать фильм на кинопоиске и посмотреть", 
        status: TaskStatus.NotCompleted
    }
];

export interface TaskSelectParameters {
    search: string;
    statuses: TaskStatus[];
}
