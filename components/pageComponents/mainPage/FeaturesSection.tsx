import React from "react";
import { useId } from "react";

const items = [
  {
    title: "Масляный фильтр для Toyota Camry",
    description: "Высококачественный масляный фильтр для Toyota Camry.",
    oldPrice: "700 ₽",
    newPrice: "500 ₽",
  },
  {
    title: "Тормозные колодки для Honda Accord",
    description:
      "Комплект тормозных колодок для Honda Accord с увеличенным сроком службы.",
    oldPrice: "2500 ₽",
    newPrice: "2000 ₽",
  },
  {
    title: "Свечи зажигания для Ford Focus",
    description:
      "Набор свечей зажигания для Ford Focus для улучшения производительности.",
    oldPrice: "1200 ₽",
    newPrice: "900 ₽",
  },
  {
    title: "Воздушный фильтр для BMW 3 Series",
    description:
      "Эффективный воздушный фильтр для BMW 3 Series для чистоты воздуха в двигателе.",
    oldPrice: "800 ₽",
    newPrice: "600 ₽",
  },
  {
    title: "Аккумулятор для Audi A4",
    description: "Надежный аккумулятор для Audi A4 с долгим сроком службы.",
    oldPrice: "6000 ₽",
    newPrice: "4500 ₽",
  },
  {
    title: "Топливный фильтр для Volkswagen Golf",
    description: "Высококачественный топливный фильтр для Volkswagen Golf.",
    oldPrice: "900 ₽",
    newPrice: "700 ₽",
  },
  {
    title: "Радиатор для Nissan Altima",
    description:
      "Надежный радиатор для Nissan Altima для эффективного охлаждения.",
    oldPrice: "7000 ₽",
    newPrice: "5500 ₽",
  },
  {
    title: "Фары для Mercedes-Benz C-Class",
    description:
      "Комплект фар для Mercedes-Benz C-Class для улучшенной видимости.",
    oldPrice: "15000 ₽",
    newPrice: "12000 ₽",
  },
  {
    title: "Дворники для Subaru Outback",
    description: "Долговечные дворники для Subaru Outback для четкого обзора.",
    oldPrice: "1200 ₽",
    newPrice: "900 ₽",
  },
  {
    title: "Амортизаторы для Chevrolet Cruze",
    description:
      "Комплект амортизаторов для Chevrolet Cruze для плавного хода.",
    oldPrice: "8000 ₽",
    newPrice: "6500 ₽",
  },
  {
    title: "Зеркала для Hyundai Sonata",
    description: "Набор зеркал для Hyundai Sonata для безопасного вождения.",
    oldPrice: "5000 ₽",
    newPrice: "4000 ₽",
  },
  {
    title: "Генератор для Kia Sportage",
    description:
      "Надежный генератор для Kia Sportage для стабильной работы электроники.",
    oldPrice: "10000 ₽",
    newPrice: "8000 ₽",
  },
];

export function FeaturesSection() {
  return (
    <div className="py-10 lg:py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {items.map((item) => (
          <div
            key={item.title}
            className="relative bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 p-6 rounded-3xl overflow-hidden shadow-lg"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {item.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {item.description}
            </p>
            <div className="mt-4 relative z-20">
              <p className="text-lg font-semibold text-red-500 line-through">
                {item.oldPrice}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {item.newPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
