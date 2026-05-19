let id: number = 5;
let company: string = "Corporation";
let isPublished: boolean = true;
// Тип array - массив строк (string[])
let tags: string[] = ["TypeScript", "JavaScript"];

// Тип any - отключает проверку типов (не рекомендуется, но допустимо)
let x: any = 10;

// Вывод всех базовых типов в консоль
console.log({ id, company, isPublished, tags, x });

// interface - описывает структуру объекта
interface User {
    id: number;          
    name: string;        
    age?: number;        // ? означает опциональное поле (может отсутствовать)
    greet: (message: string) => void;  // метод с типизированным параметром
}

// Создаём объект, соответствующий интерфейсу User
const user: User = {
    id: 1,
    name: "Anna",
    // age отсутствует - это допустимо, т.к. age опциональный
    greet: (message: string) => console.log(message),  // реализация метода
};

// Проверяем наличие опционального поля (выведет сообщение, т.к. age нет)
console.log(user.age === undefined ? "No age of the user" : user.age);
// Вызываем метод greet у объекта
user.greet("Hello from User.greet()");

// Типизированная функция: (a: string, b: string) => string
function concatValues(a: string, b: string): string {
    return a + " " + b;
}
console.log(concatValues("hello", "world"));

// type alias - создаёт собственный тип (псевдоним)
// Union использует символ | (значение может быть ИЛИ string ИЛИ number)
type Id = string | number;

// Функция принимает union тип (string ИЛИ number)
function printId(value: Id): void {  // void - функция ничего не возвращает
    console.log(`ID is equal to ${value}`);
}

printId("ID 123");  
printId(123);       

// Первый интерфейс
interface BusinessPartner {
    name: string;
    creditScore: number;
}

// Второй интерфейс
interface UserIdentity {
    id: number;
    email: string;
}

// Intersection использует символ & (объединяет ВСЕ поля из обоих интерфейсов)
type Employee = BusinessPartner & UserIdentity;

// Employee теперь имеет name, creditScore, id, email - все поля сразу
function signContract(employee: Employee): void {
    console.log(
        `Contract signed by ${employee.name}, email: ${employee.email}, creditScore: ${employee.creditScore}`
    );
}

// Должны передать все поля из BusinessPartner И UserIdentity
signContract({
    name: "Anna",
    creditScore: 800,
    id: 23,
    email: "anna@gmail.com",
});

// enum - набор именованных констант 
enum LoginError {
    Unauthorized = "unauthorized",        // явно задаём строковые значения
    NoUser = "no_user",
    WrongCredentials = "wrong_credentials",
    Internal = "internal",
}

// Функция обрабатывает различные типы ошибок на основе enum
function printLoginErrorMessage(error: LoginError): void {
    switch (error) {
        case LoginError.Unauthorized:
            console.log("User not authorized");
            return;
        case LoginError.NoUser:
            console.log("No user was found with that username");
            return;
        case LoginError.WrongCredentials:
            console.log("Wrong credentials");
            return;
        default:
            console.log("Internal error");
            return;
    }
}

// Передаём значения enum вместо "магических строк"
printLoginErrorMessage(LoginError.Unauthorized);
printLoginErrorMessage(LoginError.NoUser);
printLoginErrorMessage(LoginError.WrongCredentials);
printLoginErrorMessage(LoginError.Internal);

// <T> - generic (работает с любым типом, но сохраняет его)
class StorageContainer<T> {
    // Массив элементов типа T
    private contents: T[] = [];

    // Добавляем элемент типа T
    addItem(item: T): void {
        this.contents.push(item);
    }

    // Получаем элемент по индексу (возвращает T или undefined)
    getItem(index: number): T | undefined {
        return this.contents[index];
    }
}

// Создаём контейнер для строк (T = string)
const usernames = new StorageContainer<string>();
usernames.addItem("Anna");
usernames.addItem("Echo BR");
console.log(usernames.getItem(0));  

// Создаём контейнер для чисел (T = number)
const friendCounts = new StorageContainer<number>();
friendCounts.addItem(23);
friendCounts.addItem(56);
console.log(friendCounts.getItem(1));  

// readonly - поле можно прочитать, но нельзя изменить после создания
interface EmployeeReadOnly {
    readonly employeeId: number;     //  только для чтения
    name: string;                    // можно изменять
    readonly startDate: Date;        // только для чтения
    department: string;              // можно изменять
}

const emp: EmployeeReadOnly = {
    employeeId: 1,
    name: "Anna",
    startDate: new Date(),
    department: "Finance",
};

// Изменяем обычное поле 
emp.name = "Jessica";
// emp.employeeId = 2; // ОШИБКА! Нельзя изменить readonly поле
// Выводим объект в консоль
console.log(emp);