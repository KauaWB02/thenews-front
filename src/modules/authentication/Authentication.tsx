import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import logo from '../../assets/logo.png';
import * as yup from 'yup';
import api from '../../services/apiService';
import { LoginInterface } from './interfaces/login';
import { setObject } from '../../store/storage';
import { PayloadReturnInterface } from './interfaces/login-payload-return.interface';

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  })
  .required();

const Authentication = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema), // Conecta o Yup ao React Hook Form
  });

  const handleLogin = async (data: LoginInterface) => {
    await api
      .post<PayloadReturnInterface>('/authentication/login', { email: data.email })
      .then((result) => {
        setObject('access_token', result.data.accessToken);
        setObject('user', result.data.user);
        setObject('menus', result.data.user.menus);
        setObject('permisionKeys', result.data.user.permissionsKeys);
        navigate('/streak');
      });

    // localStorage.setItem("access_token", btoa(JSON.stringify(fakeToken))); // Simulação de um token JWT
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-black-700'>
      <div className='p-8 bg-black-500 shadow-lg rounded-lg w-[30rem]'>
        <img
          className='w-52 m-auto'
          src={logo}
          alt='the_news'
        />
        <form
          onSubmit={handleSubmit(handleLogin)}
          className='w-full '>
          <label className='mb-2 flex flex-col gap-2'>
            <span className='text-amarelo text-lg'>E-mail</span>
            <input
              {...register('email')}
              className='border p-2 w-full rounded-md'
            />
            <p className='text-red-500'>{errors.email?.message}</p>
          </label>

          <div className='flex flex-row justify-end'>
            <button
              type='submit'
              disabled={!isValid}
              className=' text-preto font-medium bg-amarelo px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-cinza disabled:text-marrom'>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
