import { CarOutlined, ShopOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a href="/" rel="noreferrer">
          <CarOutlined style={{ fontSize: "48px" }} />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="/" rel="noreferrer">
          <ShopOutlined style={{ fontSize: "48px" }} />
        </a>
      </div>
      <h1 className="sr-only">Интернет-магазин автозапчастей в Сургуте</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Быстрый и удобный способ покупки автозапчастей в{" "}
        <a href="/" className="font-bold hover:underline" rel="noreferrer">
          Сургуте
        </a>{" "}
        для всех марок автомобилей. Широкий ассортимент и доступные цены!
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
