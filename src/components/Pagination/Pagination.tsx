"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPage,
  totalItems,
}: {
  totalItems: number;
  currentPage: number;
  totalPage: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-3 justify-end mt-5">
      <span>Total: {totalItems}</span>
      <button
        disabled={currentPage === 1}
        onClick={() => createPageUrl(currentPage - 1)}
        className="px-2 py-1 rounded-md text-xs bg-slate-500 font-medium disabled:opacity-50"
      >
        Previous
      </button>
      <button
        disabled={currentPage === totalPage || totalPage === 0}
        onClick={() => createPageUrl(currentPage + 1)}
        className="px-2 py-1 rounded-md text-xs bg-slate-500 font-medium disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
