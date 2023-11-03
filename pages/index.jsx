import { useEffect, useState } from 'react';

export default function Home() {
  const [conversor, setConversor] = useState('');
  const [dolarPeso, setDolarPeso] = useState('');
  const [cotacaoPesoReal, setCotacaoPesoReal] = useState('');
  const [valorProdutoDolar, setValorProdutoDolar] = useState('');
  const [valorFinal, setValorFinal] = useState('');
  const [valorProdutoPeso, setValorProdutoPeso] = useState('');

  const fetchDolarPesoValue = async () => {
    const request = await fetch('/api/hello');
    const data = await request.json();
    setDolarPeso(Math.round(data.USDARS.bid));
  };

  const calcular = () => {
    const value1 = dolarPeso * valorProdutoDolar;
    const value2 = value1 / cotacaoPesoReal;
    setValorFinal(Math.round(value2));
  };

  const calcularPesoReal = () => {
    const value1 = valorProdutoPeso / cotacaoPesoReal;
    setValorFinal(Math.round(value1));
  };

  const clean = () => {
    setCotacaoPesoReal('');
    setValorProdutoDolar('');
    setValorFinal('');
  };

  useEffect(() => {
    fetchDolarPesoValue();
  }, []);

  useEffect(() => {
    if (!conversor) {
      setDolarPeso('');
      setCotacaoPesoReal('');
      setValorProdutoDolar('');
      setValorFinal('');
      setValorProdutoPeso('');
    }
  }, [conversor]);

  return (
    <main className={`flex h-screen	 flex-col items-center justify-center`}>
      <button
        onClick={() => setConversor('')}
        className='btn btn-circle btn-neutral absolute top-4 start-4'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
      {!conversor && (
        <div className='w-full gap-4 p-4 flex flex-col items-center'>
          <p className='text-2xl	font-bold	text-center'>
            Qual conversor você gostaria de usar?
          </p>
          <div className='flex gap-4 flex-col w-full	justify-between	'>
            <button
              className='btn btn-neutral w-full'
              onClick={() => setConversor('consumo')}
            >
              Contas e Consumo
            </button>
            <button
              className='btn btn-neutral w-full'
              onClick={() => setConversor('dutyfree')}
            >
              Dutyfree
            </button>
          </div>
        </div>
      )}

      {conversor === 'dutyfree' && (
        <div className='p-8 gap-4	flex	flex-col	items-center	'>
          <h1 className='text-2xl	font-bold	text-center	'>
            Conversor de valores para usar no Dutyfree
          </h1>
          <p className='text-center	font-semibold	mt-4'>
            Um dólar equivale hoje a {dolarPeso} pesos
          </p>
          <div className='form-control w-full	'>
            <label className='label'>
              <span className='label-text'>
                Qual cotação você conseguiu? Real x Peso Argentino
              </span>
            </label>
            <input
              type='text'
              placeholder='Sua cotação em Pesos!'
              value={cotacaoPesoReal}
              onChange={(e) => setCotacaoPesoReal(e.target.value)}
              className='input input-bordered w-full'
            />
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>
                Qual valor do produto em dólares?
              </span>
            </label>
            <input
              type='text'
              placeholder='Valor do produto em Dólares!'
              value={valorProdutoDolar}
              onChange={(e) => setValorProdutoDolar(e.target.value)}
              className='input input-bordered w-full'
            />
          </div>

          <div className='flex w-full	justify-between	'>
            <button className='btn w-2/6' onClick={() => clean()}>
              Limpar
            </button>
            <button
              disabled={!cotacaoPesoReal || !valorProdutoDolar}
              className='btn btn-neutral w-3/5'
              onClick={() => calcular()}
            >
              Calcular
            </button>
          </div>

          {valorFinal && (
            <span className='text-2xl	font-bold	text-center'>
              Valor do produto
              <span className='text-pink-700'> R$ {valorFinal}</span>
            </span>
          )}
        </div>
      )}

      {conversor === 'consumo' && (
        <div className='p-8 gap-4	flex	flex-col	items-center	'>
          <h1 className='text-2xl	font-bold	text-center	'>
            Conversor de valores para usar no dia a dia (consumo)
          </h1>
          <div className='form-control w-full	'>
            <label className='label'>
              <span className='label-text'>
                Qual cotação você conseguiu? Real x Peso Argentino
              </span>
            </label>
            <input
              type='text'
              placeholder='Sua cotação em Pesos!'
              value={cotacaoPesoReal}
              onChange={(e) => setCotacaoPesoReal(e.target.value)}
              className='input input-bordered w-full'
            />
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>
                Qual valor do produto em pesos?
              </span>
            </label>
            <input
              type='text'
              placeholder='Valor do produto em Pesos!'
              value={valorProdutoPeso}
              onChange={(e) => setValorProdutoPeso(e.target.value)}
              className='input input-bordered w-full'
            />
          </div>

          <div className='flex w-full	justify-between	'>
            <button className='btn w-2/6' onClick={() => clean()}>
              Limpar
            </button>
            <button
              disabled={!cotacaoPesoReal || !valorProdutoPeso}
              className='btn btn-neutral w-3/5'
              onClick={() => calcularPesoReal()}
            >
              Calcular
            </button>
          </div>

          {valorFinal && (
            <span className='text-2xl	font-bold	text-center'>
              Valor do produto
              <span className='text-pink-700'> R$ {valorFinal}</span>
            </span>
          )}
        </div>
      )}
    </main>
  );
}
