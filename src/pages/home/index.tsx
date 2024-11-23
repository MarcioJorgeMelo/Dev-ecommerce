import { useEffect, useState, useContext } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';

import { CartContext } from '../../contexts/CartContext';

export interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home() {
  const { addItemCart } = useContext(CartContext);
  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }

    getProducts();
  }, []);

  function handleAddCartItem(item: ProductsProps) {
    toast.success("Item adicionado no carrinho!", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF",
      }
    });
    addItemCart(item);
  }

 return (
   <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
            {products.map((item) => (
              <section key={item.id} className="w-full">
              <Link to={`product/${item.id}`}>
                <img
                  src={item.cover}
                  alt={item.title}
                  className='w-full rounded-lg max-h-70 mb-2'
                />
              </Link>
              <p className='font-medium mt-1 mb-2'>{item.title}</p>

              <div className='flex gap-3 items-center'>
                <strong className='text-zinc-700/90'>
                  {item.price.toLocaleString("pt-BR", {
                    style:"currency",
                    currency: "BRL"
                  })}
                </strong>
                <button onClick={() => handleAddCartItem(item)} className='bg-zinc-900 rounded p-4'>
                  <BsCartPlus size={20} color='#FFF' />
                </button>
              </div>

            </section>
            ))}
          </div>
      </main>
   </div>
 );
}