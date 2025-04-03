#include <iostream>

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

void menu(User &user);

int main()
{
    int attempts = 0;
    string name, pass;

    User user1("usuario1", "contra1");    
    User user2("usuario2", "contra2");

    do  
    {

        cout << "\n\t\t\tInicio de sesion\n\n";
        cout << "Ingrese nombre de usuario: ";
        cin >> name;
        cout << "Ingrese contraseña de usuario: ";
        cin >> pass;

        if ((name == user1.getName()) && (pass == user1.getPass()))
        {
            cout << "Bienvenido/a " << name << endl;
            menu(user1);

        }else if ((name == user2.getName()) && (pass == user2.getPass()))
        {
            cout << "Bienvenido/a " << name << endl;
            menu(user2);
            break;

        }else 
        {
            cout << "Usuario y/o contraseña incorrecta\n";
            attempts++;
        }
    
    }while(attempts < 3);
    
    if(attempts == 3)
    {
        cout << "Usuario bloqueado. Contacte al administrador\n";
    }
    
    return 0;
}

void menu(User &user)
{
    int option;
    string pass;

    do
    {
        cout << "\n\t\tMenu\n\n";
        cout << "1. Cambiar contraseña\n";
        cout << "2. Salir\n";
        cout << "Ingrese su opcion: ";
        cin >> option;

        switch (option)
        {
                case 1:
                    cout << "Ingrese nueva contraseña: ";
                    cin  >> pass;
                    user.setPass(pass);
                    if (pass == user.getPass())
                    {
                        cout << "\nContraseña cambiada correctamente\n";
                    }
                    else{
                        cout << "Error al cambiar la contraseña!\n";
                    }
                    break;

                case 2:

                cout << option;
                    break;
            
            default:
                cout << "\t\tOpcion no valida!\n";
        }
    }while (option != 1 && option != 2);
}