#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>

using namespace std;

class User
{
private:
    string name;
    string pass;
public:
    User(string name, string pass)
    {
        this->name = name;
        this->pass = pass;
    };
    ~User(){};
    string getName()
    {
        return name;
    }
    string getPass()
    {
        return pass;
    }
    void setName()
    {
    }
    void setPass(string pass)
    {
        this->pass = pass;
    }
};

class Manager_Users
{
private:
    vector<shared_ptr<User>> users;
public:
    Manager_Users(){};
    ~Manager_Users(){};
    void createUser();
    shared_ptr<User> getMUser(string name);

};

class Article
{
private:

    int id;
    string name;
    double price;
    int stock;
    
public:
    Article(int id, string name, double price, int stock)
    {
        this->id = id;
        this->name = name;
        this->price = price;
        this->stock = stock;
    }
    ~Article(){};
};

void mainMenu(Manager_Users &managerUser);
void menuUser(shared_ptr<User> user);
void login(Manager_Users &managerUser);
bool validatepass(string pass);

int main()
{   
    Article articulo1(1, "Lavandina x 1L", 875.25, 3000);
    Article articulo2(4, "Detergente x 500mL", 1102.45, 2010);
    Article articulo3(22, "Jabón en polvo x 250g", 650.22, 407);

    vector<Article> articulos(Article articulo1,Article articulo2,Article articulo3);
    
    Manager_Users managerUsers;
    mainMenu(managerUsers);
    return 0;
}

void mainMenu(Manager_Users &managerUser)
{   
    int option;

    do
    {
        cout << "\n\t\tMenu Principal\n\n";
        cout << "1. Iniciar sesion\n";
        cout << "2. Crear usuario\n";
        cout << "3. Salir\n";
        cout << "Ingrese su opcion: ";
        cin >> option;

        switch (option)
        {
                case 1:
                    login(managerUser);
                    break;
                case 2:
                    managerUser.createUser();
                    break;
                case 3:
                    cout << "Programa Finalizado!";
                    break;
                default:
                    cout << "\t\tOpcion no valida!\n";
        }
    }while (option != 3);
}

void menuUser(shared_ptr<User> user)
{
    int option;
    string pass;

    do
    {
        cout << "\n\t\tMenu de Usuario\n\n";
        cout << "1. Cambiar contraseña\n";
        cout << "2. Salir\n";
        cout << "Ingrese su opcion: ";
        cin >> option;

        switch (option)
        {
                case 1:
                    cout << "\n~~La contraseña debe tener entre 8 y 16 caracteres alfanuméricos, al menos una mayúscula y al menos 2 símbolos especiales.\n";
                    cout << "Ingrese nueva contraseña: ";
                    cin  >> pass;
                    if (validatepass(pass))
                    {
                        user->setPass(pass);
                        if (pass == user->getPass())
                        {
                            cout << "\nContraseña modificada coerrectamente\n";
                        }else{
                            cout << "Error al cambiar la contraseña!\n";
                        }
                        option = 2;
                        break;
                    }
                    else {
                        cout << "\nLa contraseña no es valida!\n";
                    }
                case 2:
                    break;
                default:
                    cout << "\t\tOpcion no valida!\n";
        }
    }while (option != 2);
}

bool validatepass(string pass)
{
    int specialCounter = 0;
    bool hasUpper = false;
    bool hasDigit = false;

    if (pass.length() < 8 || pass.length() > 16) {
        return false;
    }

    for (char c : pass) {
        if (isupper(c)) hasUpper = true;
        if (isdigit(c)) hasDigit = true;
        if (!isalnum(c)) specialCounter++; // Si no es alfanumérico, es especial
    }

    return hasUpper && hasDigit && specialCounter >= 2;
}

void Manager_Users::createUser()
{
    string pass, name;
    bool passwordApproved = false, availableName = false;

    cout << "\t\t\nCrear Usuario\n";
    do
    {
        cout << "Ingrese nombre de usuario: ";
        cin >> name;
        
        if (getMUser(name))
        {
            cout << "\nNombre de usurio no disponible! Intente con otro.\n";
        }else {
            availableName = true;

            do
            {   
                cout << "~~La contraseña debe tener entre 8 y 16 caracteres alfanuméricos, al menos una mayúscula y al menos 2 símbolos especiales.\n";
                cout << "Ingrese la contraseña de usuario: ";
                cin >> pass;
                if (validatepass(pass))
                {
                    passwordApproved = true;
                }
                else{
                    cout << "Contraseña inválida. Intente nuevamente.\n";
                }
            } while (!passwordApproved);
            try {
                users.push_back(make_shared<User>(name, pass));
                cout << "Usuario creado correctamente\n";
            } catch (const std::exception& e) {
                cout << "Error al crear el usuario: " << e.what() << endl;
            }
        }
    } while (!availableName);
}

shared_ptr<User> Manager_Users::getMUser(string name) {
    auto it = find_if(users.begin(), users.end(), [&](const shared_ptr<User>& user) {
        return user->getName() == name;
    });

    if (it != users.end()) {
        return *it;  // Devuelve el `shared_ptr<User>` encontrado
    }
    
    return nullptr;  // No se encontró el usuario
}

void login(Manager_Users &managerUser)
{
    int attemptsPass = 0, attemptsName = 0;
    string name, pass;
    
    cout << "\n\t\t\tInicio de sesion\n\n";

    do  
    {
        cout << "Ingrese nombre de usuario: ";
        cin >> name;
        shared_ptr<User> user = managerUser.getMUser(name);
        
        if (user)
        {
            do
            {
                cout << "Ingrese contraseña de usuario: ";
                cin >> pass;
    
                if (pass == user->getPass())
                {
                    cout << "Bienvenido/a " << name << endl;
                    menuUser(user);
                    return;
    
                }else {
                    cout << "Contraseña incorrecta\n";
                    attemptsPass++;
                }
            } while (attemptsPass < 3);
        }else {
            cout << "El nombre de usuario no existe!\n";
            attemptsName++;
        }
    }while(attemptsName < 3);

    if (attemptsName == 3)
    {
        cout << "\nDemasiados intentos fallidos. Sistema bloqueado. Contacte al administrador\n";
    }
    
    if(attemptsPass == 3)
    {
        cout << "\nDemasiados intentos fallidos. Usuario bloqueado. Contacte al administrador\n";
    }
}