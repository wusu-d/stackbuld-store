"use client";
import { useState } from "react";
import { CircleX, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "../Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteProduct = ({ id }: { id: string }) => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error delete product:", error);
    } finally {
      setIsLoading(false);
    }
    // revalidate("fetchProducts");
    setTimeout(() => {
      push("/category");
      closeModal();
      toast("Deleted Successfully");
    }, 1000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button className="rounded-md px-4 bg-red-600" onClick={openModal}>
        <Trash2 className="h-5 w-5 text-white" />
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div>
          <h1 className="font-bold flex items-center justify-between">
            Are you sure
            <CircleX className="w-5 h-5 cursor-pointer" onClick={closeModal} />
          </h1>
          <p className="text-sm mt-2">This action can&apos;t be reversed</p>
          <div className="mt-4 space-x-4">
            <button
              onClick={closeModal}
              className="py-2 px-3 font-bold bg-slate-200 rounded-md"
            >
              No
            </button>
            <button
              onClick={handleConfirm}
              className="py-2 px-3 font-bold bg-orange-500 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProduct;
