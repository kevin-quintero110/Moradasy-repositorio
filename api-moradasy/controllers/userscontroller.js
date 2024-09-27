let users = [
    { id: 1, name: "kevinqm7", password: "123456" },
    { id: 2, name: "tatiana23", password: "654321" },
  ];
  

const login = (req, res) => {
  const { name, password } = req.body; 

  const user = users.find(u => u.name === name && u.password === password);

  if (user) {
    res.json({ message: "Login exitoso", user });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};

export default {
  login,
};