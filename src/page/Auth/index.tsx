import Input from "components/commons/Input";
import Button from "components/commons/button";
import { Link } from "react-router-dom";

export default function Auth() {
  return (
   <form action="">
    <div className="city-skyline" />
    <h3>Вход</h3>
    <Input placeholder="Логин" value="dsfdsf" error="sdfs" name="email"/>
    <Input placeholder="Пароль" error="" value="sfdf" name="password"/>
    <Button title="Войти"/>
    <div className="links">
    <Link to="/auth/reg">Регистрация</Link>|
      <a href="">Забыли пароль</a>
    </div>
   </form>
  )
}
