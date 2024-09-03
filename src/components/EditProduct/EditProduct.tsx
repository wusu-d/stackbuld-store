"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleX, ShoppingCart } from "lucide-react";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

type FormData = {
  name: string;
  price: string;
  description: string;
};

const EditProduct = ({
  id,
  name,
  price,
  description,
}: {
  id: string;
  name: string;
  price: string;
  description: string;
}) => {
  const { refresh } = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [formData, setFormData] = useState<FormData>({
    name: name,
    price: price,
    description: description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log();

    // console.log(formData);

    setIsLoading(true);
    try {
      const url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.URL;
      const response = await fetch(`${url}/api/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...formData,
          price: parseInt(formData.price),
        }),
      });

      if (response.ok) {
        throw new Error("Failed to edit product");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      refresh();
      closeModal();
    }, 1000);
  };
  return (
    <>
      <button
        onClick={openModal}
        className="flex-1 bg-black text-white rounded-md h-14 flex items-center justify-center gap-3"
      >
        <ShoppingCart className="h-5 w-5" /> Edit Product
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            Edit Product
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
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-slate-500 font-bold mt-4 flex justify-center items-center gap-2"
          >
            {isLoading && <Spinner />} Edit Product
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditProduct;
