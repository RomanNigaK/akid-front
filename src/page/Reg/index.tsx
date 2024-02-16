
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux.hook";
import Input from "components/commons/Input";
import {
  FetchRegData,
  fetchRegRequestAction,
} from "redux/slices/profile/actions";
import { nanoid } from "@reduxjs/toolkit";
import Button from "components/commons/button";
import Submit from "components/commons/submit/Submit";
import { getSatatusProfile } from "redux/slices/profile/selectors";
import { schemaRegistartion } from "schema/reg";



export default function Reg() {
  const navigate = useNavigate();
  const statusProfile = useAppSelector(getSatatusProfile);
  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FetchRegData>({
    resolver: yupResolver(schemaRegistartion),
    defaultValues: {
      id: nanoid(),
      email:"1@1.ru",
      name:"Роман",
      password:"123123",
      phone:"89182189865",
      repeatPassword:"123123",
      sername:"Кулиш",
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FetchRegData> = (data) => {
    dispatch(fetchRegRequestAction(data));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-reg">
      <div className="city-skyline" />
      <h3>Регистрация</h3>
      <Input
        placeholder="Фамилия"
        name="sername"
        onChange={(val) => setValue("sername", String(val))}
        error={errors.sername?.message}
        onFocus={() => clearErrors("sername")}
      />
      <Input
        placeholder="Имя"
        name="name"
        onChange={(val) => setValue("name", String(val))}
        onFocus={() => clearErrors("name")}
        error={errors.name?.message}
      />
      <Input
        placeholder="Email"
        name="email"
        onChange={(val) => setValue("email", String(val))}
        error={errors.email?.message}
        onFocus={() => clearErrors("email")}
      />
      <Input
        placeholder="Номер телефона"
        name="phone"
        onChange={(val) => setValue("phone", String(val))}
        onFocus={() => clearErrors("phone")}
        error={errors.phone?.message}
      />
      <Input
        placeholder="Пароль"
        name="password"
        onChange={(val) => setValue("password", String(val))}
        onFocus={() => clearErrors("password")}
        error={errors.password?.message}
      />
      <Input
        placeholder="Повторите пароль"
        name="repeatPassword"
        onChange={(val) => setValue("repeatPassword", String(val))}
        onFocus={() => clearErrors("repeatPassword")}
        error={errors.repeatPassword?.message}
      />
      <Button title="Регистрация" idHtml="reg" status={statusProfile} />
      <Submit id="reg" />
      <div className="links">
        <Link to="/auth">Вход</Link>|<a href="">Забыли пароль</a>
      </div>
    </form>
  );
}
