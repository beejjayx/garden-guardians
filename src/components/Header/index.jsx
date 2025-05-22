import Cart from "../../assets/cart.png";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#006266",
      }}
      className="flex justify-between rounded-md bg-customGreen top-0 p-5"
    >
      <h1
        style={{
          fontFamily: ["Abril Fatface", "sans-serif"],
        }}
        className="font-times text-[24px] text-white"
      >
        Garden Guardians
      </h1>
      <div className="text-white">
        <nav className="flex cursor-pointer">
          <a className="m-auto mr-5" href="#">
            Minha conta
          </a>
          <a href="#">
            <img src={Cart} className="w-8 mr-5" alt="Carrinho" />
          </a>
          <div class="flex flex-col gap-1 cursor-pointer">
            <span class="block w-7 h-1 bg-white rounded-md m-auto"></span>
            <span class="block w-7 h-1 bg-white rounded-md "></span>
            <span class="block w-7 h-1 bg-white rounded-md m-auto"></span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
