import Swiper from "./components/Swiper";
import ProductForm from "./components/ProductForm";
import {
  faShirt,
  faKeyboard,
  faHeadphones,
  faGlasses,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const products = [
    { id: 1, name: "Shirt", price: "19.99", image: faShirt },
    { id: 2, name: "Headphone", price: "69.99", image: faHeadphones },
    { id: 3, name: "Keyboard", price: "49.99", image: faKeyboard },
    { id: 4, name: "Glasses", price: "89.99", image: faGlasses },
    { id: 5, name: "Laptop", price: "678.00", image: faLaptop },
  ];
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
      <Swiper showArrowsProp={true}>
        {products.map((product, index) => (
          <ProductForm key={index} product={product} />
        ))}
      </Swiper>
    </div>
  );
}

export default App;
