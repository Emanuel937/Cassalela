import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: "In Stock" | "Out of Stock";
  createdAt: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Gel Hydroalcoolique 500ml",
    description:
      "Gel désinfectant pour les mains, élimine 99.9% des bactéries. Idéal pour missions terrain.",
    image:
      "https://images.unsplash.com/photo-1584452964155-ef139340f0db?w=600",
    price: "€6.90",
    stock: "In Stock",
    createdAt: "12 Feb, 2026",
  },
  {
    id: 2,
    name: "Lingettes Désinfectantes",
    description:
      "Lingettes antibactériennes pour surfaces, adaptées aux environnements sensibles.",
    image:
      "https://images.unsplash.com/photo-1584452964155-ef139340f0db?w=600",
    price: "€4.50",
    stock: "Out of Stock",
    createdAt: "10 Feb, 2026",
  },
  {
    id: 3,
    name: "Masque Chirurgical Type II",
    description:
      "Masque médical haute filtration, confortable et respirant. Usage professionnel.",
    image:
      "https://images.unsplash.com/photo-1584452964155-ef139340f0db?w=600",
    price: "€0.50",
    stock: "In Stock",
    createdAt: "08 Feb, 2026",
  },
];

export default function ProductTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3">
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Image
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Name
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Description
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Price
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Stock
                </TableCell>

                <TableCell isHeader className="px-5 py-3">
                    <span className="sr-only">Actions</span>
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="px-5 py-4">
                    <input type="checkbox" className="h-4 w-4" />
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <div className="w-12 h-12 overflow-hidden rounded-md">
                      <Image
                        width={48}
                        height={48}
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.name}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start dark:text-gray-400 max-w-[250px] truncate">
                    {product.description}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.price}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={product.stock === "In Stock" ? "success" : "error"}
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-right">
                    <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                      <MoreVertical size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
