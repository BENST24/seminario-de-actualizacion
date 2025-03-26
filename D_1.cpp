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
};

int main()
{
    int attempts = 0;
    string name, pass;

    User user1("usuario1", "contra1");    
    User user2("usuario2", "contra2");

    do  
    {
        cout << "Ingrese nombre de usuario: ";
        cin >> name;
        cout << "Ingrese contraseña de usuario: ";
        cin >> pass;

        if ((name == user1.getName()) && (pass == user1.getPass()))
        {
            cout << "Bienvenido/a " << name << endl;
            break;

        }else if ((name == user2.getName()) && (pass == user2.getPass()))
        {
            cout << "Bienvenido/a " << name << endl;
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
