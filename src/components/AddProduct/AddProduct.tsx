"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import { BookmarkPlus, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import revalidate from "@/helper/revalidateTag";
import Spinner from "../Spinner/Spinner";

type FormData = {
  name: string;
  price: string;
  description: string;
  category: string;
};
const categories = [
  "Men's Clothing",
  "Women's Fashion",
  "Beauty Products",
  "Electronics",
  "Laptops",
  "Accessories",
];
const AddProduct = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const { refresh } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, category: event.target.value }));
    console.log(event.target.value);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    setIsLoading(true);

    try {
      const url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://stackbuld-store.vercel.app";
      const response = await fetch(`${url}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const newProduct = await response.json();
      console.log(newProduct);

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
    refresh();
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex gap-2 items-center rounded-md px-4 py-2 text-sm font-bold text-black bg-orange-500"
      >
        <BookmarkPlus className="w-5 h-5 " />
        Add a Product
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            Add Product
            <CircleX className="w-5 h-5 cursor-pointer" onClick={closeModal} />
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-xs font-bold">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                type="text"
                className="border p-2"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-xs font-bold">
                Price
              </label>
              <input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                type="number"
                className="border p-2"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-xs font-bold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={2}
                className="border p-2 resize-none"
                required
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-xs font-bold">
                Category
              </label>
              <select
                onChange={handleCategoryChange}
                value={formData.category}
                name=""
                id=""
                required
                className="border p-2"
              >
                <option value="">Select a category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-slate-500 font-bold mt-4 flex justify-center items-center gap-2"
          >
            {isLoading && <Spinner />} Add Product
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
