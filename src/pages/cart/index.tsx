import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link, replace } from 'react-router-dom';

export function Cart() {
  const { cart, addItemCart, removeItemCart, total } = useContext(CartContext);

 return (
   <div className="w-full max-w-7xl mx-auto">
        <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

        {cart.length === 0 && (
          <div className='flex flex-col items-center justify-center'>
            <p className='font-medium'>Ops, seu carrinho está vazio...</p>
            <Link
              to="/"
              className='bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded'
            >
              Acessar produtos
            </Link>
          </div>
        )}

        {cart.map((item) => (
            <section className="flex items-center justify-between border-b-2 border-gray-300">
            <Link to={`/product/${item.id}`}>
              <img
              src={item.cover}
              alt={item.description}
              className="w-28"
              />
            </Link>

            <strong>
              Preço: {item.price.toLocaleString("pt-BR", {
                style:"currency",
                currency: "BRL"
              })}
            </strong>

            <div className="flex items-center justify-center gap-3">
              <button onClick={() => removeItemCart(item)} className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">
                -
              </button>

              {item.amount}

              <button onClick={() => addItemCart(item)} className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">
                +
              </button>
            </div>

            <strong className="float-right">
              SubTotal: {item.total.toLocaleString("pt-BR", {
                style:"currency",
                currency: "BRL"
              })}
            </strong>

          </section>
        ))}

        {cart.length !== 0 && (
          <p className="font-bold mt-4">Total: {total}</p>
        )}

   </div>
 );
}